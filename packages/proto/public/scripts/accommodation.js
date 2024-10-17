import { css, html, shadow } from "@calpoly/mustang";
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
          <li><slot name="option-1">Secret Paradise</slot></li>
            <p><slot name="option-1-desc">Rum infused with fresh lime mint and sugar.</slot></p>
          <li><slot name="option-2">Bluberry Bedtime</slot></li>
            <p><slot name="option-2-desc">Rum infused with fresh lime mint and sugar.</slot></p>
          <li><slot name="option-3">Sweetest Sin</slot></li>
            <p><slot name="option-3-desc">Rum infused with fresh lime mint and sugar.</slot></p>
          <li><slot name="option-4">Mulberry Madness</slot></li>
            <p><slot name="option-4-desc">Rum infused with fresh lime mint and sugar.</slot></p>
          <li><slot name="option-5">Dissociate</slot></li>
            <p><slot name="option-5-desc">Rum infused with fresh lime mint and sugar.</slot></p>
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

    ul {
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
  `;

  constructor() {
    super();
    shadow(this)
      .template(AccommodationElement.template)
      .styles(reset.styles, AccommodationElement.styles);
  }
}
