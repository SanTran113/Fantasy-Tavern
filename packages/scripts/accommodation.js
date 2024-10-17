import { css, html, shadow } from "@calpoly.mustang";
import reset from "./styles/reset.css.js";

export class AccommodationElement extends HTMLElement {
  static template = html`
    <template>
      <section class="emotion drinks">
        <h2>
          <slot name="title">Emotional</slot>
          <svg class="icon">
            <use xlink:href="icons/icons.svg#heart" />
          </svg>
        </h2>
        <ul class="drinkOptions">
          <slot name="option-1"><li>Secret Paradise</li></slot>
            <slot name="option-1-desc"><p>Rum infused with fresh lime mint and sugar.</p></slot>
          <slot name="option-2"><li>Bluberry Bedtime</li></slot>
            <slot name="option-2-desc"><p>Rum infused with fresh lime mint and sugar.</p></slot>
          <slot name="option-3"><li>Sweetest Sin</li></slot>
            <slot name="option-3-desc"><p>Rum infused with fresh lime mint and sugar.</p></slot>
          <slot name="option-4"><li>Mulberry Madness</li></slot>
            <slot name="option-4-desc"<p>Rum infused with fresh lime mint and sugar.</p></slot>
          <slot name="option-5"><li>Dissociate</li></slot>
            <slot name="option-5-desc"><p>Rum infused with fresh lime mint and sugar.</p></slot>
        </ul>
      </section>
    </template>
  `;

  static styles = css`
    :host {
      display: contents;
    }

    .drinkOptions {
      color: var(--color-text-menu);
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

    ul {
      list-style-type: none;
      font-weight: bold;
      font-size: calc(1vw + 1vh);
    }

    p {
      font-size: calc(0.75vw + 0.75vh);
      margin-bottom: 5%;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(AccomodationElement.template)
      .styles(reset.styles, AccommodationElement.styles);
  }
}
