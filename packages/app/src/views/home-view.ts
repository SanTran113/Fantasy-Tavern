import { LitElement, html, css } from "lit";
import reset from "../styles/reset.css";

export class HomeViewElement extends LitElement {
  render() {
    return html`
      <article class="bodyIndex">
        <div class="indexInformation">
          <h1 class="titleIndex">Fantasy Tavern</h1>
          <tavern-header></tavern-header>
          <section class="htmlIndex">
            <a href="/app/drinkMenu">Drink Menu</a>
            <a href="food.html">Food Menu</a>
            <a href="quests.html">Quest Board</a>
            <a href="goods.html">General Goods</a>
            <a href="/app/inventoryProfiles/:id">Inventory</a>
          </section>
        </div>
      </article>
    `;
  }
  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }

      /* Index Page CSS */
      .bodyIndex {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../assets/backdrop.png");
      }

      .bodyIndex.dark-mode {
        background-image: url("../assets/backdrop_DM4.png");
      }

      .darkmodeButton {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .indexInformation {
        color: var(--index-menu-color);
        font-size: 3vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--index-bg-color);
      }

      .titleIndex {
        font-size: 5vw;
      }

      a {
        color: var(--index-menu-color);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      .drinkOptions,
      .foodOptions,
      .goodsOptions {
        color: var(--color-text-menu);
      }

      article {
        background-color: var(--background-color);
        height: 100vh;
        display: flex;
        justify-content: center;
        overflow: hidden;
        font-family: var(--font-pixel);
      }
    `,
  ];
}
