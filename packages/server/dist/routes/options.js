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
var import_drinkOption_svc = __toESM(require("../services/drinkOption-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_drinkOption_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:optionid", (req, res) => {
  const { optionid } = req.params;
  import_drinkOption_svc.default.get(optionid).then((option) => res.json(option)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newOption = req.body;
  import_drinkOption_svc.default.create(newOption).then(
    (option) => res.status(201).json(option)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:optionid", (req, res) => {
  const { optionid } = req.params;
  const editedOption = req.body;
  import_drinkOption_svc.default.update(optionid, editedOption).then((option) => res.json(option)).catch((err) => res.status(404).send(err));
});
router.delete("/:optionid", (req, res) => {
  const { optionid } = req.params;
  import_drinkOption_svc.default.remove(optionid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});