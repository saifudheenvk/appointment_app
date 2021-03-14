import { Request, Response } from "express";
import UserModel from "../../database/users/users.model";
import { IUserDocument } from "../../database/users/users.types";
import { userTypes } from "../../config/userTypes";
import { ResponseModel } from "../../../types";
const { registerValidation } = require("./userValidation");
const express = require("express");
const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.statusMessage = err;
    res.send(false);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user: IUserDocument | null = await UserModel.findById(req.params.id);
    if (user) {
      res.json({ name: user.name, userType: user.userType, email: user.email });
    } else {
      res.statusMessage = "No such User";
      res.send(null);
    }
  } catch (err) {
    res.statusMessage = err;
    res.send(false);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  const validated = registerValidation(req.body);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      let savedUser: ResponseModel = { data: null, message: "" };
      if (req.body.userType === userTypes.ADMIN) {
        if (req.body.authKey === process.env.ADMIN_AUTH) {
          let body = req.body;
          delete body.authKey;
          savedUser = await UserModel.registerUser(body);
        } else {
          savedUser = { data: false, message: "Auth Token is not valid" };
        }
      } else {
        savedUser = await UserModel.registerUser(req.body);
      }
      console.log(req.body);
      res.statusMessage = savedUser.message;
      res.send(savedUser.data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
});

module.exports = router;
