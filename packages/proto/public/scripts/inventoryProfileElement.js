import {
  css,
  define,
  html,
  shadow,
  Observer,
  Form,
  InputArray,
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class InvenProfileElement extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  static template = html`
    <template>
      <section class="view">
        <main class="mainInventory">
          <div class="profile">profile</div>
          <div class="InventoryTitle">
            <div class="Invtitle">Inventory</div>
          </div>
          <div class="Inventory">
            <slot name="inventory"></slot>
          </div>
          <div class="userName"><slot name="name">Name</slot></div>
          <div class="class"><slot name="userClass">Class</slot></div>
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
            <span slot="label-add">Add an airport</span>
          </input-array>
        </label>
      </mu-form>
    </template>
  `;

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

  get src() {
    return this.getAttribute("src");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(m) {
    this.setAttribute("mode", m);
  }

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }

  get editButton() {
    return this.shadowRoot.getElementById("edit");
  }

  constructor() {
    super();
    shadow(this)
      .template(InvenProfileElement.template)
      .styles(reset.styles, InvenProfileElement.styles);

    this.editButton.addEventListener("click", () => (this.mode = "edit"));

    this.addEventListener("mu-form:submit", (event) =>
      this.submit(this.src, event.detail)
    );
  }

  _authObserver = new Observer(this, "main:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user:", user);
      this._user = user;
      if (this.src && this.mode !== "new") this.hydrate(this.src);
    });
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (
      name === "src" &&
      oldValue !== newValue &&
      oldValue &&
      newValue &&
      this.mode !== "new"
    )
      this.hydrate(newValue);
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    if (this._user && this._user.authenticated)
      return {
        Authorization: `Bearer ${this._user.token}`,
      };
    else return {};
  }

  hydrate(url) {
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then(async (json) => {
        if (Array.isArray(json.inventory)) {
          const inventoryPromises = json.inventory.map((_id) =>
            this.fetchOption(_id)
          );
          json.inventory = await Promise.all(inventoryPromises);
        }
        this.renderSlots(json);
        this.form.init = json;
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

  fetchOption(_id) {
    const optionUrl = `/api/options/${_id}`;
    return fetch(optionUrl)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
        console.log("fetched ids");
      })
      .catch((error) => {
        console.error(`Failed to fetch Option with id ${_id}:`, error);
      });
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (typeof value) {
        case "object":
          if (Array.isArray(value))
            return html` ${value.map(
              (s) =>
                html` <div
                  style="--bgImg: url(data:image/png;base64,${s.img}) 50% 50%;"
                  slot="${key}"
                  class="imgInvenBg"
                ></div>`
            )}`;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };
    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }

  submit(url, json) {
    const method = this.mode === "new" ? "POST" : "PUT";

    if (this._avatar) json.avatar = this._avatar;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      body: JSON.stringify(json)
    })
      .then((res) => {
        if (res.status !== (this.mode === "new" ? 201 : 200))
          throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        this.form.init = json;
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}:`, error);
      });
  }
}
