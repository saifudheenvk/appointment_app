import React, { FC } from "react";
import InputBox from "./InputBox";

interface IProps {
  formObject: any;
  setFormObject: (value: any) => void;
  isAdmin: boolean;
}

const SignUpForm: FC<IProps> = (props) => {
  return (
    <>
      {!props.isAdmin && (
        <InputBox
          type="name"
          placeholder="Name"
          formObject={props.formObject}
          setFormObject={props.setFormObject}
        />
      )}
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
      {props.isAdmin && (
        <InputBox
          type="authKey"
          placeholder="Auth Key"
          formObject={props.formObject}
          setFormObject={props.setFormObject}
        />
      )}
    </>
  );
};

export default SignUpForm;
