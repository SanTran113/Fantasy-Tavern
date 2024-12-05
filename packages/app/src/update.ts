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
      console.log("Processing options/index message...");
      indexOptions().then((options: Option[] | []) => {
        if (options) {
          console.log("Indexed Options:", options);
          apply((model) => ({ ...model, optionsIndex: options }));
        }
      });
      break;

    case "profile/addToInventory":
      addToInventory(message[1], user).then((profile) => {
        console.log("Updated Profile:", profile);
        apply((model) => ({ ...model, profile }));
      });
  }
}

function saveProfile(
  msg: {
    userid: string;
    profile: InventoryProfile;
  },
  user: Auth.User
) {
  console.log("message id", msg.userid);
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

        const optionsPromises = profile.inventory.map((_id) =>
          fetch(`/api/options/${_id}`, {
            headers: Auth.headers(user),
          })
            .then((response) => {
              console.log("Option ID", _id);
              if (response.status === 200) return response.json();
              throw new Error(`Failed to fetch option ${_id}`);
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

function indexOptions() {
  return fetch(`/api/options`)
    .then((response: Response) => {
      if (response.status !== 200) throw `Failed to load index of tours`;
      console.log("Raw options JSON:", response);
      return response.json();
    })
    .then((json: unknown) => {
      if (Array.isArray(json)) {
        console.log("Fetched data:", json);
        return json.map((option: Option) => ({
          name: option.name,
          price: option.price,
          desc: option.desc,
          img: option.img,
        })) as Option[];
      } else {
        console.error("Unexpected JSON format:", json);
        return []; // Fallback to an empty array if the data isn't in the expected format
      }
    })
}

function addToInventory(msg: { userid: string, optionid: string }, user: Auth.User) {
  return fetch(`/api/inventoryProfiles/${msg.userid}/addToInventory`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        console.log("Profile updated:", response);
        return response.json();
      }
      throw new Error("Failed to update profile");
    })
    .then(async (json: unknown) => {
      if (json) {
        const profile = json as InventoryProfile;

        const optionsPromises = profile.inventory.map((_id) =>
          fetch(`/api/options/${_id}`, {
            headers: Auth.headers(user),
          })
            .then((response) => {
              console.log("Option ID", _id);
              if (response.status === 200) return response.json();
              throw new Error(`Failed to fetch option ${_id}`);
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
