import { css, html } from "@calpoly/mustang/server";
import { InventoryProfile } from "../models/index";
import renderPage from "./renderPage";

export class InventoryProfilePage {
  data: InventoryProfile;

  constructor(data: InventoryProfile) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      scripts: [
        `
        import { define } from "@calpoly/mustang";

        `
      ]
    });
  }

  renderBody() {
    const { userId } = this.data;
    const api = `/api/travelers/${userId}`;

    return html``;
  }
}
