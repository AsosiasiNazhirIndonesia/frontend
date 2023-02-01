import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import aniLogoWhite from "../../assets/images/ani-logo-white.png";
import avatar from "../../assets/images/avatar.svg";
import iconMore from "../../assets/icons/circle-chevron-down.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { history } from "../../store";
import { ACTOR } from "../../constants/component.constant";
import SubmitButton from "../elements/SubmitButton/SubmitButton";
import { HOST } from "../../services/api";

const Header = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const profilePhoto = useMemo(() => {
    return props.actor && props.actor.photo
      ? `${HOST}/api/files/${props.actor.photo}`
      : avatar;
  }, [props.actor]);

  const profileName = useMemo(() => {
    return props.actor && props.actor.name ? props.actor.name : "User";
  }, [props.actor]);

  const profileRole = useMemo(() => {
    return props.actor && props.actor.admin_role
      ? props.actor.admin_role
      : "User";
  }, [props.actor]);

  const actorPubKey = useMemo(() => {
    return props.actor
      ? props.type === ACTOR.ADMIN
        ? props.actor.public_key
        : props.actor.public_key
      : undefined;
  }, [props.actor]);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <img alt="logo-white" src={aniLogoWhite}></img>
        </div>
        <div className="header-right">
          {props.actor ? (
            <div className="profile">
              <img className="avatar" src={profilePhoto} alt="profile" />
              <div className="right">
                <span className="name">{profileName}</span>
                <div className="role">{profileRole}</div>
              </div>
              <img
                className="more"
                src={iconMore}
                onClick={() => setMenuVisible(!menuVisible)}
                alt="more"
              />
            </div>
          ) : (
            <></>
          )}
          {menuVisible ? (
            <div className="profile-options">
              <div className="menu">
                <div
                  className="sub-menu"
                  onClick={() => {
                    if (props.logout) {
                      history.push(
                        `/profile?actor_type=${props.type}&actor_public_key=${actorPubKey}`
                      );
                    }
                  }}
                >
                  <span>Details</span>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
                <div
                  className="sub-menu"
                  onClick={() => {
                    if (props.logout) {
                      props.logout();
                    }
                  }}
                >
                  <span>Logout</span>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
