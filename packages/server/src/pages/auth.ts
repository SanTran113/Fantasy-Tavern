import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage";

const styles = [
  css`
  `
];

export class LoginPage {
  render() {
    return renderPage({
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { LoginForm } from "/scripts/login-form.js";

        define({
          "mu-auth": Auth.Provider,
          "login-form": LoginForm
        })
        `
      ],
      styles: [
        css`
          /* your CSS here */
        `
      ],
      body: html`
        <body>
          <mu-auth provides="main:auth">
            <article>
              <tavern-header></tavern-header>
              <main class="page">
                <login-form api="/auth/login">
                  <h3 slot="title">Sign in and go places!</h3>
                </login-form>
                <p class="register">
                  Or did you want to
                  <a href="./register">
                    register as a new user
                  </a>
                  ?
                </p>
              </main>
            </article>
          </mu-auth>
        </body>
      `
    });
  }
}


export class RegistrationPage {
  render() {
    return renderPage({
      styles,
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { RegistrationForm } from "/scripts/registration-form.js";

        define({
          "mu-auth": Auth.Provider,
          "registration-form": RegistrationForm
        })
        `
      ],
      body: html`<body>
        <mu-auth provides="blazing:auth">
          <article>
            <blz-header> </blz-header>
            <main class="page">
              <registration-form api="/auth/register">
                <h3 slot="title"
                  >Sign up to plan your next trip!</h3
                >
              </registration-form>
              <p class="login">
                Already signed up? You can
                <a href="./login">log in</a> instead.
              </p>
            </main>
          </article>
        </mu-auth>
      </body> `
    });
  }
}
