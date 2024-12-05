import {
  define,
  Form,
  History,
  InputArray,
  View,
  Auth,
  Observer,
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";

import { Option } from "../../../server/src/models/option";
import { InventoryProfile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class DrinkMenuViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property({ type: String })
  userid?: "";

  // @state()
  // get profile(): InventoryProfile | undefined {
  //   return this.model.profile;
  // }

  @state()
  get optionsIndex(): Option[] {
    return this.model.optionsIndex || [];
  }

  constructor() {
    super("tavern:model");
  }

  // _authObserver = new Observer<Auth.Model>(this, "main:auth");

  // _user = new Auth.User();

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ) {
    super.attributeChangedCallback(name, old, value);

    if (name === "userid" && old !== value && value)
      this.dispatchMessage(["options/index"]);
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleOptionClick = this._handleOptionClick.bind(this);
  }

  _handleOptionClick(option: Option) {
    // console.log("Clicked Option:", option);
    // console.log("Current userid:", this.userid);
    // console.log("handle click click");
    this.dispatchMessage([
      "profile/addToInventory",
      {
        userid: this.userid ?? "",
        optionid: option._id,
      },
    ]);
  }

  openPopup() {
    console.log("open popup")
    const popup = this.shadowRoot?.getElementById("popup");
    console.log("popup", popup)
    popup?.classList.add("open-popup");
    setTimeout(() => {
      popup?.classList.remove("open-popup");
    }, 1000);
  }

  render() {
    // console.log("userid renderOptions", this.userid);

    const optionList = this.optionsIndex.map((option) =>
      this.renderDrinkOptions(option, this.userid!)
    );
    const firstFive = this.optionsIndex
      .slice(0, 5)
      .map((option) => this.renderDrinkOptions(option, this.userid!));
    const restOfOptions = this.optionsIndex
      .slice(5)
      .map((option) => this.renderDrinkOptions(option, this.userid!));

    return html`
      <article class="bodyDrink">
        <mu-auth provides="main:auth">
          <main class="drinkMain">
            <h1 class="drink-title">Drink Menu</h1>
            <div class="firstFive">${firstFive}</div>
            <div class="restOfOptions">${restOfOptions}</div>
            <div class="popup" id="popup">
              <p>Added To Inventory!</p>
            </div>
          </main>
        </mu-auth>
      </article>
    `;
  }

  renderDrinkOptions(options: Option, userid: string) {
    const { name, price, desc } = options;
    // console.log("userid renderOptions", this.userid);
    return html`
      <div class="option">
        <a
          href="#"
          slot="name"
          class="name"
          @click=${() => { this._handleOptionClick(options); this.openPopup(); }}
          >
          ${name}
        </a>
        <span slot="price" class="price">${price}</span>
        <span slot="desc" class="desc">${desc}</span>
      </div>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }

      .drinkOptions,
      .foodOptions,
      .goodsOptions {
        color: var(--color-text-menu);
      }

      /* Drink Menu CSS */
      svg.icon {
        display: inline;
        height: var(--icon-size);
        width: var(--icon-size);
        vertical-align: calc(0.5em - 0.65 * var(--icon-size));
      }

      article {
        background-color: var(--background-color);
        height: 100vh;
        display: flex;
        justify-content: center;
        overflow: hidden;
        font-family: var(--font-pixel);
      }

      .drinkMain {
        background-image: url("/assets/drinkMenuBg.png");
        padding: 3%;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        aspect-ratio: 9/5;

        display: grid;
        grid-template-columns: 48% 4% 48%;
        grid-template-rows: 15% 75%;
      }

      h1 {
        place-self: center;
        font-size: calc(2.5vw + 1.5vh);
        /* margin-bottom: .5em; */
        grid-template-columns: 95% 5%;
      }

      .popup {
        visibility: hidden;
        grid-column: 3 / span 1;
        grid-row: 3 / span 1;
        place-self: center;
        font-size: 1.75em;
        transform: scale(0.1);
        transition: all 0.4s ease-in-out;
      }

      .open-popup {
        visibility: visible;
        transform: scale(1);
      }

      .firstFive {
        display: grid;
        max-width: screen;
        max-height: 70%;
        grid-template-rows: repeat(auto-fit, minmax(20%, 11vh));
        justify-content: center;
        grid-column: 1 / span 1;
        grid-row: 2 / span 2;
        padding: 5% 12% 1% 10%;
        row-gap: 8%;
      }

      .restOfOptions {
        display: grid;
        max-width: screen;
        max-height: 70%;
        grid-template-rows: repeat(auto-fit, minmax(20%, 11vh));
        justify-content: center;
        grid-column: 3 / span 1;
        grid-row: 1 / span 3;
        padding: 2% 3% 2% 15%;
        row-gap: 8%;
      }

      .option {
        display: grid;
        grid-template-columns: 90% 10%;
        grid-template-rows: repeat(auto-fit, minmax(50%, 1fr));
        justify-content: space-between;
      }

      .name {
        font-size: 2em;
        font-weight: 600;
        color: black;
        text-decoration: none;
      }

      .price {
        font-size: 1.5em;
      }

      .desc {
        font-size: 1.5em;
        color: var(--color-text-menu);
      }
    `,
  ];
}
