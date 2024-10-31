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
var drink_svc_exports = {};
__export(drink_svc_exports, {
  getDrinks: () => getDrinks
});
module.exports = __toCommonJS(drink_svc_exports);
const drinks = {
  title: "Drink Menu",
  drinkSections: [
    {
      title: "Emotional",
      icon: "heart",
      optionMenu: [
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        }
      ]
    },
    {
      title: "Mythical",
      icon: "mythical",
      optionMenu: [
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Secret Paradise",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        }
      ]
    }
  ]
};
function getDrinks(_) {
  return drinks;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDrinks
});
