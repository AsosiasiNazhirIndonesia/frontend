import React from "react";
import { Route, Router } from "react-router-dom";

import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import RoleMaster from "./pages/ManageUser/RoleMaster/RoleMaster";
import InstitutionMaster from "./pages/ManageUser/InstitutionMaster/InstitutionMaster";
import UserMaster from "./pages/ManageUser/UserMaster/UserMaster";
import AddEditUser from "./pages/ManageUser/UserMaster/AddEditUser";
import ViewDataUser from "./pages/ManageUser/UserMaster/ViewDataUser";
import { history } from "./store";

export const Routes = () => (
  <Router history={history}>
    <Route path="/" exact component={LandingPage} />
    <Route path="/signin" exact component={SignInPage} />
    <Route path="/profile" exact component={ProfilePage} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/role-master" exact component={RoleMaster} />
    <Route path="/institution-master" exact component={InstitutionMaster} />
    <Route path="/user-master" exact component={UserMaster} />
    <Route path="/user-master/add-edit-user" exact component={AddEditUser} />
    <Route path="/user-master/view-data-user" exact component={ViewDataUser} />

    {/* <Route
      path="/user-master"
      exact
      component={UserMaster}
      children={
        ((
          <Route
            path="/user-master/add-edit-user"
            exact
            component={AddEditUser}
          />
        ),
        (
          <Route
            path="/user-master/view-data-user"
            exact
            component={ViewDataUser}
          />
        ))
      }
    /> */}
  </Router>
);
