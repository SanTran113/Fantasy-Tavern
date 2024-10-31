import { css, html } from "@calpoly/mustang/server";
import { Drinks, DrinkSection, Option } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export type DrinksPageData = Drinks;

export class DrinksPage {
  data: DrinksPageData;

  constructor(data: DrinksPageData) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/page.css"],
      styles: [
        css`
          main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
            }
          }
        `,
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
        });`,
      ],
    });
  }


  renderBody() {
    const { title, drinkSections } = this.data;

    const sectionList = drinkSections.map((drinkSections) =>
      this.renderDrinkSections(drinkSections)
    );

    return html` 
    <body class="bodyDrink">
      <main class="drinkMain">
        <h1 class="drink-title">${title}</h1>
        <div class="drinkMenu">${sectionList}</div>
      </main>
    </body>`;
  }

  

  renderDrinkSections(drinkSections: DrinkSection) {
    const { title, icon, optionMenu } = drinkSections;

    const optionList = optionMenu.map((options) => this.renderOptions(options));

    return html`
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


  renderOptions(options: Option) {
    const { name, price, desc } = options;

    return html`
      <option-accommodation>
        <span slot="name">${name}</span>
        <span slot="price">${price}</span>
        <span slot="desc">${desc}</span>
      </option-accommodation>
    `;
  }
}
