import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
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
import { createNotification } from "../../components/Notification/Notification";

const ViewCertificate = (props) => {
  const [certificate, setCertificate] = useState({});
  const [certificateStatus, setCertificateStatus] = useState(0);
  const [progressBarContent, setProgressBarContent] = useState([]);
  const [isSigner, setSigner] = useState(false);
  const [isSigned, setSigned] = useState(true);
  const [isReceiver, setReceiver] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [allowToSigning, setAllowToSigning] = useState(false);
  const user = useSelector(state => state.getIn(['actor', 'user']).toJS());
  const certificateId = new URLSearchParams(props.location.search).get(
    "certificate_id"
  );

  const decideSigner = () => {
    if (!(Object.keys(certificate) <= 0 
      || certificateStatus != 0 || progressBarContent.length <= 0
      || !user || Object.keys(user) <= 0)) {

      let temp = {};
      setReceiver(
        progressBarContent[progressBarContent.length - 1].user_id === user.user_id
      );
      for (const content of progressBarContent) {
        if (content.user_id === user.user_id) {
          setSigner(true);
          if (temp.success && !content.success) {
            setAllowToSigning(true);
            setSigned(false);
          } else if (content.success) {
            setAllowToSigning(false);
            setSigned(true);
          } else {
            setSigned(false);
            setAllowToSigning(false);
          }
        }
        temp = content;
      }
    }
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
      const link = <Link 
        to="" 
        onClick={(e) => {
          e.preventDefault();
          window.open(`/profile?actor_type=USER&actor_public_key=${approver.User.public_key}`, "_blank");
        }}>{approver.User.name}</Link>
      newProgressBarContent.push({
        success: signedByApprover,
        text: signedByApprover ? 
          <div>Signed By {link}</div> : <div>Assign to {link}</div>,
        user_id: approver.user_id
      });
      index++;
    }
    const signedByReceiver = await digiCertContract.methods.signedByReceiver().call();
    const link = <Link 
        to="" 
        onClick={(e) => {
          e.preventDefault();
          window.open(`/profile?actor_type=USER&actor_public_key=${newCert.User.public_key}`, "_blank");
        }}>{newCert.User.name}</Link>
    newProgressBarContent.push({
      success: signedByReceiver,
      text: signedByReceiver ? 
          <div>Received By {link}</div> : <div>Send to {link}</div>,
      user_id: newCert.user_id
    });
    setProgressBarContent(newProgressBarContent);
  }

  const getCertificateStatus = async (scAddress) => {
    if (!web3.utils.isAddress(scAddress)) {
      return;
    }
    const digicertContract = DigiCertContract.getNewInstance(scAddress);
    setCertificateStatus(await digicertContract.methods.status().call());
  }

  useEffect(() => {
    if (Object.keys(certificate) <= 0) {
      getCertificate();
    }
    decideSigner();
  }, [certificateId, certificate, certificateStatus, progressBarContent])

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

  const onSign = async () => {
    setProcessing(true);
    createNotification({
      type: "info",
      value: "Please check your metamask"
    });
    try {
      const accounts = await web3.eth.getAccounts();
      const digicertContract = DigiCertContract.getNewInstance(certificate.sc_address);
      const signature = await props.getSignature(certificate);
      let method;
      if (isReceiver) {
        method = digicertContract.methods.receiverSigning(signature);
      } else {
        method = digicertContract.methods.approverSigning(signature);
      }
      console.log(signature);
      await method.send({
        from: accounts[0],
        gasLimit: await method.estimateGas({from: accounts[0]}),
        gasPrice: '100000000000'
      });
      getCertificate();
      createNotification({
        type: "success",
        value: "Your signature submitted on blockchain!"
      });
    } catch(e) {
      createNotification({
        type: "error",
        value: typeof e === 'object' ? e.message : e
      });
    }
    setProcessing(false);
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
            isProcessing={isProcessing}
            disabled={!allowToSigning}
            buttonText={isSigned ? "Signed" : "Sign"}
            onClick={() => {
              onSign();
            }}
          ></SubmitButton> : <></>}
      </div>
      <div className="btn-done">
        <SubmitButton
          buttonText="Back"
          onClick={() => {
            history.push(`/dashboard/${props.actor}?menu=manage-certificate`);
          }}
        ></SubmitButton>
      </div>
    </React.Fragment>
  );
};

export default React.memo(withRouter(ViewCertificate));
