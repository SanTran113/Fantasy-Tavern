"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var drinkOption_svc_exports = {};
__export(drinkOption_svc_exports, {
  default: () => drinkOption_svc_default
});
module.exports = __toCommonJS(drinkOption_svc_exports);
var import_mongoose2 = require("mongoose");
const DrinkOptionSchema = new import_mongoose2.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true }
  },
  { collection: "drinkOptions" }
);
const DrinkOptionModel = (0, import_mongoose2.model)("Option", DrinkOptionSchema);
function index() {
  return DrinkOptionModel.find();
}
;
function get(_id) {
  return DrinkOptionModel.find({ _id }).then((list) => list[0]).catch((err) => {
    throw `${_id} Not Found`;
  });
}
function create(json) {
  const t = new DrinkOptionModel(json);
  return t.save();
}
function update(_id, option) {
  return DrinkOptionModel.findOneAndUpdate({ _id }, option, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${_id} not updated`;
    else return updated;
  });
}
function remove(_id) {
  return DrinkOptionModel.findOneAndDelete({ _id }).then(
    (deleted) => {
      if (!deleted) throw `${_id} not deleted`;
    }
  );
}
var drinkOption_svc_default = { index, get, create, update, remove };
