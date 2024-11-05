"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_drink_svc = require("./services/drink-svc");
var import_inventoryMock = require("./services/inventoryMock");
var import_pages = require("./pages/index");
var import_mongo = require("./services/mongo");
(0, import_mongo.connect)("tavern");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get("/drink/:drinkMenuId", (req, res) => {
  const { drinkMenuId } = req.params;
  const data = (0, import_drink_svc.getDrinks)(drinkMenuId);
  const page = new import_pages.DrinksPage(data);
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/inventoryProfile/:userId", (req, res) => {
  const { userId } = req.params;
  const data = (0, import_inventoryMock.getInventory)(userId);
  const page = new import_pages.InventoryProfilePage(data);
  res.set("Content-Type", "text/html").send(page.render());
});
