import { InventoryProfile } from "models/inventory";
import { Schema, model } from "mongoose";

const InventoryProfileSchema = new Schema<InventoryProfile>(
  {
    userId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    class: { type: String, trim: true },
    inventory: [{ type: Schema.Types.ObjectId, ref: "Option" }],
  },
  { collection: "user_inventory" }
);

const InventoryProfileModel = model<InventoryProfile>("InventoryProfile", InventorySchema);

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