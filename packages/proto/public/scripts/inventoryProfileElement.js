import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class InvenProfileElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  static template = html`
    <template>
      <main class="mainInventory">
        <div class="profile">profile</div>
        <div class="InventoryTitle">
          <div class="Invtitle">Inventory</div>
        </div>
        <div class="Inventory">
          <slot name="inventory">
            <img src="./assets/drinkOptions/mulberry_white.png" />
          </slot>
        </div>
        <div class="userName"><slot name="name">Name</slot></div>
        <div class="class"><slot name="userClass">Class</slot></div>
      </main>
    </template>
  `;

  static styles = css`
    :host {
      display: contents;
    }

    .mainInventory {
      background-image: url("../assets/Inventory/InventoryPageBg.png");
      padding: 5%;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      aspect-ratio: 4/2;

      display: grid;
      grid-template-columns: repeat(15, 1fr);
      grid-template-rows: repeat(7, 1fr);
      gap: 10px;
      grid-auto-rows: minmax(100px, auto);
    }

    .profile {
      grid-column: 4 / span 3;
      grid-row: 2 / span 3;
      background-image: url("../assets/Inventory/profileTavern.png");
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }

    .Inventory {
      background-image: url("../assets/Inventory/inventorybg.png");
      grid-column: 8 / span 5;
      grid-row: 3 / span 4;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;

      padding: 5%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 3%;
      grid-auto-rows: minmax(100px, auto);
    }

    .InventoryTitle {
      background-image: url("../assets/Inventory/InventoryTitle.png");
      grid-column: 8 / span 5;
      grid-row: 2 / span 1;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    .Invtitle {
    }

    .userName {
      background-image: url("../assets/Inventory/userClassBg.png");
      grid-column: 4 / span 3;
      grid-row: 5 / span 1;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    .class {
      background-image: url("../assets/Inventory/userClassBg.png");
      grid-column: 4 / span 3;
      grid-row: 6 / span 1;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(InvenProfileElement.template)
      .styles(reset.styles, InvenProfileElement.styles);
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  hydrate(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then(async (json) => {
        if (Array.isArray(json.inventory)) {
          const inventoryPromises = json.inventory.map((id) => this.fetchOption(id));
          json.inventory = await Promise.all(inventoryPromises);
        }
        this.renderSlots(json);
      })
      .catch((error) => console.log(`Failed to render data ${url}:`, error));
  }
  
  fetchOption(id) {
    const optionUrl = `/options/${id}`; 
    return fetch(optionUrl)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .catch((error) => {
        console.error(`Failed to fetch Option with id ${id}:`, error);
      });
  }
  

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (typeof value) {
        case "object":
          if (Array.isArray(value))
            return html` ${value.map(
              (s) => html`<span slot="${key}"><img src="data:image/png;base64,${s.img}" /></span>`
              // (s) => html`<span slot="${key}">${s.img}</span>`

            )}`;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };
    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }
}
