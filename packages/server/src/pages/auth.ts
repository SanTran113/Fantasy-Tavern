import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage";

const styles = [css``];

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
        `,
      ],
      styles: [
        css`
          .login-body {
            background: url("/assets/form-bg.png");
            background-color: var(--background-color);
            padding: 5%;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            aspect-ratio: 3/2;

            display: grid;
            grid-template-columns: repeat(15, 1fr);
            grid-template-rows: repeat(12, 1fr);
            gap: 10px;
            grid-auto-rows: minmax(100px, auto);
          }

          .login {
            grid-column: 1 / span 15;
            grid-row: 2 / span 10;
          }

          .register {
            display: flex;
            justify-content: center;
            grid-column: 2 / span 10;
            grid-row: 12 / span 1;
            font-size: 25px;
          }

          a {
            color: var(--form-button-color);
          }
        `,
      ],
      body: html`
        <body>
          <mu-auth provides="main:auth">
            <article class="login-body">
              <tavern-header></tavern-header>
              <login-form class="login" api="/auth/login">
                <h3 slot="title">Welcome Back Traveler!</h3>
              </login-form>
              <p class="register">
                Or would you like to
                <a href="./register">register as a new traveler </a>?
              </p>
            </article>
          </mu-auth>
        </body>
      `,
    });
  }
}

export class RegistrationPage {
  render() {
    return renderPage({
      styles: [
        css`
          .register-body {
            background: url("/assets/form-bg.png");
            background-color: var(--background-color);
            padding: 5%;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            aspect-ratio: 3/2;
            
          }

          .login {
            display: flex;
            justify-content: center;
            grid-column: 2 / span 10;
            grid-row: 12 / span 1;
            font-size: 25px;
          }

          a {
            color: var(--form-button-color);
          }
        `,
      ],
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { RegistrationForm } from "/scripts/registration-form.js";

        define({
          "mu-auth": Auth.Provider,
          "registration-form": RegistrationForm
        })
        `,
      ],
      body: html`<body>
        <mu-auth provides="main:auth">
          <article class="register-body">
            <tavern-header></tavern-header>
            <registration-form api="/auth/register">
              <h3 slot="title">Register For Your Traveler's Card!</h3>
            </registration-form>
            <p class="login">
              Already signed up? You can
              <a href="./login">log in</a> instead.
            </p>
          </article>
        </mu-auth>
      </body> `,
    });
  }
}
