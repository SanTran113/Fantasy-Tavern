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
  userid: string = "anonymous";

  protected render() {
    return html`
      <header>
        <div id="userid">${this.userid}</div>
        <div class="when-signed-in">
          <a id="signout" @click=${signOut}>Sign Out</a>
        </div>
        <div class="when-signed-out">
          <a href="/login">Sign In</a>
        </div>
        <label @change=${toggleDarkMode}>
          <input type="checkbox" />
          Dark Mode
        </label>
      </header>
    `;
  }
  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }

      /* #userid:empty ~ .when-signed-in {
        display: none;
      }

      #userid:not(:empty) ~ .when-signed-out {
        display: none;
      } */
    `,
  ];

  _authObserver = new Observer<Auth.Model>(this, "main:auth");

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
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
