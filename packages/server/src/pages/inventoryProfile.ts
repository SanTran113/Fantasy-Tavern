import { css, html } from "@calpoly/mustang/server";
import { InventoryProfile } from "../models/index";
import renderPage from "./renderPage";


export type InventoryPageData = InventoryProfile;
export class InventoryProfilePage {
  data: InventoryPageData;

  constructor(data: InventoryPageData) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/page.css"],
      scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { InvenProfileElement } from "/scripts/inventoryProfileElement.js";

        define({
            "inven-profile": InvenProfileElement,
        });
        `,
      ],
    });
  }

  renderBody() {
    const { userId, name, userClass, inventory } = this.data;

    const inventoryList = inventory.map((inventory) =>
      this.renderInventory(inventory)
    );

    return html`
      <body>
        <inven-profile>
          ${inventoryList}
          <span slot="name">${name}</span>
          <span slot="userClass">${userClass}</span>
        </inven-profile>
      </body>
    `;
  }

  renderInventory(inventoryItem: string) {
    return html` <span slot="item"><div>${inventoryItem}</div></span>`;
  }

  //   renderBody() {
  //     const { userId } = this.data;
  //     const api = `/api/inventoryProfile/${userId}`;

  //     return html`

  //     `;
  //   }
}
