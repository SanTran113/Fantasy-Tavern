// src/index.ts
import express, { Request, Response } from "express";
import { getDrinks } from "./services/drinkMockData";
import { getInventory } from "./services/inventoryMock";
import { DrinksPage, InventoryProfilePage } from "./pages/index";
import { connect } from "./services/mongo";
import InventoryProfile from "./services/inventory-svc";
import inventoryProfiles from "./routes/inventoryProfiles";

connect("tavern");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());

app.use("/api/inventoryProfiles", inventoryProfiles);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
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

  InventoryProfile.get(userid).then((data) => {
    const page = new InventoryProfilePage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});


