import "./Sidebar.scss";
import menuIcon from "../../assets/icons/menu.svg";

export default (props) => {
    return (
        <div className="sidebar">
            <div className={!props.menu ? "menu active" : "menu"}>
                <img src={menuIcon}/>
                <span>Dashboard</span>
            </div>
            <div className={props.menu === 'manage_certificates' ? "menu active" : "menu"}>
                <img src={menuIcon}/>
                <span>Manage Certificates</span>
            </div>
            <div className={props.menu === 'manage_user' ? "menu active" : "menu"}>
                <img src={menuIcon}/>
                <span>Manage User</span>
            </div>
            <div className={"menu sub"}>
                <img src={menuIcon}/>
                <span>Role Master</span>
            </div>
            <div className={"menu sub"}>
                <img src={menuIcon}/>
                <span>Institution Master</span>
            </div>
            <div className={"menu sub"}>
                <img src={menuIcon}/>
                <span>User Master</span>
            </div>
        </div>
    );
}