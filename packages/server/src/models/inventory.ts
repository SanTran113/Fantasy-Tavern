import { Option } from "./option";
export interface InventoryProfile {
    userid: string,
    name: string; 
    userClass: string;
    inventory: Array<Option>; 
}