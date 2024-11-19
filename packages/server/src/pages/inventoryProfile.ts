import { css, html } from "@calpoly/mustang/server";
import { InventoryProfile } from "../models/index";
import renderPage from "./renderPage";

type Mode = "view" | "new" | "edit";

export class InventoryProfilePage {
  data: InventoryProfile | null;
  mode: Mode;

  constructor(data: InventoryProfile | null, mode: Mode) {
    this.data = data;
    this.mode = mode;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/page.css"],
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { InvenProfileElement } from "/scripts/inventoryProfileElement.js";
        import { HeaderElement } from "/scripts/header.js";

        define({
          "inven-profile": InvenProfileElement,
          "mu-auth": Auth.Provider
        });

        HeaderElement.initializeOnce();
        `,
      ],
    });
  }

  renderBody() {
    // const { userid, name, userClass, inventory } = this.data;

    // const inventoryList = inventory.map((inventory) =>
    //   this.renderInventory(inventory.img)
    // );

    const base = "/api/inventoryProfiles";
    const api = this.data ? `${base}/${this.data.userid}` : base;

    return html`
      <body>
        <mu-auth provides="main:auth">
          <inven-profile mode="${this.mode}" src="${api}"> </inven-profile>
        </mu-auth>
      </body>
    `;
  }

  renderInventory(inventoryItem: string) {
    return html` <span slot="inventory"><div>${inventoryItem}</div></span>`;
  }
}
