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
var inventoryMock_exports = {};
__export(inventoryMock_exports, {
  getInventory: () => getInventory
});
module.exports = __toCommonJS(inventoryMock_exports);
const inventory = {
  name: "Naga",
  userClass: "SpirtMaster",
  inventory: ["Item 1", "Item 2", "Item 3", "Item 4"]
};
function getInventory(_) {
  return inventory;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInventory
});
