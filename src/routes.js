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
import ManageCertificate from "./pages/ManageCertificate/ManageCertificate";
import CreateCertificate1 from "./pages/ManageCertificate/CreateCertificate1";
import CreateCertificate2 from "./pages/ManageCertificate/CreateCertificate2";
import CreateCertificate3 from "./pages/ManageCertificate/CreateCertificate3";
import ViewCertificate from "./pages/ManageCertificate/ViewCertificate";
import { history } from "./store";

export const Routes = () => (
  <Router history={history}>
    <Route path="/" exact component={LandingPage} />
    <Route path="/signin" exact component={SignInPage} />
    <Route path="/profile" exact component={ProfilePage} />
    <Route path="/dashboard" exact component={Dashboard} />

    {/* Manage Certificate */}
    <Route path="/manage-certificate" exact component={ManageCertificate} />
    <Route
      path="/manage-certificate/create-certificate-1"
      exact
      component={CreateCertificate1}
    />
    <Route
      path="/manage-certificate/create-certificate-2"
      exact
      component={CreateCertificate2}
    />
    <Route
      path="/manage-certificate/create-certificate-3"
      exact
      component={CreateCertificate3}
    />
    <Route
      path="/manage-certificate/view-certificate"
      exact
      component={ViewCertificate}
    />

    {/* Manage User */}
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
