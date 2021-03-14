import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link, useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ApiCalls from "../../actions/Login/LoginAction";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.main`
  min-height: 100vh;
  background: #e5e5e5;
  text-align: center;
`;

const MainContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  width: 28%;
  transform: translate(-50%, -50%);
  @media (max-width: 414px) {
    width: 90%;
  }
`;

const Container = styled.div`
  border-radius: 15px;
  background: #fff;
  text-align: center;
  padding: 1px 0px 23px 0px;
`;

const LoginHeader = styled.p`
  font-size: 24px;
  line-height: 16px;
  //   font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-align: center;
`;
const LoginButton = styled.button`
  //   font-family: Roboto;
  background: #47ddcb;
  border-radius: 8px;
  color: #fff;
  height: 35px;
  width: 120px;
  font-weight: bold;
  font-size: 21px;
  border: none;
`;

const Highlighted = styled.span`
  color: #47ddcb;
  font-weight: bold;
`;
const Links = styled(Link)`
  text-decoration-line: none;
`;
interface Params {
  islogin: string | undefined;
}

export const toastStyle: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Login: FC = () => {
  const params: Params = useParams();
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (
      localStorage.getItem("userCredentials") &&
      localStorage.getItem("userId")
    ) {
      history.push("/dashboard");
    }
  }, []);

  const handleSubmit = () => {
    console.log(formObject);
    if (params.islogin === "true") {
      let loginObject = {
        ...formObject,
        userType: window.location.href.includes("adminlogin")
          ? "ADMIN"
          : "USER",
      };
      ApiCalls.authenticateUser(loginObject).then((response) => {
        if (response.data) {
          localStorage.setItem("userCredentials", response.data.token);
          localStorage.setItem("userId", response.data.id);
          history.push("/dashboard");
          setFormObject({});
        } else {
          toast(response.statusText, toastStyle);
        }
      });
    } else {
      let body = { ...formObject };
      if (window.location.href.includes("adminlogin")) {
        body = { ...body, name: "Admin", userType: "ADMIN" };
      } else {
        body = { ...body, userType: "USER" };
      }
      ApiCalls.createNewUser(body).then((response) => {
        if (response.data) {
          history.push(
            `/${
              window.location.href.includes("adminlogin")
                ? "adminlogin"
                : "login"
            }/${params.islogin === "true" ? "false" : "true"}`
          );
          setFormObject({});
        } else {
          toast(response.statusText, toastStyle);
        }
      });
    }
  };

  return (
    <Main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MainContainer>
        <Container>
          <LoginHeader>
            {window.location.href.includes("adminlogin") ? "Admin" : ""} Sign
            {params.islogin === "true" ? " In" : " Up"}
          </LoginHeader>
          <form>
            {params.islogin === "true" ? (
              <LoginForm
                formObject={formObject}
                setFormObject={setFormObject}
              />
            ) : (
              <SignUpForm
                formObject={formObject}
                setFormObject={setFormObject}
                isAdmin={window.location.href.includes("adminlogin")}
              />
            )}
          </form>
          <LoginButton onClick={handleSubmit}>
            Sign{params.islogin === "true" ? " In" : " Up"}
          </LoginButton>
        </Container>
        <p>
          have a{" "}
          {window.location.href.includes("adminlogin") ? "admin" : "user"}{" "}
          account?{" "}
          <Links
            to={`/${
              window.location.href.includes("adminlogin")
                ? "adminlogin"
                : "login"
            }/${params.islogin === "true" ? "false" : "true"}`}
          >
            <Highlighted>
              {params.islogin !== "true" ? "Sign In" : "Sign Up Now"}
            </Highlighted>
          </Links>
        </p>
        <p>
          Go to{" "}
          <Links
            to={`/${
              !window.location.href.includes("adminlogin")
                ? "adminlogin"
                : "login"
            }/${params.islogin === "true" ? "true" : "false"}`}
          >
            <Highlighted>
              {window.location.href.includes("adminlogin") ? "User " : "Admin "}
              Sign {params.islogin === "true" ? "In" : "Up"}
            </Highlighted>
          </Links>
        </p>
      </MainContainer>
    </Main>
  );
};
export default Login;
