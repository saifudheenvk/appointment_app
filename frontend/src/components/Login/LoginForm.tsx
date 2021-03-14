import React, { FC } from "react";
import InputBox from "./InputBox";

export interface ISignInObject {
  email: string;
  password: string;
}

export interface IAdminSignUp extends ISignInObject {
  authKey: string;
}

export interface IUserSignUp extends ISignInObject {
  name: string;
}

interface IProps {
  formObject: any;
  setFormObject: (value: any) => void;
}

const LoginForm: FC<IProps> = (props) => {
  return (
    <>
      <InputBox
        type="email"
        placeholder="Email"
        formObject={props.formObject}
        setFormObject={props.setFormObject}
      />
      <InputBox
        type="password"
        placeholder="Password"
        formObject={props.formObject}
        setFormObject={props.setFormObject}
      />
    </>
  );
};

export default LoginForm;
