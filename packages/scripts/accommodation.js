import {css, html, shadow} from "@calpoly.mustang";

export class AccommodationElement extends HTMLElement {
    static template = html`
    <template></template>
    `;
    
    static styles = css ``;

    constructor() {
        super();
        shadow(this)
        .template(AccomodationElement.template)
        .styles(AccommodationElement.styles);
    }
}