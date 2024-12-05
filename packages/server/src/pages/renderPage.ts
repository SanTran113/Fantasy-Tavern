import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
  stylesheets: ["/styles/reset.css", "/styles/token.css", "/styles/page.css"],
  styles: [],
  scripts: [
    `
      import { define } from "@calpoly/mustang";`
  ],
  googleFontURL:
    "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang",
  },
};

export default function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}
