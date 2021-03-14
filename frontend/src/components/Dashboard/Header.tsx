import React, { FC } from "react";
import styled from "styled-components";
import HeaderItem from "./HeaderItem";
import { useSelector } from "react-redux";
import { IUserDetails } from ".";

const HeaderContainer = styled.div`
  width: 100%;
  background: #ebebeb;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  padding 0% 4%;
  position: fixed;
  top:0;
z-index: 100;
`;

const ExtraElement = styled.div`
  flex: 3;
  padding-left: 9%;
`;

const Header: FC = () => {
  const user: IUserDetails = useSelector((state: any) => state.userReducer);
  return (
    <HeaderContainer>
      {user.userType === "USER" ? (
        <>
          <HeaderItem content="Dashboard" itemId={user.userType.toLowerCase()} />
          <HeaderItem content="New Booking" itemId="newbooking" />
          <HeaderItem content="My Booking" itemId="mybooking" />
        </>
      ) : (
        <ExtraElement />
      )}
      <HeaderItem content="Logout" itemId="logout" />
    </HeaderContainer>
  );
};

export default Header;
