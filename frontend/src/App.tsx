import React, { FC } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import "./index.css";
import Dashboard from "./components/Dashboard";

const App: FC = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login/true" />} />
        <Route path="/login/:islogin" component={() => <Login />} />
        <Route path="/adminlogin/:islogin" component={() => <Login />} />
        <Route path="/dashboard" component={() => <Dashboard />} />
      </Switch>
    </Router>
  </div>
);

export default App;
