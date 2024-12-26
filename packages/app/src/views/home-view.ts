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
      console.log("username", username);
      console.log("userid", this.userid);
      if (username !== this.userid) {
        this.userid = username;
        const useridElement = this.shadowRoot?.getElementById("userid");
        if (useridElement) {
          useridElement.setAttribute("data-userid", "anonymous");
        }
        console.log("ele", useridElement);
      }
    });
  }

  render() {
    return html`
      <article class="bodyIndex">
        <div class="indexInformation">
          <tavern-header></tavern-header>
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

      body {
        background: var(--background-color);
        background-image: url("../assets/backdrop.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
        font-family: var(--font-pixel);
      }

      /* Index Page CSS */
      body.dark-mode {
        background-image: url("../assets/backdrop_DM4.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .bodyIndex {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .darkmodeButton {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .indexInformation {
        color: var(--index-menu-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        justify-content: center;
        overflow: hidden;

        display: grid;
        grid-template-columns: 4% 48% 48%;
        grid-template-rows: 15% 75%;
        padding: 3vh;
      }
    `,
  ];
}
