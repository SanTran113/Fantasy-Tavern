import { Auth, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { TavernHeaderElement } from "./components/tavern-header";
import { HomeViewElement } from "./views/home-view";
import { InventoryProfileViewElement } from "./views/invenProfile-view";
import { DrinkMenuViewElement } from "./views/drinkMenu-view";
class AppElement extends LitElement {
  static uses = define({
    // "home-view": HomeViewElement,
    // "invenProfile-view": InventoryProfileViewElement,
    "drinkMenu-view": DrinkMenuViewElement
  });

  protected render() {
    return html`
      <div>hello</div>
      <drinkMenu-view></drinkMenu-view>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    TavernHeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "tavern-app": AppElement,
  "tavern-header": TavernHeaderElement
});