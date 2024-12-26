import { Auth, define, Dropdown, Events, Observer } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";
import reset from "../styles/reset.css";

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class TavernHeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  @state()
  userid: string = "";

  protected render() {
    return html`
      <header>
        <mu-dropdown>
          <a slot="actuator"> ☰ </a>
          <menu>
            <li>
              <span id="userid">${this.userid}</span>
            </li>
            <li>
              <label @change=${toggleDarkMode}>
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout" @click=${signOut}>Sign Out</a>
            </li>
            <section class="htmlIndex">
              <li>
                <a href="/app/drinkMenu/${this.userid}">Drink Menu</a>
              </li>
              <li>
                <a href="food.html">Food Menu</a>
              </li>
              <li>
                <a href="quests.html">Quest Board</a>
              </li>
              <li>
                <a href="goods.html">General Goods</a>
              </li>
              <li>
                <a href="/app/inventoryProfiles/${this.userid}">Inventory</a>
              </li>
            </section>
          </menu>
        </mu-dropdown>
      </header>
    `;
  }
  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
        

      a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
        font-size: 3em;
      }

      menu {
        position: absolute;
        width: max-content;
        left: 10%;
        font-size: 3vh;
      }

      menu a {
        color: white;
        cursor: pointer;
        padding: 0.5em;
      }

      a:has(#userid:empty) ~ menu > .when-signed-in,
      a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
        display: none;
      }
    `,
  ];

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

  static initializeOnce() {
    function toggleDarkMode(page: HTMLElement, checked: boolean) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}
