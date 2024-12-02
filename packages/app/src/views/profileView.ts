import { define, Form, History, InputArray, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile, Option } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class InventoryViewElement extends LitElement {
  @property()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();
    const editButton = this.shadowRoot?.getElementById("edit");
    if (editButton) {
      editButton.addEventListener("click", () => {
        console.log("Button clicked: dispatching 'edit-mode' event");
        this.dispatchEvent(new CustomEvent("edit-mode", { bubbles: true, composed: true }));
      });
    } else {
      console.log("Edit button not found");
    }
  }
  
  

  render() {
    return html` <section class="view">
      <main class="mainInventory">
        <div class="profile">profile</div>
        <div class="InventoryTitle">
          <div class="Invtitle">Inventory</div>
        </div>
        <div class="Inventory">
          <slot name="inventory"></slot>
        </div>
        <div class="userName"><slot name="name"></slot></div>
        <div class="class"><slot name="userClass"></slot></div>
        <button id="edit">Edit</button>
      </main>
    </section>`;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      :host([mode="edit"]),
      :host([mode="new"]) {
        --display-view-none: none;
      }
      :host([mode="view"]) {
        --display-editor-none: none;
      }

      section.view {
        display: var(--display-view-none, grid);
      }
      */ mu-form.edit {
        display: var(--display-editor-none, grid);
      }

      article {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: var(--background-color);
        font-family: var(--font-pixel)
      }

      .mainInventory {
        background-image: url("/assets/Inventory/InventoryPageBg.png");
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
        background-image: url("/assets/Inventory/profileTavern.png");
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
      }

      .Inventory {
        background-image: url("/assets/Inventory/inventorybg.png");
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
        background-image: url("/assets/Inventory/InventoryTitle.png");
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

      .imgInven {
        width: 80%;
      }

      .imgInvenBg {
        background: var(--bgImg), url("/assets/Inventory/itemInvBg.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .userName {
        background-image: url("/assets/Inventory/userClassBg.png");
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
        background-image: url("/assets/Inventory/userClassBg.png");
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
    `,
  ];


}
