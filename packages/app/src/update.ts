import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { InventoryProfile } from "server/models";

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
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as InventoryProfile;
      }
    });
}