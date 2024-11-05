import { InventoryProfile } from "models/inventory";
import { Schema, model } from "mongoose";

const InventoryProfileSchema = new Schema<InventoryProfile>(
  {
    userid: { type: String, required: true, trim: true },
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

  function create(json: InventoryProfile): Promise<InventoryProfile> {
    const t = new InventoryProfileModel(json);
    return t.save();
  }

  function update(
    userid: String,
    invenProfile: InventoryProfile
  ): Promise<InventoryProfile> {
    return InventoryProfileModel.findOneAndUpdate({ userid }, invenProfile, {
      new: true
    }).then((updated) => {
      if (!updated) throw `${userid} not updated`;
      else return updated as InventoryProfile;
    });
  }

  function remove(userid: String): Promise<void> {
    return InventoryProfileModel.findOneAndDelete({ userid }).then(
      (deleted) => {
        if (!deleted) throw `${userid} not deleted`;
      }
    );
  }

  
  export default { index, get, create, update, remove };