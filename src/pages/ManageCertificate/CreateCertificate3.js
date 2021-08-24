import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import template from "../../assets/images/CertificateTemplate.jpg";
import "./CreateCertificate3.scss";
import React, { useState } from "react";
import { history } from "../../store";

const CreateCertificate3 = (props) => {
  const [isProcessing, setProcessing] = useState(false);

  const composeAssignToName = () => {
    let result = '';
    for(const assignToUser of props.assignToUsers) {
      result += assignToUser.name + ', ';
    }

    return result.substr(0, result.length - 2);
  }

  return (
    <React.Fragment>
      <form className="form-sendTo-assignTo">
        <div className="sendTo-view">
          <p>Send to :</p>
          <span>{props.sendToUser.name}</span>
        </div>
        <div className="assignTo-view">
          <p>Assign to :</p>
          <span>{composeAssignToName()}</span>
        </div>
      </form>
      <form className="form-certificate">
        <img src={template} alt="template certificate"></img>
      </form>
      <div className="btn-back-next">
        <div className="btn-back">
          <SubmitButton
            isProcessing={isProcessing}
            buttonText="Back"
            onClick={() => {
              history.push(
                "/dashboard?menu=manage-certificate&create_certificate_step=2"
              );
            }}
          ></SubmitButton>
        </div>
        <div className="btn-send">
          <SubmitButton 
            isProcessing={isProcessing}
            buttonText="Send"
            onClick={async () => {
              setProcessing(true);
              await props.submit();
              setProcessing(false);
            }}></SubmitButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCertificate3;
