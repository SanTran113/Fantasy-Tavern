import { Option } from "./option";

export interface InventoryProfile {
    userId: string;
    name: string; 
    userClass: string;
    inventory: Array<string>; 
}