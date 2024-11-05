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
var inventory_svc_exports = {};
__export(inventory_svc_exports, {
  default: () => inventory_svc_default
});
module.exports = __toCommonJS(inventory_svc_exports);
var import_mongoose = require("mongoose");
const InventoryProfileSchema = new import_mongoose.Schema(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    userClass: { type: String, trim: true },
    inventory: [{ type: String, trim: true }]
  },
  { collection: "user_inventory" }
);
const InventoryProfileModel = (0, import_mongoose.model)("InventoryProfile", InventoryProfileSchema);
function index() {
  return InventoryProfileModel.find();
}
function get(userid) {
  return InventoryProfileModel.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(json) {
  const t = new InventoryProfileModel(json);
  return t.save();
}
function update(userid, invenProfile) {
  return InventoryProfileModel.findOneAndUpdate({ userid }, invenProfile, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated;
  });
}
function remove(userid) {
  return InventoryProfileModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}
var inventory_svc_default = { index, get, create, update, remove };
