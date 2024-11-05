import { InventoryProfile } from "models/inventory";
import { Schema, model } from "mongoose";

const InventoryProfileSchema = new Schema<InventoryProfile>(
  {
    userId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    userClass: { type: String, trim: true },
    inventory: [{ type: String, trim: true }],
  },
  { collection: "user_inventory" }
);

const InventoryProfileModel = model<InventoryProfile>("InventoryProfile", InventoryProfileSchema);

function index(): Promise<InventoryProfile[]> {
    return InventoryProfileModel.find();
  }
  
  function get(userid: String): Promise<InventoryProfile> {
    return InventoryProfileModel.find({ userid })
      .then((list) => list[0])
      .catch((err) => {
        throw `${userid} Not Found`;
      });
  }
  
  export default { index, get };