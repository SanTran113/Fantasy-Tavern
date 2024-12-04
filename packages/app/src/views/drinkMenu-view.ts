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

export class DrinkMenuViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property({ type: String })
  userid?: "";

  @state()
  get profile(): InventoryProfile | undefined {
    return this.model.profile;
  }

  @state()
  get optionsIndex(): Option[] | undefined {
    return this.model.optionsIndex;
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
  }

  _handleOptionClick = () => {
    console.log("handle click click");
    this.dispatchMessage([
      "profile/addToInventory",
      {
        userid: this.userid ?? "",
      },
    ]);
  };

  render() {
    console.log("userid", this.userid);
    console.log("rendering");
    console.log("Options Index", this.optionsIndex);
    const optionList = this.optionsIndex?.map(this.renderDrinkOptions) || [];
    console.log("Options", optionList);
    return html`
      <article class="bodyDrink">
        <mu-auth provides="main:auth">
          <main class="drinkMain">
            <h1 class="drink-title">Drink Menu</h1>
            <div class="drinkMenu">${optionList}</div>
          </main>
        </mu-auth>
      </article>
    `;
  }

  renderDrinkOptions(options: Option) {
    const { name, price, desc } = options;
    console.log("options", options);

    return html`
      <div class="option">
        <span slot="name" class="name" @click=${this._handleOptionClick}>
          ${name}</span
        >
        <span slot="price" class="price">${price}</span>
        <span slot="desc" class="desc">${desc}</span>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: contents;
    }

    .drinkOptions,
    .foodOptions,
    .goodsOptions {
      color: var(--color-text-menu);
    }

    /* Drink Menu CSS */

    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: calc(2.5vw + 1.5vh);
    }

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
      padding: 5%;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      aspect-ratio: 3/2;
    }

    .drinkMenu {
      display: grid;
      max-width: screen;
      max-height: 70%;
      grid-template-columns: repeat(auto-fit, minmax(50%, 5fr));
      grid-template-rows: repeat(auto-fit, minmax(20%, 11vh));
      justify-content: center;
      padding: 2% 5% 2% 5%;
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
    }

    .price {
      font-size: 1.5em;
    }

    .desc {
      font-size: 1.5em;
      color: var(--color-text-menu);
    }
  `;
}
