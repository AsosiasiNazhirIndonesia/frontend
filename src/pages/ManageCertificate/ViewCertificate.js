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
import CertificatePDF from "../../components/CertificatePDF/CertificatePDF";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';
import { useSelector } from "react-redux";

const ViewCertificate = (props) => {
  const [certificate, setCertificate] = useState({});
  const [certificateStatus, setCertificateStatus] = useState(0);
  const [progressBarContent, setProgressBarContent] = useState([]);
  const [isSigner, setSigner] = useState(false);
  const user = useSelector(state => state.getIn(['actor', 'user']).toJS());
  const certificateId = new URLSearchParams(props.location.search).get(
    "certificate_id"
  );

  const decideSigner = () => {
    if (!certificate 
      || certificateStatus !== CERTIFICATE_STATUS[0] 
      || !user || Object.keys(user) <= 0) {
      setSigner(false);
    }

    let temp = {};
    console.log(progressBarContent);
    for (const content of progressBarContent) {
      if (temp.user_id === user.user_id && !temp.success) {
        setSigner(false);
        break;
      } else if (temp.user_id === user.user_id && temp.success) {
        setSigner(true);
        break;
      }
      temp = content;
      console.log(temp);
    }
    
    setSigner(true);
  }

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
        user_id: approver.user_id
      });
      index++;
    }
    const signedByReceiver = await digiCertContract.methods.signedByReceiver().call();
    newProgressBarContent.push({
      success: signedByReceiver,
      text: signedByReceiver ? `Signed By ${newCert.User.name}` : `Send to ${newCert.User.name}`,
      user_id: newCert.user_id
    });
    setProgressBarContent(newProgressBarContent);
    decideSigner();
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

  const LazyDownloadPDFButton = async () => {
    const doc = <CertificatePDF 
      certificateTitle={certificate.title} 
      receiverName={certificate.receiver_name}
      certificateNo={certificate.no}
      certificateDescription={certificate.description}
      certificateScore={certificate.score}
      certificateDate={certificate.date}
      scAddress={certificate.sc_address}/>
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, `${certificate.name}.pdf`);
  }

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
      <div className="view-action-btn">
        <SubmitButton
            buttonText="Download"
            onClick={() => {
              LazyDownloadPDFButton();
            }}
          ></SubmitButton>
        <SubmitButton
            buttonText="On Blockchain"
            onClick={() => {
              window.open(`https://ropsten.etherscan.io/address/${certificate.sc_address}`, "__blank")
            }}
          ></SubmitButton>
      </div>
      <div className="view-pdf">
        <CertificatePDF 
          certificateTitle={certificate.title} 
          receiverName={certificate.receiver_name}
          certificateNo={certificate.no}
          certificateDescription={certificate.description}
          certificateScore={certificate.score}
          certificateDate={certificate.date}
          scAddress={certificate.sc_address}/>
          {isSigner ? 
          <SubmitButton
            buttonText="Sign"
            onClick={() => {
              LazyDownloadPDFButton();
            }}
          ></SubmitButton> : <></>}
      </div>
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
