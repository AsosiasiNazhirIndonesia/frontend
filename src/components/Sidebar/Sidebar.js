import "./Sidebar.scss";
import menuIcon from "../../assets/icons/menu.svg";
import homeActiveIcon from "../../assets/icons/home-active.svg";
import homeInactiveIcon from "../../assets/icons/home-inactive.svg";
import folderActiveIcon from "../../assets/icons/folder-active.svg";
import folderInactiveIcon from "../../assets/icons/folder-inactive.svg";

import { history } from "../../store";
import { useEffect, useState } from "react";
import React from "react";
import { ACTOR } from "../../constants/component.constant";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const [isManageUser, setIsManageUser] = useState(false);
  const admin = useSelector((state) => state.getIn(["actor", "admin"]).toJS());

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

  const mainAdminMenu = () => {
    return (
      <React.Fragment>
        <div
          className={(!props.menu ? "menu active" : "menu") + " separator-menu"}
          onClick={() => history.push(`/dashboard/${props.actor}`)}
        >
          <div className="iconName">
            <img
              alt="ic-home"
              src={!props.menu ? homeActiveIcon : homeInactiveIcon}
            />
            <span>Dashboard</span>
            {!props.menu ? (
              <div className="dotActive" />
            ) : (
              <div className="dotInactive" />
            )}
          </div>
        </div>
        <div
          className={
            (props.menu === "manage_user" ? "menu active" : "menu") +
            " separator-sub-menu"
          }
          onClick={() => setIsManageUser(!isManageUser)}
        >
          <div className="iconName">
            <img
              alt="ic-manage"
              src={
                props.menu === "manage_user"
                  ? folderActiveIcon
                  : folderInactiveIcon
              }
            />
            <span>Manage Admin</span>
            {props.menu === "manage-user" ? (
              <div className="dotActive" />
            ) : (
              <div className="dotInactive" />
            )}
          </div>
        </div>
        {isManageUser ? (
          <React.Fragment>
            <div
              className={
                props.menu === "institution-master"
                  ? "menu sub active"
                  : "menu sub"
              }
              onClick={() =>
                history.push(
                  `/dashboard/${props.actor}?menu=institution-master`
                )
              }
            >
              <div className="iconName">
                <span>Institution Master</span>
                {props.menu === "institution-master" ? (
                  <div className="dotActive" />
                ) : (
                  <div className="dotInactive" />
                )}
              </div>
            </div>
            <div
              className={
                props.menu === "admin-master" ? "menu sub active" : "menu sub"
              }
              onClick={() =>
                history.push(`/dashboard/${props.actor}?menu=admin-master`)
              }
            >
              <div className="iconName">
                <span>Admin Master</span>
                {props.menu === "admin-master" ? (
                  <div className="dotActive" />
                ) : (
                  <div className="dotInactive" />
                )}
              </div>
            </div>
            <div
              className={
                props.menu === "certificate-type-master"
                  ? "menu sub active"
                  : "menu sub"
              }
              onClick={() =>
                history.push(
                  `/dashboard/${props.actor}?menu=certificate-type-master`
                )
              }
            >
              <div className="iconName">
                <span>Certificate Type Master</span>
                {props.menu === "certificate-type-master" ? (
                  <div className="dotActive" />
                ) : (
                  <div className="dotInactive" />
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  };

  const institutionAdminMenu = () => {
    return (
      <React.Fragment>
        <div
          className={(!props.menu ? "menu active" : "menu") + " separator-menu"}
          onClick={() => history.push(`/dashboard/${props.actor}`)}
        >
          <div className="iconName">
            <img
              alt="ic-home"
              src={!props.menu ? homeActiveIcon : homeInactiveIcon}
            />
            <span>Dashboard</span>
            {!props.menu ? (
              <div className="dotActive" />
            ) : (
              <div className="dotInactive" />
            )}
          </div>
        </div>
        <div
          className={
            props.menu === "manage-certificate" ? "menu active" : "menu"
          }
          onClick={() =>
            history.push(`/dashboard/${props.actor}?menu=manage-certificate`)
          }
        >
          <div className="iconName">
            <img
              alt="ic-home"
              src={
                props.menu === "manage-certificate"
                  ? folderActiveIcon
                  : folderInactiveIcon
              }
            />
            <span>Manage Certificates</span>

            {props.menu === "manage-certificate" ? (
              <div className="dotActive" />
            ) : (
              <div className="dotInactive" />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };

  const adminMenu = () => {
    if (admin && admin.admin_role === "MAIN") {
      return mainAdminMenu();
    }

    return institutionAdminMenu();
  };

  const userMenu = () => {
    return (
      <React.Fragment>
        <div
          className={(!props.menu ? "menu active" : "menu") + " separator-menu"}
          onClick={() => history.push(`/dashboard`)}
        >
          <div className="iconName">
            <img
              alt="ic-home"
              src={!props.menu ? homeActiveIcon : homeInactiveIcon}
            />
            <span>Dashboard</span>
            {!props.menu ? (
              <div className="dotActive" />
            ) : (
              <div className="dotInactive" />
            )}
          </div>
        </div>
        <div
          className={
            props.menu === "manage-certificate" ? "menu active" : "menu"
          }
          onClick={() =>
            history.push("/dashboard/USER?menu=manage-certificate")
          }
        >
          <div className="iconName">
            <img
              alt="ic-home"
              src={
                props.menu === "manage-certificate"
                  ? folderActiveIcon
                  : folderInactiveIcon
              }
            />
            <span>Manage Certificates</span>

            {props.menu === "manage-certificate" ? (
              <div className="dotActive" />
            ) : (
              <div className="dotInactive" />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };

  const resolveMenu = () => {
    switch (props.actor) {
      case ACTOR.ADMIN:
        return adminMenu();
      case ACTOR.USER:
        return userMenu();
      default:
        return <div />;
    }
  };

  return <div className="sidebar">{resolveMenu()}</div>;
};

export default Sidebar;
