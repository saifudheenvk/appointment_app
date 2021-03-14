import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/actions/users";

const HeaderItemContainer = styled.div`
  flex: 1;
  padding-left: 3%;
`;

interface IParaProps {
  background: string;
  color: string;
}

const para: any = styled.p;

const Content = para`
  background-color: ${(props: IParaProps) => props.background};
  width: 121px;
  padding: 5px 20px;
  border-radius: 8px;
  color: ${(props: IParaProps) => props.color};
  font-weight: bold;
  border: 1px solid #47ddcb;
  text-align: center;
  cursor: pointer;
`;

interface IProps {
  content: string;
  itemId: string;
}

const HeaderItem: FC<IProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (props.itemId === "logout") {
      localStorage.clear();
      dispatch(setUserDetails({}));
      history.push("/");
    } else {
      history.push(`/dashboard/${props.itemId}`);
    }
  };

  return (
    <HeaderItemContainer>
      <Content
        onClick={handleClick}
        color={props.content === "Logout" ? "#FFF" : "#47DDCB"}
        background={
          props.content === "Logout"
            ? "#47DDCB"
            : !window.location.href.includes(props.itemId)
            ? "#fff"
            : "#EDEBEB"
        }
      >
        {props.content}
      </Content>
    </HeaderItemContainer>
  );
};

export default HeaderItem;
