import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class InvenProfileElement extends HTMLElement {
    static template = html `
    <template>
        <main class="mainInventory">
            <div class="profile">profile</div>
            <div class="InventoryTitle">
                <div class="Invtitle">Inventory</div>
            </div>
            <div class="Inventory">
                <div><slot name="item">Item 1</slot></div>
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
    background-image: url('../assets/Inventory/inventoryPageBg.png');
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
    background-image: url('../assets/Inventory/profileTavern.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    }

    .Inventory {
    background-image: url('../assets/Inventory/inventorybg.png');
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
    background-image: url('../assets/Inventory/InventoryTitle.png');
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
    background-image: url('../assets/Inventory/userClassBg.png');
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
    background-image: url('../assets/Inventory/userClassBg.png');
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
}