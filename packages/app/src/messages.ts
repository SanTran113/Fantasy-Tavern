import { InventoryProfile } from "server/models";

export type Msg =
  | ["profile/select", { userid: string }]
  | [
      "profile/save",
      {
        userid: string;
        profile: InventoryProfile;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["options/select", { _id: string }]
  | ["options/index"]
  | ["profile/addToInventory", { userid: string }]
    ;
