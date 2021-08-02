import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import TableCertificate from "../../components/Table/TableCertifcate";
import "./ManageCertificate.scss";

const ManageCertificate = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};

  return (
    <div className="certificate-master">
      <Header />
      <div className="certificate-body">
        <Sidebar menu={menu} />
        <div className="certificate-content">
          <div className="breadcrumb">
            <h1>Manage Certificate</h1>
          </div>
          <div className="bef-table">
            <div className="btn-add-certificate">
              {/* <button onClick={addRole}>Add Role</button> */}
              <SubmitButton buttonText={"Create Certificate"}></SubmitButton>
            </div>
            <div className="search-input">
              <InputField
                type="text"
                name="search-input"
                placeholder="Search Document Name"
                value={value}
              />
            </div>
          </div>
          <TableCertificate />
        </div>
      </div>
    </div>
  );
};
export default ManageCertificate;
