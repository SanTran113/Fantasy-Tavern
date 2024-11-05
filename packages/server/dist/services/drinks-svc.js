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
var drinks_svc_exports = {};
__export(drinks_svc_exports, {
  default: () => drinks_svc_default
});
module.exports = __toCommonJS(drinks_svc_exports);
var import_mongoose = require("mongoose");
const DrinkSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    drinkSections: [
      {
        title: { type: String, required: true, trim: true },
        icon: { type: String, required: true, trim: true },
        optionMenu: [import_mongoose.Schema.Types.ObjectId]
      }
    ]
  },
  { collection: "drinks" }
);
const DrinkOptionModel = (0, import_mongoose.model)("Option", DrinkSchema);
function index() {
  return DrinkOptionModel.find();
}
;
var drinks_svc_default = { index };
