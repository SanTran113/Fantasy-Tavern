import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Option } from "../models/option";

const DrinkOptionSchema = new Schema<Option> (
    {
    name: {type: String, required: true, trim: true},
    price: {type: String, required: true, trim: true},
    desc: {type: String, required: true, trim: true},
    img: {type: String, required: true, trim: true}
    },
    {collection: "drinkOptions"}
);

const DrinkOptionModel = model<Option>("Option", DrinkOptionSchema);

function index(): Promise<Option[]> {
    return DrinkOptionModel.find();
};

function get(optionid: String): Promise<Option> {
    return DrinkOptionModel.find({ optionid })
      .then((list) => list[0])
      .catch((err) => {
        throw `${optionid} Not Found`;
      });
  }

function create(json: Option): Promise<Option> {
const t = new DrinkOptionModel(json);
return t.save();
}

function update(
    optionid: String,
    option: Option
  ): Promise<Option> {
    return DrinkOptionModel.findOneAndUpdate({ optionid }, option, {
      new: true
    }).then((updated) => {
      if (!updated) throw `${optionid} not updated`;
      else return updated as Option;
    });
  }

  function remove(optionid: String): Promise<void> {
    return DrinkOptionModel.findOneAndDelete({ optionid }).then(
      (deleted) => {
        if (!deleted) throw `${optionid} not deleted`;
      }
    );
  }

export default { index, get, create, update, remove };