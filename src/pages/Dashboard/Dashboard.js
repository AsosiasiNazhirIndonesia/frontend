import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchCertificate from "../../components/SearchCertifcate/SearchCertificate";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.scss";

const Dashboard = (props) => {
    const menu = new URLSearchParams(props.location.search).get('token');
    const resolveContent = () => {
        switch(menu) {
            default:
                return <SearchCertificate/>
        }
    }

    const content = resolveContent();
    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard-body">
            <Sidebar menu={menu}/>
            <div className="dashboard-content">
                {content}
            </div>)
            </div>
        </div>
    );
}

export default withRouter(Dashboard);