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
    ];
