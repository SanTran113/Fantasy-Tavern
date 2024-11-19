import { Auth, define, Dropdown, Events, Observer } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

export class TavernHeaderElement extends LitElement {
  render() {
    return html`
      <header>
        <label @change=${toggleDarkMode}>
          <input type="checkbox" />
          Dark Mode
        </label>
      </header>
    `;
  }

  static styles = css``;

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
