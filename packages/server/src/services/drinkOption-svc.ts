import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Option } from "../models/option";

const DrinkOptionSchema = new Schema<Option> (
    {
    name: {type: String, required: true, trim: true},
    price: {type: String, required: true, trim: true},
    desc: {type: String, required: true, trim: true}
    },
    {collection: "drinkOptions"}
);

const DrinkOptionModel = model<Option>("Option", DrinkOptionSchema);

function index(): Promise<Option[]> {
    return DrinkOptionModel.find();
};

export default { index };