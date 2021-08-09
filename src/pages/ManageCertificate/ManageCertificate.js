import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import TableCertificate from "../../components/Table/TableCertifcate";
import "./ManageCertificate.scss";
import { withRouter } from "react-router-dom";
import React from "react";
import CreateCertificate1 from "./CreateCertificate1";
import { history } from "../../store";
import CreateCertificate2 from "./CreateCertificate2";

const ManageCertificate = (props) => {
  const step = new URLSearchParams(props.location.search).get("create_certificate_step");
  const value = {};

  const resolveContent = () => {
    switch(step) {
      case "1":
        return <CreateCertificate1/>;
      case "2":
        return <CreateCertificate2/>;
      default:
        return (<React.Fragment>
          <div className="bef-table">
            <div className="btn-add-certificate">
              <SubmitButton buttonText={"Create Certificate"} onClick={() => {history.push('/dashboard?menu=manage-certificate&create_certificate_step=1')}}></SubmitButton>
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
        </React.Fragment>);
    }
  }

  const resolveSubtitle = () => {
    switch(step) {
      case "1":
        return (<h6 className="breadcrumb-path"> Manage Certificate - Create Document</h6>);
      default:
        return <div></div>;
    }
  }


  const content = resolveContent();
  const subTitle = resolveSubtitle();
  return (
    <div className="certificate-content">
      <div className="breadcrumb">
        <h1>Manage Certificate</h1>
        {subTitle}
      </div>
      {content}
    </div>
  );
};
export default withRouter(ManageCertificate);
