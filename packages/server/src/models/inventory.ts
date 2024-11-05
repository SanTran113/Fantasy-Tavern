import { Option } from "./option";

export interface InventoryProfile {
    userId: string;
    name: string; 
    class: string;
    inventory: Array<Option>; 
}