import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchCertificate from "../../components/SearchCertifcate/SearchCertificate";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ACTOR, ACTOR_TOKEN } from "../../constants/component.constant";
import { setAdmin, setUser } from "../../modules/actions/actor.action";
import ManageCertificate from "../ManageCertificate/ManageCertificate";
import InstitutionMaster from "../ManageUser/InstitutionMaster/InstitutionMaster";
import RoleMaster from "../ManageUser/RoleMaster/RoleMaster";
import UserMaster from "../ManageUser/UserMaster/UserMaster";
import API from "../../services/api";
import jwt from "jsonwebtoken";
import "./Dashboard.scss";
import { history } from "../../store";

const Dashboard = (props) => {
  const actor =  props.type;
  const menu = new URLSearchParams(props.location.search).get("menu");

  const getToken = () => {
    let token = localStorage.getItem(ACTOR_TOKEN.DIGICERT_USER_TOKEN);
    if (actor === ACTOR.ADMIN) {
      token = localStorage.getItem(ACTOR_TOKEN.DIGICERT_ADMIN_TOKEN);
    }

    return token;
  }

  const getActorDetails = async () => {
    const token = getToken();
    const decodedToken = jwt.decode(token);
    if (actor === ACTOR.ADMIN) {
      await props.getAdmin(decodedToken.public_key);
    } else if (actor === ACTOR.USER) {
      await props.getUser(decodedToken.public_key);
    }
  }

  useEffect(() => {
    getActorDetails();
  }, [])

  const resolveContent = () => {
    switch (menu) {
      case "role-master":
        return <RoleMaster />;
      case "institution-master":
        return <InstitutionMaster />;
      case "user-master":
        return <UserMaster />;
      case "manage-certificate":
        return <ManageCertificate />;
      default:
        return <SearchCertificate />;
    }
  };

  const resolveActor = () => {
    let actorObj;
    if (actor === ACTOR.ADMIN && props.admin) {
      actorObj = props.admin;
    } else if (actor === ACTOR.USER && props.admin) {
      actorObj = props.user;
    }

    return actorObj;
  }

  const logout = () => {
    switch(actor) {
      case ACTOR.ADMIN:
        localStorage.removeItem(ACTOR_TOKEN.DIGICERT_ADMIN_TOKEN);
        props.logoutAdmin();
        break;
      case ACTOR.USER:
        localStorage.removeItem(ACTOR_TOKEN.DIGICERT_USER_TOKEN);
        props.logoutUser();
        break;
    }

    history.push('/signin');
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
  user:  state.getIn(['actor', 'user']).toJS(),
  admin:  state.getIn(['actor', 'admin']).toJS(),
  type: state.getIn(['actor', 'type'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    async getUser(publicKey) {
      try {
        dispatch(setUser(await API.getUserByPublicKey(publicKey)));
      } catch (e) {
          console.log(e);
        throw e;
      }
    },
    async getAdmin(publicKey) {
      try {
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
      setAdmin({})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Dashboard)));
