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
var drinkMockData_exports = {};
__export(drinkMockData_exports, {
  getDrinks: () => getDrinks
});
module.exports = __toCommonJS(drinkMockData_exports);
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
          name: "Blueberry Bedtime",
          price: "15g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Sweetest Sin",
          price: "10g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Mulberry Madness",
          price: "11g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Dissociate",
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
          name: "Phoenix Ashes",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Emperor's Tea",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Tyranny of Dragons",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Acidic Basilisk",
          price: "3g",
          desc: "Rum infused with fresh lime mint and sugar."
        },
        {
          name: "Fairy?",
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
