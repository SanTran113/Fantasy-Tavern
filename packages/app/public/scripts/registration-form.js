import { css, html, shadow, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class RegistrationForm extends HTMLElement {
  static template = html`<template>
    <form>
      <slot name="title">
        <h3>Register For Your Traveler's Card!</h3>
      </slot>
      <label class="login-user">
        <span>
          <slot name="username">Username</slot>
        </span>
        <input name="username" autocomplete="off" />
      </label>
      <label class="login-pass">
        <span>
          <slot name="password">Password</slot>
        </span>
        <input type="password" name="password" />
      </label>
      <img src="/assets/submit-x.png" />
      <slot name="submit">
        <button type="submit">Sign Up</button>
      </slot>
      <hr />
    </form>
  </template>`;

  static styles = css`
    form {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(8, 1fr);
      gap: 10px;
      width: 100%;
      height: 100%;
    }

    .login-user {
      display: contents;

      > span {
        grid-column: 2 / span 1;
        grid-row: 3 / span 1;
        justify-self: end;
        margin: auto;
        font-size: var(--form-text-size);
      }
      > input {
        grid-column: 3 / span 6;
        grid-row: 3 / span 1;
        font-size: 30px;
        padding: 2%;
        font-family: var(--font-pixel);
        outline-color: var(--form-input-border-color);
      }
    }

    .login-pass {
      display: contents;

      > span {
        grid-column: 2 / span 1;
        grid-row: 5 / span 1;
        justify-self: end;
        margin: auto;
        font-size: var(--form-text-size);
      }
      > input {
        grid-column: 3 / span 6;
        grid-row: 5 / span 1;
        font-size: 30px;
        padding: 2%;
        outline-color: var(--form-input-border-color);
      }
    }

    input {
      background-color: var(--form-input-bg-color);
      border: 0px solid;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 10px solid #451410;
      margin: 1em 0;
      padding: 0;

      grid-column: 2 / span 6;
      grid-row: 8 / span 1;
    }

    img {
      grid-column: 2 / span 1;
      grid-row: 7 / span 1;
      width: 5em;
      height: 5em;
      aspect-ratio: 1/1;
      margin: auto;
    }

    ::slotted(*[slot="title"]),
    slot[name="title"] > * {
      grid-column: 2 / span 8;
      font-size: 60px;
    }

    ::slotted(button[slot="submit"]),
    button[type="submit"] {
      grid-column: 3 / span 4;
      grid-row: 7 / span 1;
      align-self: center;

      height: 100%;
      background-color: var(--form-button-color);
      border: 0px solid;
      font-size: 30px;
      font-family: var(--font-pixel);
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("form");
  }

  constructor() {
    super();

    shadow(this)
      .template(RegistrationForm.template)
      .styles(reset.styles, headings.styles, RegistrationForm.styles);

    this.form.addEventListener("submit", (event) =>
      submitRegistrationForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}

function submitRegistrationForm(event, endpoint, redirect) {
  event.preventDefault();

  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify(Object.fromEntries(data));

  console.log("POST new user request:", body);

  fetch(endpoint, { method, headers, body })
    .then((res) => {
      if (res.status !== 201)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      const { token } = payload;

      Events.dispatch;
      form.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect }],
        })
      );
    })
    .catch((err) => console.log("Error submitting form:", err));
}
