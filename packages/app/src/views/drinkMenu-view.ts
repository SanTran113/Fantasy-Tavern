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

import { DrinkSection } from "../../../server/src/models/drinkSection";
import { Option } from "../../../server/src/models/option";
import { Msg } from "../messages";
import { Model } from "../model";

export class DrinkMenuViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property()
  userid?: string;

  src = "/api/options";

  @state()
  options = new Array<Option>();

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
      this.dispatchMessage(["profile/addToInventory", { userid: value }]);
  }


  render() {
    console.log("rendering");
    // const drinkSections = this.drinkMenu.map(this.renderDrinks);
    const optionList = this.options.map(this.renderDrinkOptions);
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

    const _handleOptionClick = () => {
      console.log("handle click click");
      this.dispatchMessage([
        "profile/addToInventory",
        {
          userid: this.userid ?? "",
        },
        
      ]);
    }

    return html`
      <div class="option">
        <span
          slot="name"
          class="name"
          @click=${_handleOptionClick}
        >
          ${name}</span
        >
        <span slot="price" class="price">${price}</span>
        <span slot="desc" class="desc">${desc}</span>
      </div>
    `;
  }

  //   maps backend data back into json
  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user),
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw `Server responded with status ${res.status}`;
      })
      .then((json: unknown) => {
        console.log("Raw API response: ", json);
        if (Array.isArray(json)) {
          this.options = json as Array<Option>;
          console.log("Options loaded: ", this.options);
        } else {
          console.error("Unexpected response format: ", json);
        }
      })
      .catch((err) => console.log("Failed to tour data:", err));
  }

  static styles = css`
    :host {
      display: contents;
    }

    @import url("token.css");

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
      background-image: url("../assets/drinkMenuBg.png");
      padding: 5%;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      aspect-ratio: 3/2;
    }

    .drinkMain {
      background-image: url("../assets/drinkMenuBg.png");
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

  _authObserver = new Observer<Auth.Model>(this, "main:auth");

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCall");
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }
}
