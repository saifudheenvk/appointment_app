import { Request, Response } from "express";
import UserModel from "../../database/users/users.model";
const express = require("express");
const { loginValidation } = require("./authValidation");
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const validated = loginValidation(req.body);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      const data = await UserModel.isUserExistWithThisPassword(req.body);
      res.statusMessage = data.message;
      res.json(data.data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
});

module.exports = router;