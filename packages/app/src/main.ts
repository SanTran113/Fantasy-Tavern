import { Auth, History, Switch, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { TavernHeaderElement } from "./components/tavern-header";
import { HomeViewElement } from "./views/home-view";
import { InventoryProfileViewElement } from "./views/invenProfile-view";
import { DrinkMenuViewElement } from "./views/drinkMenu-view";
class AppElement extends LitElement {
  
  static uses = define({
    "inven-profile-view": InventoryProfileViewElement,
    "drink-menu-view": DrinkMenuViewElement
  });

  protected render() {
    console.log("main.ts loaded");

    return html`
      <drink-menu-view></drink-menu-view>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    TavernHeaderElement.initializeOnce();
  }
}

const routes = [
  {
    path: "/",
    redirect: "/app"
  },
  {
    path: "/app",
    view: () => html`
    <!-- not sure what to make the view as? -->
    <drink-menu-view></drink-menu-view>
    `
  },
  {
    path: "/app/inventoryProfiles/:id",
    view: (params: Switch.Params) => html`
      <inven-profile-view inven-id=${params.id}></inven-profile-view>
    `
  },
  {
    path: "/app/drinkMenu",
    view: () => html`
      <drink-menu-view></drink-menu-view>
    `
  },
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "tavern:history");
    }
  },
  "tavern-app": AppElement,
  "tavern-header": TavernHeaderElement
});