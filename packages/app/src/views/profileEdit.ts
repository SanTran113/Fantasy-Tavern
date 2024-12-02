import { define, Form, InputArray, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { InventoryProfile, Option } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class InventoryEditElement extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  // @property()
  // userid?: string;

  @property({ attribute: false })
  init?: InventoryProfile;

  // @state()
  // get profile(): InventoryProfile | undefined {
  //   return this.model.profile;
  // }

  render() {
    return html` <main class="page">
      <mu-form .init=${this.init}>
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

}
