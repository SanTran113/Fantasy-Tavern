import { define, Form, History, InputArray, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile, Option } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";


export class InventoryEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

    @property()
    userid?: string;

    @state()
    get profile(): InventoryProfile | undefined {
    return this.model.profile;
    }

    render() {
    return html`
        <main class="page">
        <mu-form
            .init=${this.profile}
            @mu-form:submit=${this._handleSubmit}>
            <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Class</span>
            <input name="userClass" />
          </label>
          <label>
            <span>Inventory</span>
            <input-array name="inventory">
              <span slot="label-add">Add an items</span>
            </input-array>
          </label>
        </mu-form>
        </main>`;
    }


    _handleSubmit(event: Form.SubmitEvent<InventoryProfile>) {
        this.dispatchMessage([
          "profile/save",
          {
            userid: this.userid,
            profile: event.detail,
            onSuccess: () =>
              History.dispatch(this, "history/navigate", {
                href: `/app/inventoryProfiles/${this.userid}`
              }),
            onFailure: (error: Error) =>
              console.log("ERROR:", error)
          }
        ]);
      }
}