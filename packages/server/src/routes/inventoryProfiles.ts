import express, { Request, Response } from "express";
import { InventoryProfile } from "../models/inventory";
import { Option } from "models";
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
    .then((adventurer: InventoryProfile) => res.json(adventurer))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  InventoryProfiles.remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

router.post("/:userid/addToInventory", (req: Request, res:Response) => {
  const { userid } = req.params;
  const option: Option = req.body;

  InventoryProfiles.get(userid)
  .then((profile: InventoryProfile) => {
    if (!profile) throw `User profile not found: ${userid}`;
    
    profile.inventory.push(option);
    return InventoryProfiles.update(userid, profile);
  })
  .then((updatedProfile) => res.status(200).json(updatedProfile))
  .catch((err) => res.status(500).send(`Error adding drink: ${err}`));
});

export default router;
