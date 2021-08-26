import "./Sidebar.scss";
import menuIcon from "../../assets/icons/menu.svg";
import { history } from "../../store";
import { useEffect, useState } from "react";
import React from "react";
import { ACTOR, ACTOR_TOKEN } from "../../constants/component.constant";

export default (props) => {
  const [isManageUser, setIsManageUser] = useState(false);

  useEffect(() => {
    if (
      !props.menu &&
      (props.menu === "role-master" ||
        props.menu === "instution-master" ||
        props.menu === "user-master")
    ) {
      setIsManageUser(true);
    } else {
      setIsManageUser(false);
    }
  }, []);

  const adminMenu = () => {
    return (
      <React.Fragment>
        <div
          className={!props.menu ? "menu active" : "menu"}
          onClick={() => history.push(`/dashboard/${props.actor}`)}
        >
          <img src={menuIcon} />
          <span>Dashboard</span>
        </div>
        <div
          className={props.menu === "manage-certificate" ? "menu active" : "menu"}
          onClick={() => history.push(`/dashboard/${props.actor}?menu=manage-certificate`)}
        >
          <img src={menuIcon} />
          <span>Manage Certificates</span>
        </div>
        <div
          className={props.menu === "manage_user" ? "menu active" : "menu"}
          onClick={() => setIsManageUser(!isManageUser)}
        >
          <img src={menuIcon} />
          <span>Manage User</span>
        </div>
        {isManageUser ? (
          <React.Fragment>
            <div
              className={
                props.menu === "role-master" ? "menu sub active" : "menu sub"
              }
              onClick={() => history.push(`/dashboard/${props.actor}?menu=role-master`)}
            >
              <img src={menuIcon} />
              <span>Role Master</span>
            </div>
            <div
              className={
                props.menu === "institution-master"
                  ? "menu sub active"
                  : "menu sub"
              }
              onClick={() => history.push(`/dashboard/${props.actor}?menu=institution-master`)}
            >
              <img src={menuIcon} />
              <span>Institution Master</span>
            </div>
            <div
              className={
                props.menu === "user-master" ? "menu sub active" : "menu sub"
              }
              onClick={() => history.push(`/dashboard/${props.actor}?menu=user-master`)}
            >
              <img src={menuIcon} />
              <span>User Master</span>
            </div>
          </React.Fragment>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }

  const userMenu = () => {
    return (
      <React.Fragment>
        <div
          className={!props.menu ? "menu active" : "menu"}
          onClick={() => history.push(`/dashboard`)}
        >
          <img src={menuIcon} />
          <span>Dashboard</span>
        </div>
        <div
          className={props.menu === "manage-certificate" ? "menu active" : "menu"}
          onClick={() => history.push("/dashboard/USER?menu=manage-certificate")}
        >
          <img src={menuIcon} />
          <span>My Certificates</span>
        </div>
      </React.Fragment>
    );
  }

  const resolveMenu = () => {
    switch(props.actor) {
      case ACTOR.ADMIN:
        return adminMenu();
      case ACTOR.USER:
        return userMenu();
    }
  }

  return (
    <div className="sidebar">
      {resolveMenu()}
    </div>
  );
};
