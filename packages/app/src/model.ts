import { InventoryProfile, Option } from "server/models";

export interface Model {
    profile?: InventoryProfile
    options?: Option
    optionsIndex?: Option[]
}

export const init: Model = {};