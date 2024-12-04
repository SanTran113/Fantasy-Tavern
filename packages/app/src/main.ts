import { Auth, define, History, Store, Switch } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { TavernHeaderElement } from "./components/tavern-header";
import { HomeViewElement } from "./views/home-view";
import { InventoryProfileViewElement } from "./views/invenProfile-view";
import { DrinkMenuViewElement } from "./views/drinkMenu-view";
import { InventoryViewElement } from "./views/profileView";
import { InventoryEditElement } from "./views/profileEdit";

const routes: Switch.Route[] = [
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/app",
    view: () => html`
      <!-- not sure what to make the view as? -->
      <home-view></home-view>
    `,
  },
  {
    auth: "protected",
    path: "/app/inventoryProfiles/:id",
    view: (params: Switch.Params, query?: URLSearchParams) => html`
      <inven-profile-view
        userid=${params.id}
        mode=${query?.has("edit") ? "edit" : query?.has("new") ? "new" : "view"}
      ></inven-profile-view>
    `,
  },
  {
    path: "/app/drinkMenu/:id",
    view: (params: Switch.Params) => html`
      <drink-menu-view userid="${params.id}"></drink-menu-view>
    `,
  }  
];

class AppElement extends LitElement {
  render() {
    console.log("main.ts loaded");

    return html` <mu-switch></mu-switch>; `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    TavernHeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "main:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "tavern:history", "main:auth");
    }
  },
  "tavern-app": AppElement,
  "tavern-header": TavernHeaderElement,
  "inven-profile-view": InventoryProfileViewElement,
  "profile-viewer": InventoryViewElement,
  "profile-editor": InventoryEditElement,
  "drink-menu-view": DrinkMenuViewElement,
  "home-view": HomeViewElement,
});
