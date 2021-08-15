import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import InputField from "../../components/elements/InputField/InputField";
import TableStudentCertificate from "../../components/Table/TableStudentCertificate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RektorCertificate.scss";

const RektorCertificate = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};
  return (
    <div className="rektor-master">
      <Header />
      <div className="rektor-body">
        <Sidebar menu={menu} />
        <div className="rektor-content">
          <div className="breadcrumb">
            <h1>My Certificates</h1>
          </div>
          <div className="search-input">
            <FontAwesomeIcon icon={faSearch} className="faSearch" />
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

export default withRouter(RektorCertificate);
