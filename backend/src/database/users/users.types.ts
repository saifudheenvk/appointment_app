import { Document, Model } from "mongoose";
import { ResponseModel } from "../../../types";

export interface IUser {
  name: string;
  email: string;
  passWord: string;
  userType: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  registerUser: (
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
  ) => Promise<ResponseModel>;

  isUserExistWithThisPassword: (
    this: IUserModel,
    {
      email,
      password,
      userType,
    }: {
      email: string;
      password: string;
      userType: string;
    }
  ) => Promise<ResponseModel>;

  updateRoles: (
    this: IUserModel,
    roles: string[],
    userType: string
  ) => Promise<void>;

  findByEmail: (
    this: IUserModel,
    email: string
  ) => Promise<IUserDocument | null>;
}
