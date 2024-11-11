import express, { Request, Response } from "express";
import { Option } from "../models/option";

import Options from "../services/drinkOption-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Options.index()
      .then((list: Option[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
  });
  
  router.get("/:optionid", (req: Request, res: Response) => {
    const { optionid } = req.params;
  
    Options.get(optionid)
      .then((option: Option) => res.json(option))
      .catch((err) => res.status(404).send(err));
  });

  router.post("/", (req: Request, res: Response) => {
    const newOption = req.body;
  
    Options.create(newOption)
      .then((option: Option) =>
        res.status(201).json(option)
      )
      .catch((err) => res.status(500).send(err));
  });

  router.put("/:optionid", (req: Request, res: Response) => {
    const { optionid } = req.params;
    const editedOption = req.body;
  
    Options.update(optionid, editedOption)
      .then((option: Option) => res.json(option))
      .catch((err) => res.status(404).send(err));
  });

  router.delete("/:optionid", (req: Request, res: Response) => {
    const { optionid } = req.params;
  
    Options.remove(optionid)
      .then(() => res.status(204).end())
      .catch((err) => res.status(404).send(err));
  });