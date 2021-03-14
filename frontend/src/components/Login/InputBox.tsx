import React, { FC } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

interface InputProps {
  islogin: boolean;
}

const input: any = styled.input;

const Input = input`
    background-color: #edebeb;
    width: 80%;
    border: none;
    padding: 11px;
    margin-bottom: ${(props: InputProps) => (props.islogin ? "23px" : "16px")};
    border-radius: 8px;
    color: rgba(0, 0, 0, 0.6);
}
`;

interface IProps {
  type: string;
  placeholder: string;
  formObject: any;
  setFormObject: (value: any) => void;
}

interface Params {
  islogin: string | undefined;
}

const InputBox: FC<IProps> = (props) => {
  const params: Params = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFormObject((prev: any) => ({
      ...prev,
      [props.type]: e.target.value,
    }));
  };

  return (
    <Input
      value={props.formObject[props.type] || ""}
      onChange={handleChange}
      placeholder={props.placeholder}
      type={props.type}
      islogin={params.islogin === "true"}
    />
  );
};

export default InputBox;
