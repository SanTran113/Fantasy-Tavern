"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var drink_exports = {};
__export(drink_exports, {
  DrinksPage: () => DrinksPage
});
module.exports = __toCommonJS(drink_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class DrinksPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: ["/styles/page.css"],
      styles: [
        import_server.css`
          main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
            }
          }
        `
      ],
      scripts: [
        `import { define } from "@calpoly/mustang";
        import { MenuElement } from "/scripts/menuAccommodation.js";
        import { OptionElement } from "/scripts/optionElement.js";

        define({
            "menu-accommodation": MenuElement
        });
        define({
            "option-accommodation": OptionElement
        });`
      ]
    });
  }
  renderBody() {
    const { title, drinkSections } = this.data;
    const sectionList = drinkSections.map(
      (drinkSections2) => this.renderDrinkSections(drinkSections2)
    );
    return import_server.html` 
    <body class="bodyDrink">
      <main class="drinkMain">
        <h1 class="drink-title">${title}</h1>
        <div class="drinkMenu">${sectionList}</div>
      </main>
    </body>`;
  }
  renderDrinkSections(drinkSections) {
    const { title, icon, optionMenu } = drinkSections;
    const optionList = optionMenu.map((options) => this.renderOptions(options));
    return import_server.html`
      <menu-accommodation>
        <span slot="title">${title}</span>
        <span slot="icon">
          <svg class="icon">
            <use xlink:href="icons/icons.svg#${icon}" />
          </svg>
        </span>
        <span slot="option"> ${optionList} </span>
      </menu-accommodation>
    `;
  }
  renderOptions(options) {
    const { name, price, desc } = options;
    return import_server.html`
      <option-accommodation>
        <span slot="name">${name}</span>
        <span slot="price">${price}</span>
        <span slot="desc">${desc}</span>
      </option-accommodation>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DrinksPage
});
