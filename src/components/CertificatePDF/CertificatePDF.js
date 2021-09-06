import telkomLogo from "../../assets/images/telkom-logo.png";
import "./CertificatePDF.scss";
import { HOST } from "../../services/api";
import { useState } from "react";

export default (props) => {
  const composeAssignToName = () => {
    if (!props.certificateSigners) {
      return;
    }
    let certificateSigners = props.certificateSigners;
    if (certificateSigners[0].priority !== undefined || certificateSigners[0].priority !== null) {
      const sortedSigners = props.certificateSigners.sort((a, b) => {
        return a.priority - b.priority;
      });
      certificateSigners = sortedSigners.map((signer) => {
        return {
          name: signer.User.name
        }
      });
    }

    let result = '';
    for(const assignToUser of certificateSigners) {
      result += assignToUser.name + ', ';
    }

    return result.substr(0, result.length - 2);
  }

  return (
    <div className="template">
      {/* <button
        onClick={() => {
          takeShot();
        }}
      /> */}
      <div className="template-body" ref={props.cetificateRef} id="certificateImage">
        <img src={props.certificateLogo ? `${HOST}/api/files/${props.certificateLogo}` : telkomLogo} className="certificate-logo"/>
        <div className="template-header">
          <span>{props.certificateTitle}</span>
        </div>
        <div className="template-content">
          <span className="certificate-no">Nomor Sertifikat: {props.certificateNo}</span>
          <span className="present-to">
            <b>Diberikan Kepada:</b>
          </span>
          <span className="name">{props.receiverName}</span>
          <div className="description" dangerouslySetInnerHTML={{__html: props.certificateDescription}}></div>
          <span className="score">Score: {props.certificateScore}</span>
          <span className="sc-address">Contract Address: {props.scAddress ? props.scAddress : '-'}</span>
        </div>
        <div className="template-footer">
          <span className="certificate-date">Date: {props.certificateDate}</span>
          <span className="certificate-signers">Signed By: {composeAssignToName()}</span>
        </div>
      </div>
    </div>
  );
};
