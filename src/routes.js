import React from "react";
import { Route, Router } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import Login from "./magic/login";
import Callback from "./magic/callback";

import { history } from "./store";

export const Routes = () => (
  <Router history={history}>
    <Route path="/" exact component={LandingPage} />
    <Route path="/signin" component={SignInPage} />
    <Route path="/userlogin" component={Login} />
    <Route path="/callback" component={Callback} />
    <Route path="/profile" exact component={ProfilePage} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/dashboard/:actor" exact component={Dashboard} />
  </Router>
);
