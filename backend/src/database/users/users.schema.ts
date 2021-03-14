import * as Mongoose from "mongoose";
import statics from "./users.statics";
import { IUserDocument, IUserModel } from "./users.types";

const UserSchema = new Mongoose.Schema<IUserDocument, IUserModel>({
  name: String,
  passWord: String,
  userType: String,
  email: String,
});

UserSchema.statics = statics;

export default UserSchema;
