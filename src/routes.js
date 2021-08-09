import React from "react";
import { Route, Router } from "react-router-dom";

import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import RoleMaster from "./pages/ManageUser/RoleMaster/RoleMaster";
import InstitutionMaster from "./pages/ManageUser/InstitutionMaster/InstitutionMaster";
import { history } from "./store";

export const Routes = () => (
  <Router history={history}>
    <Route path="/" exact component={LandingPage} />
    <Route path="/signin" exact component={SignInPage} />
    <Route path="/profile" exact component={ProfilePage} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/role-master" exact render={() => (<Dashboard section={"role-master"} />)} />
    <Route path="/institution-master" exact render={() => (<Dashboard section={"institution-master"} />)} />
  </Router>
);
