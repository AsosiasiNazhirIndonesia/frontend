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
import jsPDF from "jspdf";
import DomToImage from "dom-to-image";
import { useSelector } from "react-redux";
import { createNotification } from "../../components/Notification/Notification";
import htmlToText from "html-to-text";
import linkedinLogo from "../../assets/images/linkedin.png";
import moment from "moment";

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
  const certificateId = props.certificateId;

  const decideSigner = () => {
    if (!(Object.keys(certificate) <= 0 || progressBarContent.length <= 0
      || !user || Object.keys(user) <= 0)) {

      let temp = {};
      console.log('hey');
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
    if (user) {
      decideSigner();
    }
  }, [props.certificateId, certificate, certificateStatus, progressBarContent])

  const LazyDownloadPDFButton = async () => {
    const pdf = new jsPDF("l", "px", [595, 842]);
    if (pdf) {
      const input = document.getElementById("certificateImage");
      DomToImage.toPng(input).then((imgData) => {
        pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
        pdf.save("digital-certificate.pdf");
      });
    }
  }

  const getDataToSign = (certificate) => {
    const { receiver_name, no, 
      title, description, score, date} = certificate;
    const descriptionText = htmlToText.fromString(description).replace(/(\r\n|\n|\r| )/gm, "");
    const mergeCertificateData = (receiver_name + no + title + descriptionText + score + date).replace(/(\r\n|\n|\r| )/gm, "");
    console.log(mergeCertificateData);
    console.log(web3.utils.keccak256(mergeCertificateData));
    return web3.utils.keccak256(mergeCertificateData)
  }

  const getSignature = async (certificate) => {
    const certificateHash = getDataToSign(certificate);
    const accounts = await web3.eth.getAccounts();
    const signature = await web3.eth.personal.sign(certificateHash, accounts[0]);
    return signature;
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
      const signature = await getSignature(certificate);
      let method;
      if (isReceiver) {
        method = digicertContract.methods.receiverSigning(signature);
      } else {
        method = digicertContract.methods.approverSigning(signature);
      }
      await method.send({
        from: accounts[0],
        gasLimit: await method.estimateGas({from: accounts[0]}),
        gasPrice: '100000000000'
      });
      if (!isReceiver) {
        API.signingCertificate({user_id: user.user_id, certificate_id: certificate.certificate_id})
      }

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

  const shareToLinkedIn = () => {
    const dateArr = certificate.date.split('-');
    window.open(`https://www.linkedin.com/profile/add?startTask=Telkom%20Blockchain%20Based%20Digital%20Certificate&name=${certificate.name}&organizationId=75615928&issueYear=${dateArr[2]}&issueMonth=${dateArr[1]}&expirationYear=0&expirationMonth=0&certUrl=http%3A%2F%2F103.172.204.60%2F%3Fcontract_address%3D${certificate.sc_address}`)
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
        {isReceiver ? 
          <SubmitButton
              buttonText="Download"
              onClick={() => {
                LazyDownloadPDFButton();
              }}
            ></SubmitButton> : <></>}
        <SubmitButton
            buttonText="On Blockchain"
            onClick={() => {
              window.open(`https://ropsten.etherscan.io/address/${certificate.sc_address}`, "__blank")
            }}
          ></SubmitButton>
        {isReceiver ? 
        <div className="share-btn">
          <img src={linkedinLogo}
            onClick={() => {
              shareToLinkedIn();
            }}
          />
        </div> : <></>}
      </div>
      <div className="view-pdf">
        <CertificatePDF 
          certificateTitle={certificate.title} 
          receiverName={certificate.receiver_name}
          certificateNo={certificate.no}
          certificateDescription={certificate.description}
          certificateScore={certificate.score}
          certificateDate={certificate.date}
          scAddress={certificate.sc_address}
          certificateLogo={certificate.logo}
          certificateSigners={certificate.CertificateSigners}/>
          {isSigner ? 
          <SubmitButton
            isProcessing={isProcessing}
            disabled={!allowToSigning || certificateStatus == 2}
            buttonText={isSigned && !isReceiver ? "Signed" : isSigned && isReceiver ? "Accepted" : isReceiver ? "Accept" : "Sign"}
            onClick={() => {
              onSign();
            }}
          ></SubmitButton> : <></>}
      </div>
      {props.actor ? 
      <div className="btn-done">
        <SubmitButton
          buttonText="Back"
          onClick={() => {
            history.push(`/dashboard/${props.actor}?menu=manage-certificate`);
          }}
        ></SubmitButton>
      </div> : <></>}
    </React.Fragment>
  );
};

export default React.memo(withRouter(ViewCertificate));
