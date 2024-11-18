import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true
    }
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>(
  "Credential",
  credentialSchema
);

function create(username: string, password: string) {
    return new Promise<Credential>((resolve, reject) => {
      if (!username || !password) {
        reject("must provide username and password");
      }

      credentialModel
        .find({ username })
        .then((found: Credential[]) => {
          if (found.length) reject("username exists");
        })

    // if not then encrpt (hash) password
        .then(() =>
          bcrypt
            .genSalt(10)
            .then((salt: string) => bcrypt.hash(password, salt))
            .then((hashedPassword: string) => {
              const creds = new credentialModel({
                username,
                hashedPassword
              });
              creds.save().then((created: Credential) => {
                if (created) resolve(created);
              });
            })
        );
    });
  }

//   finds a credential in the database by username and then uses bcrypt.compare to check whether it matches the password that was presented by the user
function verify(

    username: string,
    password: string
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {

    // find user based on username
        credentialModel
        .find({ username })
        .then((found) => {
          if (found && found.length === 1) return found[0];
          else reject("Invalid username or password");
        })

    // then use bcrypt to verify password
        .then((credsOnFile) => {
          if (credsOnFile)
            bcrypt.compare(
              password,
              credsOnFile.hashedPassword,
              (_, result) => {
                console.log(
                  "Verified",
                  result,
                  credsOnFile.username
                );
                if (result) resolve(credsOnFile.username);
                else reject("Invalid username or password");
              }
            );
          else reject("Invalid username or password");
        });
    });
  }

  export default { create, verify };

