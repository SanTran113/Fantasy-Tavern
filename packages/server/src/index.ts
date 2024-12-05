// src/index.ts
import express, { Request, Response } from "express";
import { getDrinks } from "./services/drinkMockData";
import { getInventory } from "./services/inventoryMock";
import { DrinksPage, InventoryProfilePage } from "./pages/index";
import { LoginPage, RegistrationPage } from "./pages/auth";
import { connect } from "./services/mongo";
import InventoryProfile from "./services/inventory-svc";
import Options from "./services/drinkOption-svc";
import inventoryProfiles from "./routes/inventoryProfiles";
import options from "./routes/options";
import auth, { authenticateUser } from "./routes/auth";
import { model } from "mongoose";
import fs from "node:fs/promises";
import path from "path";

connect("tavern");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());

// make sure that each api can only be accessed with authenticateUser 
app.use("/api/inventoryProfiles", authenticateUser, inventoryProfiles);
app.use("/api/options", options);
app.use("/auth", auth);

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.get("/drink/:drinkMenuId", (req: Request, res: Response) => {
  const { drinkMenuId } = req.params;
  const data = getDrinks(drinkMenuId);
  const page = new DrinksPage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/inventoryProfiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const mode =
    req.query["new"] !== undefined
      ? "new"
      : req.query.edit !== undefined
        ? "edit"
        : "view";

  if (mode === "new") {
    const page = new InventoryProfilePage(null, mode);
    res.set("Content-Type", "text/html").send(page.render());
  } else {
    InventoryProfile.get(userid)
      .then((data) => {
        if (!data) throw `Not found: ${userid}`;
        const page = new InventoryProfilePage(data, mode);
        res
          .set("Content-Type", "text/html")
          .send(page.render());
      })
      .catch((error) => {
        console.log(error);
        res.status(404).end();
      });
  }
});

app.get("/options/:_id", (req: Request, res: Response) => {
  const { _id } = req.params;

  InventoryProfile.get(_id).then((data) => {
    const mode =
    req.query["new"] !== undefined
      ? "new"
      : req.query.edit !== undefined
        ? "edit"
        : "view";
        
    const page = new InventoryProfilePage(data, mode);
    res.set("Content-Type", "text/html").send(page.render());
  });});

  app.get("/login", (req: Request, res: Response) => {
    const page = new LoginPage();
    res.set("Content-Type", "text/html").send(page.render());
  });

  app.get("/register", (req: Request, res: Response) => {
    const page = new RegistrationPage();
    res.set("Content-Type", "text/html").send(page.render());
  });


  

