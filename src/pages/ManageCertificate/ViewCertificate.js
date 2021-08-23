import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import { CERTIFICATE_STATUS } from "../../constants/component.constant";
import DigiCertContract from "../../contracts/digital_certificate";
import API from "../../services/api";
import web3 from "../../services/web3";
import { history } from "../../store";
import "./ViewCertificate.scss";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";

const ViewCertificate = (props) => {
  const [certificate, setCertificate] = useState({});
  const [certificateStatus, setCertificateStatus] = useState(0);
  const [progressBarContent, setProgressBarContent] = useState([]);
  const certificateId = new URLSearchParams(props.location.search).get(
    "certificate_id"
  );

  const getCertificate = async () => {
    const newCert = await API.getCertificateById(certificateId);
    setCertificate(newCert);
    getCertificateStatus(newCert.sc_address);
    
    const newProgressBarContent = [{
      success: true,
      text: `Init By ${newCert.Admin.name}`,
    }];

    const sortedApprovers = newCert.CertificateSigners.sort((a, b) => {
      return a.priority - b.priority;
    });

    const digiCertContract = DigiCertContract.getNewInstance(newCert.sc_address);
    let index = 0;
    for (const approver of sortedApprovers) {
      const signedByApprover = await digiCertContract.methods.signedByApprovers(index).call();
      newProgressBarContent.push({
        success: signedByApprover,
        text: signedByApprover ? `Signed By ${approver.User.name}` : `Assign to ${approver.User.name}`,
      });
      index++;
    }
    const signedByReceiver = await digiCertContract.methods.signedByReceiver().call();
    newProgressBarContent.push({
      success: signedByReceiver,
      text: signedByReceiver ? `Signed By ${newCert.User.name}` : `Send to ${newCert.User.name}`,
    });
    console.log(newProgressBarContent);
    setProgressBarContent(newProgressBarContent);
  }

  const getCertificateStatus = async (scAddress) => {
    if (!web3.utils.isAddress(scAddress)) {
      return;
    }
    const digicertContract = DigiCertContract.getNewInstance(scAddress);
    setCertificateStatus(await digicertContract.methods.status().call());
  }

  useState(() => {
    getCertificate();
  }, [certificateId])

  return (
    <React.Fragment>
      <form className="form-document-status">
        <div className="document-name">
          <p className="document-name-title">Document Name :</p>
          <span>{certificate.name}</span>
        </div>
        <div className="status">
          <p className="status-title">Status :</p>
          <span>{CERTIFICATE_STATUS[certificateStatus]}</span>
        </div>
      </form>
      <ProgressBar progress={progressBarContent} />
      {/* <form className="form-view-document">
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
      </form> */}
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

export default React.memo(withRouter(ViewCertificate));
