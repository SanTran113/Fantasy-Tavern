// src/index.ts
import express, { Request, Response } from "express";
import { getDrinks } from "./services/drink-svc";
import { DrinksPage } from "./pages";


const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get(
  "/drink/drinkMenuId",
  (req: Request, res: Response) => {
    const { drinkMenuId } = req.params;
    const data = getDrinks(drinkMenuId);
    const page = new DrinksPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  }
);