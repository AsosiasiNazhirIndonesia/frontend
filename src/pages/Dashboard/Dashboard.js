import Header from "../../components/Header/Header";
import SearchCertificate from "../../components/SearchCertifcate/SearchCertificate";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.scss";

export default () => {

    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard-body">
            <Sidebar/>
            <div className="dashboard-content">
                <SearchCertificate/>
            </div>)
            </div>
        </div>
    );
}