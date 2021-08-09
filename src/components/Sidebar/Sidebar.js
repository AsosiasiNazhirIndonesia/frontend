import "./Sidebar.scss";
import menuIcon from "../../assets/icons/menu.svg";
import { history } from "../../store";
import { useState } from "react";
import React from "react";

export default (props) => {
    const [isManageUser, setIsManageUser] = useState(false);

    return (
        <div className="sidebar">
            <div className={!props.menu ? "menu active" : "menu"} onClick={() => history.push('/dashboard')}>
                <img src={menuIcon}/>
                <span>Dashboard</span>
            </div>
            <div className={props.menu === 'manage_certificates' ? "menu active" : "menu"}>
                <img src={menuIcon}/>
                <span>Manage Certificates</span>
            </div>
            <div className={props.menu === 'manage_user' ? "menu active" : "menu"} onClick={() => setIsManageUser(!isManageUser)}>
                <img src={menuIcon}/>
                <span>Manage User</span>
            </div>
            {isManageUser ?
                <React.Fragment>
                    <div className={"menu sub"} onClick={() => history.push('/dashboard?section=role-master')}>
                        <img src={menuIcon}/>
                        <span>Role Master</span>
                    </div>
                    <div className={"menu sub"} onClick={() => history.push('/dashboard?section=institution-master')}>
                        <img src={menuIcon}/>
                        <span>Institution Master</span>
                    </div>
                    <div className={"menu sub"}>
                        <img src={menuIcon}/>
                        <span>User Master</span>
                    </div>
                </React.Fragment> : <div></div>}
        </div>
    );
}