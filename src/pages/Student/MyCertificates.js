import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import InputField from "../../components/elements/InputField/InputField";
import TableStudentCertificate from "../../components/Table/TableStudentCertificate";
import "./MyCertificates.scss";

const MyCertificates = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};
  return (
    <div className="student-master">
      <Header />
      <div className="student-body">
        <Sidebar menu={menu} />
        <div className="student-content">
          <div className="breadcrumb">
            <h1>My Certificates</h1>
          </div>
          <div className="search-input">
            <InputField
              type="text"
              name="search-input"
              placeholder="Search User Name"
              value={value}
            />
          </div>
          <TableStudentCertificate />
        </div>
      </div>
    </div>
  );
};

export default withRouter(MyCertificates);
