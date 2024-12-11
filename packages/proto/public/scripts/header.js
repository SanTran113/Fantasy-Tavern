import {
  css,
  define,
  html,
  shadow,
  Dropdown,
  Events,
  Observer,
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class HeaderElement extends HTMLElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  static template = html`
    <template>
      <div id="userid"></div>
      <div class="when-signed-in">
        <a id="signout">Sign Out</a>
      </div>
      <div class="when-signed-out">
        <a href="/login">Sign In</a>
      </div>
      <label class="dark-mode-switch">
        <input type="checkbox" />
        Dark Mode
      </label>
    </template>
  `;

  static styles = css`
    :host {
      display: contents;
    }

    #userid:empty ~ .when-signed-in {
      display: none;
    }

    #userid:not(:empty) ~ .when-signed-out {
      display: none;
    }
  `;

  get userid() {
    return this._userid.textContent;
  }

  set userid(id) {
    if (id === "anonymous") {
      this._userid.textContent = "";
    } else {
      this._userid.textContent = id;
    }
  }

  constructor() {
    super();
    shadow(this).template(HeaderElement.template).styles(
      reset.styles,
      // headings.styles,
      HeaderElement.styles
    );

    this._userid = this.shadowRoot.querySelector("#userid");
    this._signout = this.shadowRoot.querySelector("#signout");

    const dm = this.shadowRoot.querySelector(".dark-mode-switch");

    dm.addEventListener("click", (event) =>
      Events.relay(event, "dark-mode", {
        checked: event.target.checked,
      })
    );

    this._signout.addEventListener("click", (event) =>
      Events.relay(event, "auth:message", ["auth/signout"])
    );
  }

  _authObserver = new Observer(this, "main:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
    });
  }

  static initializeOnce() {
    function toggleDarkMode(page, checked) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(event.currentTarget, event.detail.checked)
    );
  }
}
