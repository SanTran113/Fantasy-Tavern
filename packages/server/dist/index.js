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
var import_drinkMockData = require("./services/drinkMockData");
var import_pages = require("./pages/index");
var import_mongo = require("./services/mongo");
var import_inventory_svc = __toESM(require("./services/inventory-svc"));
var import_inventoryProfiles = __toESM(require("./routes/inventoryProfiles"));
var import_options = __toESM(require("./routes/options"));
var import_auth = __toESM(require("./routes/auth"));
(0, import_mongo.connect)("tavern");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/inventoryProfiles", import_inventoryProfiles.default);
app.use("/api/options", import_options.default);
app.use("/auth", import_auth.default);
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get("/drink/:drinkMenuId", (req, res) => {
  const { drinkMenuId } = req.params;
  const data = (0, import_drinkMockData.getDrinks)(drinkMenuId);
  const page = new import_pages.DrinksPage(data);
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/inventoryProfiles/:userid", (req, res) => {
  const { userid } = req.params;
  import_inventory_svc.default.get(userid).then((data) => {
    const page = new import_pages.InventoryProfilePage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/options/:_id", (req, res) => {
  const { _id } = req.params;
  import_inventory_svc.default.get(_id).then((data) => {
    const page = new import_pages.InventoryProfilePage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
