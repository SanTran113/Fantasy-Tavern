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

function get(_id: String): Promise<Option> {
    return DrinkOptionModel.find({ _id })
      .then((list) => list[0])
      .catch((err) => {
        throw `${_id} Not Found`;
      });
  }

function create(json: Option): Promise<Option> {
const t = new DrinkOptionModel(json);
return t.save();
}

function update(
  _id: String,
    option: Option
  ): Promise<Option> {
    return DrinkOptionModel.findOneAndUpdate({ _id }, option, {
      new: true
    }).then((updated) => {
      if (!updated) throw `${_id} not updated`;
      else return updated as Option;
    });
  }

  function remove(_id: String): Promise<void> {
    return DrinkOptionModel.findOneAndDelete({ _id }).then(
      (deleted) => {
        if (!deleted) throw `${_id} not deleted`;
      }
    );
  }

export default { index, get, create, update, remove };