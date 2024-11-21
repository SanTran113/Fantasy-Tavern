// import { Auth, Observer } from "@calpoly/mustang";
import { LitElement } from "lit";
// import { state } from "lit/decorators.js";
// import { InventoryProfile } from "../../../server/src/models/inventory"

export class HomeViewElement extends LitElement {
    src = "/api/inventoryProfiles";
  
    // observes changes to the 
    // @state()
    // inventoryIndex = new Array<InventoryProfile>();
  
    // _authObserver = new Observer<Auth.Model>(
    //     this,
    //     "main:auth"
    //   );
    
    //   _user = new Auth.User();
    
    //   connectedCallback() {
    //     super.connectedCallback();
    //     this._authObserver.observe(({ user }) => {
    //       if (user) {
    //         this._user = user;
    //       }
    //       this.hydrate(this.src);
    //     });
    //   }

    // hydrate(url: string) {
    //     fetch(url, {
    //       headers: Auth.headers(this._user)
    //     })
    //       .then((res: Response) => {
    //         if (res.status === 200) return res.json();
    //         throw `Server responded with status ${res.status}`;
    //       })
    //       .then((json: unknown) => {
    //         if (json) {
    //           const { inventoryProfiles } = json as { data: Array<InventoryProfile> };
    //           this.inventoryIndex = inventoryProfiles;
    //         }
    //       })
    //       .catch((err) =>
    //         console.log("Failed to tour data:", err)
    //       );
    //   }

    // render() {
    //   const inventoryList = this.tourIndex.map(this.renderItem);
  
    //   return html`
    //     <main class="page">
    //       <header></header>
    //       <dl>${inventoryList}</dl>
    //     </main>
    //   `;

      
    // }
}