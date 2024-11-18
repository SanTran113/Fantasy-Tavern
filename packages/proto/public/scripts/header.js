import {
  css,
  define,
  html,
  shadow,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class HeaderElement extends HTMLElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  static template = html`
    <template>
      <div id="userid"></div>
      <button id="signout">Sign Out</button>
      <label class="dark-mode-switch">
        <input type="checkbox" /> Dark Mode
      </label>
    </template>
  `;

  static styles = css``;

  get userid() {
    return this._userid.textContent;
  }

  set userid(id) {
    if (id === "anonymous") {
      this._userid.textContent = "";
      this._signout.disabled = true;
    } else {
      this._userid.textContent = id;
      this._signout.disabled = false;
    }
  }

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(
        reset.styles,
        // headings.styles,
        HeaderElement.styles
      );

    this._userid = this.shadowRoot.querySelector("#userid");
    this._signout = this.shadowRoot.querySelector("#signout");

    const dm = this.shadowRoot.querySelector(".dark-mode-switch input");

    dm.addEventListener("click", (event) =>
      Events.relay(event, "dark-mode", {
        checked: event.target.checked
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
