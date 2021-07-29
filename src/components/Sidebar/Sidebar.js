import "./Sidebar.scss";
import menuIcon from "../../assets/icons/menu.svg";

export default () => {
    return (
        <div className="sidebar">
            <div className="menu">
                <img src={menuIcon}/>
                <span>Dashboard</span>
            </div>
            <div className="menu">
                <img src={menuIcon}/>
                <span>Manage Certificates</span>
            </div>
            <div className="menu">
                <img src={menuIcon}/>
                <span>Manage User</span>
            </div>
            <div className="menu sub">
                <img src={menuIcon}/>
                <span>Role Master</span>
            </div>
            <div className="menu sub">
                <img src={menuIcon}/>
                <span>Institution Master</span>
            </div>
            <div className="menu sub">
                <img src={menuIcon}/>
                <span>User Master</span>
            </div>
        </div>
    );
}