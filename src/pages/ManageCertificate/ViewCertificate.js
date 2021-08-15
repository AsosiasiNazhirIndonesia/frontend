import React from "react";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import { history } from "../../store";
import "./ViewCertificate.scss";

const ViewCertificate = (props) => {
  return (
    <React.Fragment>
      <form className="form-document-status">
        <div className="document-name">
          <p className="document-name-title">Document Name :</p>
          <span>Ijasah D4 Politeknik Negeri Bandung</span>
        </div>
        <div className="status">
          <p className="status-title">Status :</p>
          <span>On Progress</span>
        </div>
      </form>
      <div className="sign-progress">
        <h3>Progress Bar :</h3>
      </div>
      <form className="form-view-document">
        <div className="view-before-signing">
          <p>View document before signing :</p>
          <div className="btn-view">
            <SubmitButton buttonText="View"></SubmitButton>
          </div>
          <div className="btn-download">
            <SubmitButton buttonText="Download"></SubmitButton>
          </div>
        </div>
        <div className="view-after-signed">
          <p>View document after signed :</p>
          <div className="btn-view">
            <SubmitButton buttonText="View"></SubmitButton>
          </div>
          <div className="btn-download">
            <SubmitButton buttonText="Download"></SubmitButton>
          </div>
        </div>
      </form>
      <div className="btn-done">
        <SubmitButton
          buttonText="Back"
          onClick={() => {
            history.push("/dashboard?menu=manage-certificate");
          }}
        ></SubmitButton>
      </div>
    </React.Fragment>
  );
};

export default ViewCertificate;
