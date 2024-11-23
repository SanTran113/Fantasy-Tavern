import { Option } from "server/models";

export interface Model {
    userid?: String
    name?: string; 
    userClass?: string;
    inventory: Array<Option>; 
}