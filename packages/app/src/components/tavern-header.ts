import { LitElement, css, html } from "lit";

export class TavernHeaderElement extends LitElement {
  render() {
    return html`
      <header>
        <label
          class="darkmodeButton"
          onchange="toggleDarkMode(event.target, event.target.checked)"
        >
          <input type="checkbox" autocomplete="off" />
          Dark mode
        </label>
      </header>
    `;
  }

  static styles = css``;
}
