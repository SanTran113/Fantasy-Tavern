import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement, RenderOptions } from "lit";
import { state } from "lit/decorators.js";
import { DrinkSection } from "../../../server/src/models/drinkSection";
import { Option } from "../../../server/src/models/option";

export class DrinkMenuViewElement extends LitElement {
    src = "/api/options";
  
    @state()
    drinkMenu = new Array<DrinkSection>();
    options = new Array<Option>();
  
    render() {
        const drinkSections = this.drinkMenu.map(this.renderDrinks);

        return html`
          <main class="drinkMain">
            <div class="drinkMenu">${drinkSections}</div>
          </main>
        `;
    }


    // renderBody() {
    //     const { title, drinkSections } = this.data;
    
    //     const sectionList = drinkSections.map((drinkSections) =>
    //       this.renderDrinkSections(drinkSections)
    //     );
    
    //     return html` 
    //     <body class="bodyDrink">
    //       <main class="drinkMain">
    //         <h1 class="drink-title">${title}</h1>
    //         <div class="drinkMenu">${sectionList}</div>
    //       </main>
    //     </body>`;
    //   }


    renderDrinks(drinkSections: DrinkSection) {
        const { title, icon, optionMenu } = drinkSections;
    
        const optionList = optionMenu.map((options) => this.renderOptions(options));
    
        return html`
          <menu-accommodation>
            <span slot="title">${title}</span>
            <span slot="icon">
              <svg class="icon">
                <use xlink:href="icons/icons.svg#${icon}" />
              </svg>
            </span>
            <span slot="option"> ${optionList} </span>
          </menu-accommodation>
        `;
      }
    
    
      renderOptions(options: Option) {
        const { name, price, desc } = options;
    
        return html`
          <option-accommodation>
            <span slot="name">${name}</span>
            <span slot="price">${price}</span>
            <span slot="desc">${desc}</span>
          </option-accommodation>
        `;
      }

      hydrate(url: string) {
        fetch(url, {
          headers: Auth.headers(this._user)
        })
          .then((res: Response) => {
            if (res.status === 200) return res.json();
            throw `Server responded with status ${res.status}`;
          })
          .then((json: unknown) => {
            if (json) {
              const { drinks } = json as { data: Array<DrinkSection> };
              this.drinkMenu = drinks;
            }
          })
          .catch((err) =>
            console.log("Failed to tour data:", err)
          );
      }
         
      _authObserver = new Observer<Auth.Model>(
        this,
        "main:auth"
      );
  
      _user = new Auth.User();

      connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
          if (user) {
            this._user = user;
          }
          this.hydrate(this.src);
        });
      }
    }