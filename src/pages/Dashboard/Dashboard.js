import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchCertificate from "../../components/SearchCertifcate/SearchCertificate";
import Sidebar from "../../components/Sidebar/Sidebar";
import ManageCertificate from "../ManageCertificate/ManageCertificate";
import InstitutionMaster from "../ManageUser/InstitutionMaster/InstitutionMaster";
import RoleMaster from "../ManageUser/RoleMaster/RoleMaster";
import UserMaster from "../ManageUser/UserMaster/UserMaster";
import "./Dashboard.scss";

const Dashboard = (props) => {
  const menu = new URLSearchParams(props.location.search).get("menu");
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

  const content = resolveContent();
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar menu={menu} />
        <div className="dashboard-content">{content}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
