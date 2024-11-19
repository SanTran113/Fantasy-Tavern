import { Auth, define, Dropdown, Events, Observer } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";

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
  userid: string = "traveler";

  protected render() {
    return html`
      <header>
        <div id="userid">${this.userid}</div>
        <div class="when-signed-in">
          <button id="signout" @click=${signOut}>Sign Out</button>
        </div>
        <div class="when-signed-out">
          <button href="/login">Sign In</button>
        </div>
        <label @change=${toggleDarkMode}>
          <input type="checkbox" />
          Dark Mode
        </label>
      </header>
    `;
  }
  // <div id="userid"></div>
  // <button id="signout">Sign Out</button>
  // <label class="dark-mode-switch">
  //   <input type="checkbox" /> Dark Mode
  // </label>
  static styles = css`
      :host {
        display: contents;
      }

      #userid:empty::before {
        content: "traveler";
      }

    button:has(#userid:empty)  > .when-signed-in,
    button:has(#userid:not(:empty)) > .when-signed-out {
      display: none;
    }
  `;

  // static initializeOnce() {
  //   function toggleDarkMode(page: HTMLElement, checked: boolean) {
  //     page.classList.toggle("dark-mode", checked);
  //   }

  //   document.body.addEventListener("dark-mode", (event) =>
  //     toggleDarkMode(
  //       event.currentTarget as HTMLElement,
  //       (event as CustomEvent).detail?.checked
  //     )
  //   );
  // }
}
