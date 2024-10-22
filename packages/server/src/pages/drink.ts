import { css, html } from "@calpoly/mustang/server";
import { Drinks, DrinkSection, Option } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class DrinksPage {
  data: Drinks;

  constructor(data: Drinks) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      // add more parts here later
    });
  }

  renderOptions(options: Option) {
    const { name, price, desc } = options;

    return html`
      <span slot="option-1">${name}</span>
      <span slot="option-1-price">${price}</span>
      <span slot="option-1-desc">${desc}</span>
    `;
  }

  renderDrinkSections(drinkSections: DrinkSection) {
    const { title, icon, optionMenu } = drinkSections;

    const optionList = (optionMenu.map((options) =>
        this.renderOptions(options)
      ));
  

    return html`
      <menu-accommodation>
        <span slot="title">${title}</span>
        <span slot="icon">
          <svg class="icon">
            <use xlink:href="icons/icons.svg#${icon}" />
          </svg>
        </span>
        ${optionList}
      </menu-accommodation>
    `;
  }

  renderBody() {
    const { title, drinkSections } = this.data;

    const sectionList = (drinkSections.map((drinkSections) =>
      this.renderDrinkSections(drinkSections)
    ));

    
    return html`
        <body class="bodyDrink">
            <main style="background-image: url('./assets/drinkMenuBg.png')">
            <h1 class="drink-title">${title}</h1>
            <div class="drinkMenu">
                ${sectionList}
            </div>
            </main>
        </body>`;
  }
}
