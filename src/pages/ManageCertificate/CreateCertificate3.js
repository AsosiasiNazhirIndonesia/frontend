import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import template from "../../assets/images/CertificateTemplate.jpg";
import "./CreateCertificate3.scss";
import React from "react";
import { history } from "../../store";

const CreateCertificate3 = (props) => {
  return (
    <React.Fragment>
      <div className="sign-progress">
        <h3>Progress Bar :</h3>
      </div>
      <form className="form-sendTo-assignTo">
        <div className="sendTo-view">
          <p>Send to :</p>
          <span>Anggi Nur Dhamayanty</span>
        </div>
        <div className="assignTo-view">
          <p>Assign to :</p>
          <span>Bambang Ariyanto, Riana Maharani, Tari Saputri</span>
        </div>
      </form>
      <form className="form-certificate">
        <img src={template} alt="template certificate"></img>
      </form>
      <div className="btn-back-next">
        <div className="btn-back">
          <SubmitButton
            buttonText="Back"
            onClick={() => {
              history.push(
                "/dashboard?menu=manage-certificate&create_certificate_step=2"
              );
            }}
          ></SubmitButton>
        </div>
        <div className="btn-send">
          <SubmitButton buttonText="Send"></SubmitButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCertificate3;
