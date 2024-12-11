import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";
import reset from "../styles/reset.css";

export class HomeViewElement extends LitElement {

  @state()
  userid: string = "";

  _authObserver = new Observer<Auth.Model>(this, "main:auth");

connectedCallback() {
  super.connectedCallback();

  this._authObserver.observe(({ user }) => {
    const username = user?.username || "anonymous";
    console.log("username", username)
    console.log("userid", this.userid)
    if (username !== this.userid) {
      this.userid = username;
      const useridElement = this.shadowRoot?.getElementById("userid");
      if (useridElement) {
        useridElement.setAttribute("data-userid", "anonymous");
      }
    console.log("ele", useridElement)

    }
  });
}

  render() {    
    return html`
      <article class="bodyIndex">
        <div class="indexInformation">
          <h1 class="titleIndex">Fantasy Tavern</h1>
          <tavern-header></tavern-header>
          <section class="htmlIndex">
            <a href="/app/drinkMenu/${this.userid}">Drink Menu</a>
            <a href="food.html">Food Menu</a>
            <a href="quests.html">Quest Board</a>
            <a href="goods.html">General Goods</a>
            <a href="/app/inventoryProfiles/${this.userid}">Inventory</a>
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
      body.dark-mode {
        background: black;
        /* background-image: url("../assets/backdrop_DM4.png"); */
      }

      body {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../assets/backdrop.png");
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
        height: 100vh;
        display: flex;
        justify-content: center;
        overflow: hidden;
        font-family: var(--font-pixel);
      }
    `,
  ];
}
