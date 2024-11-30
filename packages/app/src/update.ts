import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { InventoryProfile, Option } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) => apply((model) => ({ ...model, profile })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "profile/select":
      console.log("Selecting profile for:", message[1].userid);
      selectProfile(message[1], user).then((profile) => {
        console.log("Fetched Profile:", profile);
        apply((model) => ({ ...model, profile }));
      });
      break;
    case "options/select":
      selectOptions(message[1], user).then((options) => {
        console.log("Fetched Options:", options);
        apply((model) => ({ ...model, options }));
      });
      break;
    case "options/index":
      indexOptions(message[1]._id).then((options: Option[] | undefined) => {
        if (options) {
          console.log("Indexed Options:", options);
          apply((model) => ({ ...model, optionsIndex: options }));
        }
      });
      break;
  }
}

function saveProfile(
  msg: {
    userid: string;
    profile: InventoryProfile;
  },
  user: Auth.User
) {
  return fetch(`/api/inventoryProfiles/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.profile),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else throw new Error(`Failed to save profile for ${msg.userid}`);
    })
    .then((json: unknown) => {
      if (json) return json as InventoryProfile;
      return undefined;
    });
}

function selectProfile(msg: { userid: string }, user: Auth.User) {
  return fetch(`/api/inventoryProfiles/${msg.userid}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        console.log("Profile:", response);
        return response.json();
      }
    })
    .then(async (json: unknown) => {
      if (json) {
        const profile = json as InventoryProfile;

        // Fetch inventory options if needed
        const optionsPromises = profile.inventory.map((item) =>
          fetch(`/api/options/${item._id}`, {
            headers: Auth.headers(user),
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error(`Failed to fetch option ${item._id}`);
            })
            .then((optionData) => optionData as Option)
        );

        const options = await Promise.all(optionsPromises);
        profile.inventory = options; // Update inventory with full Option details

        return profile;
      }
      return undefined;
    });
}

function selectOptions(msg: { _id: string }, user: Auth.User) {
  return fetch(`/api/options/${msg._id}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        console.log("Options:", response);
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Options:", json);
        return json as Option;
      }
    });
}

function indexOptions(_id: String) {
  return fetch(`/api/options/${_id}`, {})
    .then((response: Response) => {
      if (response.status !== 200) throw `Failed to load index of tours`;
      return response.json();
    })
    .then((json: unknown) => {
      if (json) {
        const { data } = json as { data: any[] }; // Assume the response has a "data" field containing an array
        return data.map((item: any) => ({
          name: item.name,
          price: item.price,
          desc: item.desc,
          img: item.img,
        })) as Option[];
      }
      return [];
    });
}
