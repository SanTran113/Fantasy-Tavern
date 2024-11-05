import { Schema, model } from "mongoose";
import { Drinks } from "../models/drink";

const DrinkSchema = new Schema<Drinks>(
  {
    title: { type: String, required: true, trim: true },
    drinkSections: [
        {
            title: { type: String, required: true, trim: true },
            icon: { type: String, required: true, trim: true },
            optionMenu: [Schema.Types.ObjectId]
        }

    ]
  },
  { collection: "drinks" }
);

const DrinkOptionModel = model<Drinks>("Option", DrinkSchema);

function index(): Promise<Drinks[]> {
    return DrinkOptionModel.find();
};

export default { index };