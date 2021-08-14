import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import template from "../../assets/images/CertificateTemplate.jpg";
import "./CreateCertificate1.scss";
import React from "react";
import { history } from "../../store";

const CreateCertificate1 = (props) => {
  const value = {};
  return (
    <React.Fragment>
      <div className="sign-progress">
        <h3>Progress Bar :</h3>
      </div>
      <form className="form-name-template">
        <div className="name-template">
          <p>Document Name</p>
          <InputField
            type="text"
            name="search-input"
            placeholder="Search Document Name"
            value={value}
          ></InputField>
        </div>
        <div className="submit-template">
          <p>Upload Template</p>
          <SubmitButton buttonText="Browse Template"></SubmitButton>
        </div>
      </form>
      <div className="form-group">
        <form className="form-detail-certificate">
          <div className="name-user">
            <p>Name</p>
            <InputField
              type="text"
              name="name-input"
              placeholder=""
              value={value}
            ></InputField>
          </div>
          <div className="no-certificate">
            <p>No Certificate</p>
            <InputField
              type="text"
              name="no-certificate-input"
              placeholder=""
              value={value}
            ></InputField>
          </div>
          <div className="title">
            <p>Title</p>
            <InputField
              type="text"
              name="title-input"
              placeholder=""
              value={value}
            ></InputField>
          </div>
          <div className="btn-submit">
            <SubmitButton buttonText="Add"></SubmitButton>
          </div>
        </form>
        <img src={template} alt="template certificate"></img>
      </div>
      <div className="btn-next">
        <SubmitButton
          buttonText="Next"
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
