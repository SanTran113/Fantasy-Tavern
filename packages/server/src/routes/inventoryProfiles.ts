import express, { Request, Response } from "express";
import { InventoryProfile } from "../models/inventory";

import InventoryProfiles from "../services/inventory-svc";
import { connect } from "mongoose";

const router = express.Router();

router.get("/", (_, res: Response) => {
    InventoryProfiles.index()
      .then((list: InventoryProfile[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
  });

router.get("/:userid", (req: Request, res: Response) => {
const { userid } = req.params;

InventoryProfiles.get(userid)
    .then((invenProfile: InventoryProfile) => res.json(invenProfile))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newInventoryProfile = req.body;

  InventoryProfiles.create(newInventoryProfile)
    .then((invenProfile: InventoryProfile) =>
      res.status(201).json(invenProfile)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const editedInventoryProfile = req.body;

  InventoryProfiles.update(userid, editedInventoryProfile)
    .then((traveler: InventoryProfile) => res.json(traveler))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  InventoryProfiles.remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
