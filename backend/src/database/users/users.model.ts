import { model } from "mongoose";
import { IUserDocument, IUserModel } from "./users.types";
import UserSchema from "./users.schema";

const UserModel: IUserModel = model<IUserDocument, IUserModel>(
  "user",
  UserSchema
);
export default UserModel;
