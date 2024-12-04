import {
    define,
    Form,
    History,
    InputArray,
    View,
    Auth,
    Observer,
  } from "@calpoly/mustang";
  import { css, html } from "lit";
  import { property, state } from "lit/decorators.js";
  
  import { Option } from "../../../server/src/models/option";
  import { InventoryProfile } from "server/models";
  import { Msg } from "../messages";
  import { Model } from "../model";
  
  export class DrinkMenuViewElement extends View<Model, Msg> {
    static uses = define({
      "mu-form": Form.Element,
      "input-array": InputArray.Element,
    });
  
    @property({ attribute: "user-id", reflect: true })
    userid = "";
  
    @state()
    get profile(): InventoryProfile | undefined {
      return this.model.profile;
    }
  
    @state()
    get optionsIndex(): Option[] | undefined {
      return this.model.optionsIndex;
    }
  
    constructor() {
      super("tavern:model");
    }
  
    // _authObserver = new Observer<Auth.Model>(this, "main:auth");
  
    // _user = new Auth.User();
  
    attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null
    ) {
      super.attributeChangedCallback(name, old, value);
  
      if (name === "userid" && old !== value && value)
        this.dispatchMessage(["profile/select", { userid: value }]);
    }
  
    connectedCallback() {
      super.connectedCallback();
    }
  
    _handleSubmit(event: Form.SubmitEvent<InventoryProfile>) {
      this.dispatchMessage([
        "profile/save",
        {
          userid: this.userid,
          profile: event.detail,
          onSuccess: () => {
            console.log("Navigating");
            console.log("submit userid", this.userid);
            History.dispatch(this, "history/navigate", {
              href: `/app/inventoryProfiles/${this.userid}`,
            });
          },
          onFailure: (error: Error) => console.log("ERROR:", error),
        },
      ]);
    }
  
    render() {
      console.log(this.userid)
      const { userid, name, userClass, inventory = [] } = this.profile || {};
  
      return 
        html`
            <profile-viewer>
              <span slot="name">${name}</span>
              <span slot="userClass">${userClass}</span>
              ${inventory.map(
                (s) =>
                  html` <span
                    slot="inventory"
                    style="--bgImg: url(data:image/png;base64,${s.img})"
                    class="imgInvenBg"
                  >
                    ㅤ
                  </span>`
              )}
            </profile-viewer>
          `;
    }
  
    static styles = [
      css`
        :host {
          display: contents;
        }
        :host([mode="edit"]),
        :host([mode="new"]) {
          --display-view-none: none;
        }
  
        :host([mode="view"]) {
          --display-editor-none: none;
        }
  
        section.view {
          display: var(--display-view-none, grid);
        }
        mu-form.edit {
          display: var(--display-editor-none, grid);
        }
  
        article {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background: var(--background-color);
          font-family: var(--font-pixel);
        }
  
        .mainInventory {
          background-image: url("/assets/Inventory/InventoryPageBg.png");
          padding: 5%;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          aspect-ratio: 4/2;
  
          display: grid;
          grid-template-columns: repeat(15, 1fr);
          grid-template-rows: repeat(7, 1fr);
          gap: 10px;
          grid-auto-rows: minmax(100px, auto);
        }
  
        .profile {
          grid-column: 4 / span 3;
          grid-row: 2 / span 3;
          background-image: url("/assets/Inventory/profileTavern.png");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
  
        .Inventory {
          background-image: url("/assets/Inventory/inventorybg.png");
          grid-column: 8 / span 5;
          grid-row: 3 / span 4;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
  
          padding: 5%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 3%;
          grid-auto-rows: minmax(100px, auto);
        }
  
        .InventoryTitle {
          background-image: url("/assets/Inventory/InventoryTitle.png");
          grid-column: 8 / span 5;
          grid-row: 2 / span 1;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
  
        .imgInven {
          width: 80%;
        }
  
        .imgInvenBg {
          background: var(--bgImg), url("/assets/Inventory/itemInvBg.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
  
          display: flex;
          align-items: center;
          justify-content: center;
        }
  
        .userName {
          background-image: url("/assets/Inventory/userClassBg.png");
          grid-column: 4 / span 3;
          grid-row: 5 / span 1;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
  
        .class {
          background-image: url("/assets/Inventory/userClassBg.png");
          grid-column: 4 / span 3;
          grid-row: 6 / span 1;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
      `,
    ];
  }
  