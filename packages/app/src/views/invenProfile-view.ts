import { Auth, define, Form, InputArray, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile } from "../../../server/src/models/inventory";

export class InventoryProfileViewElement extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property()
  userid?: string;

  @property()
  mode = "view";

  @state()
  inventoryProfiles?: InventoryProfile;

  get src() {
    return `/api/inventoryProfiles/${this.userid}`;
  }

  render() {
    const { name, userClass, inventory = [] } = this.inventoryProfiles || {};

    return html`
      <template>
        <section class="view">
          <main class="mainInventory">
            <div class="profile">profile</div>
            <div class="InventoryTitle">
              <div class="Invtitle">Inventory</div>
            </div>
            <div class="Inventory">
              <slot name="inventory">${inventory}</slot>
            </div>
            <div class="userName"><slot name="name">${name}</slot></div>
            <div class="class"><slot name="userClass">${userClass}</slot></div>
            <button id="edit">Edit</button>
          </main>
        </section>
        <mu-form class="edit">
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Class</span>
            <input name="userClass" />
          </label>
          <label>
            <span>Inventory</span>
            <input-array name="inventory">
              <span slot="label-add">Add an items</span>
            </input-array>
          </label>
        </mu-form>
      </template>
    `;
  }

  static styles = css`
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
      /* … */
    }
    mu-form.edit {
      display: var(--display-editor-none, grid);
      /* … */
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
  _authObserver = new Observer<Auth.Model>(
    this,
    "main:auth"
  );

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }

  hydrate(url: string) {
    fetch(url, { headers: Auth.headers(this._user) })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then(async (json) => {
        this.inventoryProfiles = json as InventoryProfile;
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

}
