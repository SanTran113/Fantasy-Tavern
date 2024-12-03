import { define, Form, History, InputArray, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile, Option } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";
import { InventoryViewElement } from "./profileView";
import { InventoryEditElement } from "./profileEdit";

export class InventoryProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
    "profile-viewer": InventoryViewElement,
    "profile-editor": InventoryEditElement,
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property()
  userid?: string;

  @property({ type: String, reflect: true })
  mode = "view";

  @state()
  get profile(): InventoryProfile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("tavern:model");
  }

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
    this.addEventListener("edit-mode", () => {
      console.log("Edit mode triggered");
      this.edit = true;
      this.mode = "edit";
      console.log("Edit:", this.edit, "Mode:", this.mode);
      this.requestUpdate();
    });
  }


  _handleSubmit(event: Form.SubmitEvent<InventoryProfile>) {
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid,
        profile: event.detail,
        onSuccess: () =>{
          console.log("Navigating")
          console.log("submit userid", this.userid)
          History.dispatch(this, "history/navigate", {
            href: `/app/inventoryProfiles/${this.userid}`,
          })},
        onFailure: (error: Error) => console.log("ERROR:", error),
      },
    ]);
  }


  render() {
    const { userid, name, userClass, inventory = [] } = this.profile || {};
    console.log("Edit, Mode:", this.edit, this.mode)
    
    const renderOptions = (inventory: Option[]) => {
      return html` ${inventory.map(
        (s) =>
          html` <div
            style="--bgImg: url(data:image/png;base64,${s.img})"
            class="imgInvenBg"
          ></div>`
      )}`;
    };

    return this.edit
      ? html`
          <profile-editor
            .init=${this.profile}
            @mu-form:submit=${(event: Form.SubmitEvent<InventoryProfile>) =>
              this._handleSubmit(event)}
          >
          </profile-editor>
        `
      : html`
          <profile-viewer>
            <span slot="name">${name}</span>
            <span slot="userClass">${userClass}</span>
            <span slot="inventory">${renderOptions(inventory)}</span>
          </profile-viewer>
        `;
  }

  static styles = [
    reset.styles,
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
          `,
  ];
}
