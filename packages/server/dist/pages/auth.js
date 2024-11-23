"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  LoginPage: () => LoginPage,
  RegistrationPage: () => RegistrationPage
});
module.exports = __toCommonJS(auth_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
const styles = [import_server.css``];
class LoginPage {
  render() {
    return (0, import_renderPage.default)({
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
        import_server.css`
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
        `
      ],
      body: import_server.html`
        <body>
          <mu-auth provides="main:auth">
            <article class="login-body">
              <tavern-header></tavern-header>
              <login-form class="login" api="/auth/login">
                <!-- <h3 slot="title">Sign in and go places!</h3> -->
              </login-form>
              <p class="register">
                Or would you like to
                <a href="./register">register as a new traveler </a>?
              </p>
            </article>
          </mu-auth>
        </body>
      `
    });
  }
}
class RegistrationPage {
  render() {
    return (0, import_renderPage.default)({
      styles: [
        import_server.css`
          .login {
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
        `
      ],
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
      body: import_server.html`<body>
        <mu-auth provides="main:auth">
          <article class="form-body">
            <tavern-header> </tavern-header>
            <main class="page">
              <registration-form api="/auth/register">
                <h3 slot="title">Sign up to plan your next trip!</h3>
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginPage,
  RegistrationPage
});
