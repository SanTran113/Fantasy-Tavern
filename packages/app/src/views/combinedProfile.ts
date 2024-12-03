import { define, Form, History, InputArray, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile, Option } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

class InventoryViewElement extends LitElement {
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
      /* :host([mode="edit"]),
      :host([mode="new"]) {
        --display-view-none: none;
      }
      :host([mode="view"]) {
        --display-editor-none: none;
      }

      section.view {
        display: var(--display-view-none, grid);
      }
      mu-form.edit {
        display: var(--display-editor-none, grid);
      } */

      article {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: var(--background-color);
        font-family: var(--font-pixel);
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

class InventoryEditElement extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property()
  userid?: string;

  @property({ attribute: false })
  init?: InventoryProfile;

  // @state()
  // get profile(): InventoryProfile | undefined {
  //   return this.model.profile;
  // }

  render() {
    return html` <main class="page">
      <mu-form .init=${this.init}>
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
    </main>`;
  }
}

export class InventoryProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
    "profile-viewer": InventoryViewElement,
    "profile-editor": InventoryEditElement,
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property()
  userid?: string;

  @property({ type: String, reflect: true })
  mode = "view";

  @state()
  get profile(): InventoryProfile | undefined {
    return this.model.profile;
  }

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
      this.dispatchMessage(["profile/select", { userid: value }]);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("edit-mode", () => {
      console.log("Edit mode triggered");
      this.edit = true;
      this.mode = "edit";
      console.log("Edit:", this.edit, "Mode:", this.mode);
      this.requestUpdate();
    });
  }

  _handleSubmit(event: Form.SubmitEvent<InventoryProfile>) {
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid ?? "",
        profile: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/inventoryProfiles/${this.userid}`,
          }),
        onFailure: (error: Error) => console.log("ERROR:", error),
      },
    ]);
  }

  render() {
    const { userid, name, userClass, inventory = [] } = this.profile || {};
    console.log(this.edit, this.mode);

    const renderOptions = (inventory: Option[]) => {
      return html` ${inventory.map(
        (s) =>
          html` <div
            style="--bgImg: url(data:image/png;base64,${s.img})"
            class="imgInvenBg"
          ></div>`
      )}`;
    };

    return this.edit
      ? html`
          <profile-editor
            userid=${userid}
            .init=${this.profile}
            @mu-form:submit=${(event: Form.SubmitEvent<InventoryProfile>) =>
              this._handleSubmit(event)}
          >
          </profile-editor>
        `
      : html`
          <profile-viewer userid=${userid}>
            <span slot="name">${name}</span>
            <span slot="userClass">${userClass}</span>
            <span slot="inventory">${renderOptions(inventory)}</span>
          </profile-viewer>
        `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      /* :host([mode="edit"]),
      :host([mode="new"]) {
        --display-view-none: none;
      }
      :host([mode="view"]) {
        --display-editor-none: none;
      } */

      /* section.view {
        display: var(--display-view-none, grid);
      }
      mu-form.edit {
        display: var(--display-editor-none, grid);
      } */

      article {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: var(--background-color);
        font-family: var(--font-pixel);
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
