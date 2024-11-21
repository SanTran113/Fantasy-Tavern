import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement, RenderOptions } from "lit";
import { state } from "lit/decorators.js";
import { DrinkSection } from "../../../server/src/models/drinkSection";
import { Option } from "../../../server/src/models/option";

export class DrinkMenuViewElement extends LitElement {
  src = "/api/options";

  @state()
  //   drinkMenu = new Array<DrinkSection>();
  options = new Array<Option>();

  render() {
    console.log("rendering");
    // const drinkSections = this.drinkMenu.map(this.renderDrinks);
    const optionList = this.options.map(this.renderDrinkOptions);
    return html`
      <main class="drinkMain">
        <ul class="drinkOptions">
          <span slot="option"> ${optionList} </span>
        </ul>
      </main>
    `;
  }

  renderDrinks(drinkSections: DrinkSection) {
    const { title, icon, optionMenu } = drinkSections;

    return html`
      <div>
        <span slot="title">${title}</span>
        <span slot="icon">
          <svg class="icon">
            <use xlink:href="icons/icons.svg#${icon}" />
          </svg>
        </span>
        <span slot="option"> ${optionList} </span>
      </div>
    `;
  }

  renderDrinkOptions(options: Option) {
    const { name, price, desc } = options;

    return html`
      <div>
        <span slot="name">${name}</span>
        <span slot="price">${price}</span>
        <span slot="desc">${desc}</span>
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

    /* Drink Menu CSS */

    h2 {
      font-size: calc(1.5vw + 1vh);
    }

    svg.icon {
      display: inline;
      height: var(--icon-size);
      width: var(--icon-size);
      vertical-align: calc(0.5em - 0.65 * var(--icon-size));
    }

    .drinkOptions {
      list-style-type: none;
      font-weight: bold;
      font-size: calc(1vw + 1vh);
    }

    p {
      font-size: calc(0.75vw + 0.75vh);
      margin-bottom: 5%;
      font-style: italic;
      color: var(--color-text-menu);
    }

    div {
      display: flex;
      justify-content: space-between;
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
