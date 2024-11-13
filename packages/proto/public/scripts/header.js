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
  
    static template = html`<template>
        <header>
          <h1 class="titleIndex">Fantasy Tavern</h1>
          <label
            class="darkmodeButton"
            onchange="toggleDarkMode(event.target, event.target.checked)"
          >
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
        </header>`

    // observe auth context
    _authObserver = new Observer(this, "blazing:auth");

    connectedCallback() {
      this._authObserver.observe(({ user }) => {
        if (user && user.username !== this.userid) {
          this.userid = user.username;
        }
      });
    }

    // getter and setters for userId
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
        headings.styles,
        HeaderElement.styles
      );

    const dm = this.shadowRoot.querySelector(
      ".dark-mode-switch"
    );

    dm.addEventListener("click", (event) =>
      Events.relay(event, "dark-mode", {
        checked: event.target.checked
      })
    );

    this._userid = this.shadowRoot.querySelector("#userid");
    this._signout = this.shadowRoot.querySelector("#signout");

    this._signout.addEventListener("click", (event) =>
      Events.relay(event, "auth:message", ["auth/signout"])
    );
  }
  }
  