import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import template from "../../assets/images/CertificateTemplate.jpg";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";
import "./CreateCertificate1.scss";
import React from "react";
import { history } from "../../store";
import { INPUT_STATUS } from "../../constants/component.constant";

const CreateCertificate1 = (props) => {
  const disabledButton = () => {
    let disabled = false;
    if (props.getInputValue("documentName").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("receiverName").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateTitle").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateNo").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateDescription").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateScore").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } 

    return disabled;
  }

  return (
    <React.Fragment>
      <div className="form-name-template">
        <div className="name-template">
          <p>Document Name</p>
          <InputField
            type="text"
            name="search-input"
            placeholder="Document name"
            value={props.getInputValue("documentName")}
            onChange={(e) => { props.setInputValue("documentName", e.target.value) }}
          ></InputField>
        </div>
      </div>
      <div className="form-group">
        <div className="form-detail-certificate">
          <div className="name-user">
            <p>Receiver Name</p>
            <InputField
              type="text"
              name="name-input"
              placeholder="Certificate receiver"
              value={props.getInputValue("receiverName")}
              onChange={(e) => { props.setInputValue("receiverName", e.target.value) }}
            ></InputField>
          </div>
          <div className="no-certificate">
            <p>No Certificate</p>
            <InputField
              type="text"
              name="no-certificate-input"
              placeholder="Certificate number"
              value={props.getInputValue("certificateNo")}
              onChange={(e) => { props.setInputValue("certificateNo", e.target.value) }}
            ></InputField>
          </div>
          <div className="title">
            <p>Title</p>
            <InputField
              type="text"
              name="title-input"
              placeholder="Certificate title"
              value={props.getInputValue("certificateTitle")}
              onChange={(e) => { props.setInputValue("certificateTitle", e.target.value) }}
            ></InputField>
          </div>
          <div className="title">
            <p>Description</p>
            <InputField
              type="text"
              name="title-input"
              placeholder="Certificate description"
              value={props.getInputValue("certificateDescription")}
              onChange={(e) => { props.setInputValue("certificateDescription", e.target.value) }}
            ></InputField>
          </div>
          <div className="title">
            <p>Score</p>
            <InputField
              type="text"
              name="title-input"
              placeholder="Certificate score"
              value={props.getInputValue("certificateScore")}
              onChange={(e) => { props.setInputValue("certificateScore", e.target.value) }}
            ></InputField>
          </div>
        </div>
        <img src={template} alt="template certificate"></img>
      </div>
      <div className="btn-next">
        <SubmitButton
          buttonText="Next"
          disabled={disabledButton()}
          onClick={() => {
            history.push(
              "/dashboard?menu=manage-certificate&create_certificate_step=2"
            );
          }}
        ></SubmitButton>
      </div>
    </React.Fragment>
  );
};

export default CreateCertificate1;
