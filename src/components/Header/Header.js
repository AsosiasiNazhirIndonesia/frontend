import './Header.scss';
import logo from '../../assets/images/logo.svg';
import aniLogo from '../../assets/images/ani-logo.png';
import avatar from '../../assets/images/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { history } from '../../store';
import { ACTOR } from '../../constants/component.constant';
import SubmitButton from '../elements/SubmitButton/SubmitButton';
import { HOST } from '../../services/api';

export default (props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const profilePhoto = props.actor && props.actor.photo ? `${HOST}/api/files/${props.actor.photo}` : avatar;
    const profileName = props.actor && props.actor.name ? props.actor.name : 'User';
    const actorPubKey = props.actor ? props.type === ACTOR.ADMIN ? props.actor.public_key : props.actor.public_key : undefined;

    return (
        <>
            <div className="header">
                <div className="header-left">
                    <img src={logo}></img>
                    <img src={aniLogo}></img>
                    <div className="title">
                        <h4>Sertifikat Digital Berbasis Blockchain</h4>
                    </div>
                </div>
                <div className="header-right">
                    {props.actor ?
                    <div className="profile">
                        <span className="profile-name">{profileName}</span>
                        <img src={profilePhoto} onClick={() => setMenuVisible(!menuVisible)}/>
                    </div> : <></>
                    }
                    {menuVisible ?
                        <div className="profile-options">
                            <div className="menu">
                                <div className="sub-menu" onClick={() => {if (props.logout) { history.push(`/profile?actor_type=${props.type}&actor_public_key=${actorPubKey}`) }}}>
                                    <span>Details</span><FontAwesomeIcon icon={faSignOutAlt} />
                                </div>
                                <div className="sub-menu" onClick={() => {if (props.logout) { props.logout() }}}>
                                    <span>Logout</span><FontAwesomeIcon icon={faSignOutAlt} />
                                </div>
                            </div>
                        </div> : <div></div>
                    }
                </div>
            </div>
        </>
    );
}