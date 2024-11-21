import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class OptionElement extends HTMLElement {
  static template = html`
    <template>
          <div>
            <li><slot name="name">Secret Paradise</slot></li>
            <li><slot name="price">5g</slot></li>
          </div>
          <p>
            <slot name="desc"
              >Rum infused with fresh lime mint and sugar.</slot
            >
          </p>
    </template>
  `;

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

  constructor() {
    super();
    shadow(this)
      .template(OptionElement.template)
      .styles(reset.styles, OptionElement.styles);
  }
}
