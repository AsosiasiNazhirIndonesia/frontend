import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import TableCertificate from "../../components/Table/TableCertificate";
import { withRouter } from "react-router-dom";
import { history } from "../../store";
import React, { useState } from "react";
import CreateCertificate1 from "./CreateCertificate1";
import CreateCertificate2 from "./CreateCertificate2";
import CreateCertificate3 from "./CreateCertificate3";
import ViewCertificate from "./ViewCertificate";
import "./ManageCertificate.scss";
import Delete from "../../components/Popup/Delete";

const ManageCertificate = (props) => {
  const [isDelete, setIsDelete] = useState(false);

  const step = new URLSearchParams(props.location.search).get(
    "create_certificate_step"
  );
  const view = new URLSearchParams(props.location.search).get(
    "view_certificate"
  );
  const value = {};

  const resolveContent = () => {
    if (view) {
      return <ViewCertificate />;
    } else {
      switch (step) {
        case "1":
          return <CreateCertificate1 />;
        case "2":
          return <CreateCertificate2 />;
        case "3":
          return <CreateCertificate3 />;
        default:
          return (
            <React.Fragment>
              <div className="bef-table">
                <div className="btn-add-certificate">
                  <SubmitButton
                    buttonText={"Create Certificate"}
                    onClick={() => {
                      history.push(
                        "/dashboard?menu=manage-certificate&create_certificate_step=1"
                      );
                    }}
                  ></SubmitButton>
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
              <TableCertificate setIsDelete={setIsDelete} />
            </React.Fragment>
          );
      }
    }
  };

  const resolveSubtitle = () => {
    if (view) {
      return (
        <h6 className="breadcrumb-path"> Manage Certificate - View Document</h6>
      );
    } else {
      switch (step) {
        case "1":
          return (
            <h6 className="breadcrumb-path">
              {" "}
              Manage Certificate - Create Document 1
            </h6>
          );
        case "2":
          return (
            <h6 className="breadcrumb-path">
              {" "}
              Manage Certificate - Create Document 2
            </h6>
          );
        case "3":
          return (
            <h6 className="breadcrumb-path">
              {" "}
              Manage Certificate - Create Document 3
            </h6>
          );
        default:
          return <div></div>;
      }
    }
  };

  const content = resolveContent();
  const subTitle = resolveSubtitle();
  return (
    <div className="certificate-content">
      <div className="breadcrumb">
        <h1>Manage Certificate</h1>
        {subTitle}
      </div>
      {content}
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};
export default withRouter(ManageCertificate);
