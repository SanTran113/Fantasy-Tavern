import { define, Form, InputArray, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class InventoryProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property()
  userid?: string;

  @property()
  mode = "view";

  @state()
  get profile(): InventoryProfile | undefined {
    return this.model.profile;
  }

  // get src() {
  //   return `/api/inventoryProfiles/${this.userid}`;
  // }

  render() {
    const { userid, name, userClass, inventory = [] } = this.profile || {};

    return html`
      <div>
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
      </div>
    `;
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
    `,
  ];

  constructor() {
    super("tavern:model");
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ) {
    super.attributeChangedCallback(name, old, value);

    if (name === "userid" && old !== value && value)
      this.dispatchMessage([
        "profile/select",
        { userid: value }
      ]);
  }

  // _authObserver = new Observer<Auth.Model>(this, "main:auth");

  // _user = new Auth.User();

  // connectedCallback() {
  //   super.connectedCallback();
  //   this._authObserver.observe(({ user }) => {
  //     if (user) {
  //       this._user = user;
  //     }
  //     this.hydrate(this.src);
  //   });
  // }

  // hydrate(url: string) {
  //   fetch(url, { headers: Auth.headers(this._user) })
  //     .then((res) => {
  //       if (res.status !== 200) throw `Status: ${res.status}`;
  //       return res.json();
  //     })
  //     .then(async (json) => {
  //       this.inventoryProfiles = json as InventoryProfile;
  //     })
  //     .catch((error) => {
  //       console.log(`Failed to render data ${url}:`, error);
  //     });
  // }
}
