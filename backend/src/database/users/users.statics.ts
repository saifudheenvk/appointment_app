import { IUserDocument, IUserModel } from "./users.types";
import { ResponseModel } from "../../../types";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export async function findByEmail(
  this: IUserModel,
  email: string
): Promise<IUserDocument | null> {
  return this.findOne({ email });
}

export async function isUserExistWithThisPassword(
  this: IUserModel,
  {
    email,
    password,
    userType,
  }: { email: string; password: string; userType: string }
): Promise<ResponseModel> {
  const user: IUserDocument | null = await this.findByEmail(email);
  if (!user) {
    return { message: "Incorrect email.", data: null };
  } else {
    if (user.userType === userType) {
      const validPass = await bcrypt.compare(password, user.passWord);
      if (validPass) {
        const token = jwt.sign(
          { _id: user._id, userType: user.userType },
          process.env.JWT_TOKEN
        );
        return { message: "Valid User", data: { id: user.id, token } };
      } else return { data: null, message: "Incorrect password." };
    } else {
      return { message: "You can't Login Here", data: false };
    }
  }
}

export async function registerUser(
  this: IUserModel,
  {
    name,
    email,
    password,
    userType,
  }: {
    name: string;
    email: string;
    password: string;
    userType: string;
  }
): Promise<ResponseModel> {
  const record = await this.findByEmail(email);
  if (record) {
    return { message: "already user exist with this email id", data: null };
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(password, hash);
    const newUser = await this.create({
      name,
      email,
      passWord: hash,
      userType,
    });
    return { message: "Success", data: newUser };
  }
}

export default { registerUser, findByEmail, isUserExistWithThisPassword };
