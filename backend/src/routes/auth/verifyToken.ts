const jwt = require("jsonwebtoken");
import { Response, NextFunction } from "express";

module.exports = (userType: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
      const options = {
        expiresIn: "2d",
      };
      const verified = jwt.verify(token, process.env.JWT_TOKEN, options);
      req.user = verified;
      if (verified.userType === userType) next();
      else res.status(401).send("Un Authorized");
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  };
};
