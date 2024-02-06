import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useParams, withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchCertificate from "../../components/SearchCertifcate/SearchCertificate";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ACTOR, ACTOR_TOKEN } from "../../constants/component.constant";
import {
  setActorType,
  setAdmin,
  setUser,
} from "../../modules/actions/actor.action";
import ManageCertificate from "../ManageCertificate/ManageCertificate";
import InstitutionMaster from "../ManageUser/InstitutionMaster/InstitutionMaster";
import UserMaster from "../ManageUser/UserMaster/UserMaster";
import API from "../../services/api";
import jwt from "jsonwebtoken";
import "./ProfilePage.scss";
import { history } from "../../store";
import AdminMaster from "../ManageUser/AdminMaster/AdminMaster";
import CertificateTypeMaster from "../ManageCertificate/CertificateTypeMaster/CertificateTypeMaster";
import ProfilePageContent from "./ProfilePageContent";

const Dashboard = (props) => {

  const actor = new URLSearchParams(props.location.search).get(
    "actor_type"
  );
  const menu = new URLSearchParams(props.location.search).get("menu");

  const getToken = () => {
    let token = localStorage.getItem(ACTOR_TOKEN.DIGICERT_USER_TOKEN);
    if (actor === ACTOR.ADMIN) {
      token = localStorage.getItem(ACTOR_TOKEN.DIGICERT_ADMIN_TOKEN);
    }

    return token;
  };

  const getActorDetails = async () => {
    const token = getToken();
    if (!token) {
      history.push("/");
      return;
    }
    const decodedToken = jwt.decode(token);
    if (actor === ACTOR.ADMIN) {
      await props.getAdmin(decodedToken.public_key);
    } else if (actor === ACTOR.USER) {
      await props.getUser(decodedToken.public_key);
    }
  };

  useEffect(() => {
    getActorDetails();
  }, []);

  const resolveContent = () => {
    // switch (menu) {
    //   case "institution-master":
    //     return <InstitutionMaster />;
    //   case "user-master":
    //     return <UserMaster />;
    //   case "admin-master":
    //     return <AdminMaster />;
    //   case "certificate-type-master":
    //     return <CertificateTypeMaster />;
    //   case "manage-certificate":
    //     return <ManageCertificate />;
    //   default:
        return <ProfilePageContent />;
    // }
  };

  const resolveActor = () => {
    let actorObj;

    if (actor === ACTOR.ADMIN && props.admin) {
      actorObj = props.admin;
    } else if (actor === ACTOR.USER && props.admin) {
      actorObj = props.user;
    }

    return actorObj;
  };

  const logout = () => {
    switch (actor) {
      case ACTOR.ADMIN:
        localStorage.removeItem(ACTOR_TOKEN.DIGICERT_ADMIN_TOKEN);
        props.logoutAdmin();
        break;
      case ACTOR.USER:
        localStorage.removeItem(ACTOR_TOKEN.DIGICERT_USER_TOKEN);
        props.logoutUser();
        break;
      default:
        break;
    }

    history.push("/");
  };

  if (!actor) {
    return <Redirect to="/dashboard/USER" />;
  }

  return (
    <div className="dashboard">
      <Header type={actor} actor={resolveActor()} logout={logout} />
      <div className="dashboard-body">
        <Sidebar menu={menu} actor={actor} />
        <div className="dashboard-content">{resolveContent()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.getIn(["actor", "user"]).toJS(),
  admin: state.getIn(["actor", "admin"]).toJS(),
  type: state.getIn(["actor", "type"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    async getUser(publicKey) {
      try {
        dispatch(setActorType(ACTOR.USER));
        dispatch(setUser(await API.getUserByPublicKey(publicKey)));
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async getAdmin(publicKey) {
      try {
        dispatch(setActorType(ACTOR.ADMIN));
        dispatch(setAdmin(await API.getAdminByPublicKey(publicKey)));
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    logoutUser() {
      setUser({});
    },
    logoutAdmin() {
      setAdmin({});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(Dashboard)));
