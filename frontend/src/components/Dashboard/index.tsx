import React, { FC, useState, useEffect } from "react";
import { useHistory, Route, Redirect } from "react-router-dom";
import UserApis from "../../actions/users/UserActions";
import styled from "styled-components";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/actions/users";
import { DashboardConfig } from "./DashboardConfig";

export interface IUserDetails {
  email: string;
  userType: string;
  name: string;
}

const Content = styled.div`
  margin-top: 6%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Dashboard: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getUserType = () => {
    UserApis.getSingleUser(localStorage.getItem("userId")).then((response) => {
      if (response.data) {
        dispatch(setUserDetails(response.data));
      }
    });
  };
  useEffect(() => {
    if (
      !(
        localStorage.getItem("userCredentials") &&
        localStorage.getItem("userId")
      )
    ) {
      history.push("/");
    }
    getUserType();
  }, []);
  const user: IUserDetails = useSelector((state: any) => state.userReducer);
  return (
    <Container>
      <Header />
      <Content>
        {DashboardConfig.filter((item) => item.userType === user.userType).map(
          (item: any) => (
            <Route path={item.url} component={item.component} />
          )
        )}
        {user.userType && (
          <Route
            path="/dashboard"
            exact
            render={() => (
              <Redirect
                to={`/dashboard/${
                  user.userType === "ADMIN" ? "admin" : "user"
                }`}
              />
            )}
          />
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;
