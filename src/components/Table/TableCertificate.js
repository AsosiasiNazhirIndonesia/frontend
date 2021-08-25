import { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ACTOR, CERTIFICATE_STATUS } from "../../constants/component.constant";
import DigiCertContract from "../../contracts/digital_certificate";
import { setDeleteSelectedData } from "../../modules/actions/delete.action";
import web3 from "../../services/web3";
import "./Table.scss";

export default (props) => {
  const [certificateStatus, setCertificateStatus] = useState({});
  const dispatch = useDispatch();
  
  const getCertificateStatus = async () => {
    const newCertificateStatus = { ...certificateStatus };
    for (const {scAddress} of props.certificates) {
      if (!web3.utils.isAddress(scAddress)) {
        continue;
      }
      const digicertContract = DigiCertContract.getNewInstance(scAddress);
      newCertificateStatus[scAddress] = CERTIFICATE_STATUS[await digicertContract.methods.status().call()];
    }
    setCertificateStatus(newCertificateStatus);
  }

  useEffect(() => {
    getCertificateStatus();
  }, [props.certificates] );

  const renderTableData = () => {
    return props.certificates.map((certificate, index) => {
      const { id, date, documentName, sendTo, signaturedBy, status, scAddress } = certificate; //destructuring
      return (
        <tr key={id}>
          <td>{date}</td>
          <td>{documentName}</td>
          <td>{sendTo}</td>
          <td>{signaturedBy}</td>
          <td>{certificateStatus[scAddress]}</td>
          <td>
            <Link
              style={{ color: "black" }}
              to={`/dashboard/${props.actor}?menu=manage-certificate&view_certificate=true&certificate_id=${id}`}
            >
              View
            </Link>
            {props.type === ACTOR.ADMIN ? ',' : ''}
            {props.type === ACTOR.ADMIN ?
            <Link
              style={{ color: "red" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                props.setIsDelete(true);
                dispatch(setDeleteSelectedData(certificate));
              }}
            >
              Delete
            </Link> : <></>}
          </td>
        </tr>
      );
    });
  }

  const renderTableHeader = () => {
    return (
      <tr>
        <th>Date</th>
        <th>Document Name</th>
        <th>Send To</th>
        <th>Signatured By</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    );
  }

  return (
    <div>
      <table className="certificate-table">
        <thead>{renderTableHeader()}</thead>
        <tbody className="content-table">
          {renderTableData(props)}
        </tbody>
      </table>
    </div>
  );
}
