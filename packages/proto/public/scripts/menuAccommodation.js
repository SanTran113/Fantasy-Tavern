import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class MenuElement extends HTMLElement {
  static template = html`
    <template>
      <section class="emotion drinks">
        <h2>
          <slot name="title">Emotional</slot>
          <slot name="icon">
            <svg class="icon">
              <use xlink:href="icons/icons.svg#heart" />
            </svg>
          </slot>
        </h2>
        <ul class="drinkOptions">
          <slot name="option">
            <option-accommodation>
              <slot="option">Secret Paradise</span>
              <slot="price">3g</span>
              <slot="desc">Rum infused with fresh lime mint and sugar.</span>
            </option-accommodation>
          </slot>
        </ul>
      </section>
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
      .template(MenuElement.template)
      .styles(reset.styles, MenuElement.styles);
  }
}
