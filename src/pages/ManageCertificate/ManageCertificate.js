import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import TableCertificate from "../../components/Table/TableCertificate";
import { withRouter } from "react-router-dom";
import { history } from "../../store";
import React, { useState } from "react";
import CreateCertificate1 from "./CreateCertificate1";
import CreateCertificate2 from "./CreateCertificate2";
import CreateCertificate3 from "./CreateCertificate3";
import ViewCertificate from "./ViewCertificate";
import "./ManageCertificate.scss";
import Delete from "../../components/Popup/Delete";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";
import { INPUT_STATUS } from "../../constants/component.constant";
import API from "../../services/api";

const ManageCertificate = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [documentName, setDocumentName] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [receiverName, setReceiverName] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateNo, setCertificateNo] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateTitle, setCertificateTitle] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateDescription, setCertificateDescription] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateScore, setCertificateScore] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [sendToPubKey, setSendToPubKey] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [sendToUser, setSendToUser] = useState({});
  const [assignToPubKeys, setAssignToPubKeys] = useState([{status: INPUT_STATUS.INIT, value: '', errorMessage: ''}]);
  const [assignToUsers, setAssignToUsers] = useState([{}]);

  const step = new URLSearchParams(props.location.search).get(
    "create_certificate_step"
  );
  const view = new URLSearchParams(props.location.search).get(
    "view_certificate"
  );
  
  const getInputValue = (key) => {
    switch(key) {
      case "documentName":
        return documentName;
      case "receiverName":
        return receiverName;
      case "certificateNo":
        return certificateNo;
      case "certificateTitle":
        return certificateTitle;
      case "certificateDescription":
        return certificateDescription;
      case "certificateScore":
        return certificateScore;
      case "sendToPubKey":
        return sendToPubKey;
    }
  }

  const loadSendToUser = async (publicKey) => {
    const user = await API.getUserByPublicKey(publicKey);
    setSendToUser(user ? user : {});
    const status = user ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;
    setSendToPubKey({
      status,
      value: publicKey,
      errorMessage: status === INPUT_STATUS.INVALID ? !user ? 'user not found' : 'required field' : ''
    });
  }

  const setInputValue = (key, value) => {
    let status = value && value != '' ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;

    switch(key) {
      case "documentName":
        setDocumentName({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'required field' : ''
        });
        break;
      case "receiverName":
        setReceiverName({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'required field' : ''
        });
        break;
      case "certificateNo":
        setCertificateNo({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'required field' : ''
        });
        break;
      case "certificateTitle":
        setCertificateTitle({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'required field' : ''
        });
        break;
      case "certificateDescription":
        setCertificateDescription({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'required field' : ''
        });
        break;
      case "certificateScore":
        setCertificateScore({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'required field' : ''
        });
        break;
      case "sendToPubKey":
        if (value.length === 42) {
          loadSendToUser(value);
        } else {
          status = INPUT_STATUS.INVALID;
          setSendToUser({});
        }
        setSendToPubKey({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? 'public key length must be 42 characters' : ''
        });
        break;
    }
  }

  const resolveContent = () => {
    if (view) {
      return <ViewCertificate />;
    } else {
      switch (step) {
        case "1":
          return <CreateCertificate1 getInputValue={getInputValue} setInputValue={setInputValue}/>;
        case "2":
          return <CreateCertificate2 
            getInputValue={getInputValue} 
            setInputValue={setInputValue} 
            sendToUser={sendToUser}
            assignToPubKeys={assignToPubKeys}
            setAssignToPubKeys={setAssignToPubKeys}
            assignToUsers={assignToUsers}
            setAssignToUsers={setAssignToUsers} />;
        case "3":
          return <CreateCertificate3 sendToUser={sendToUser} assignToUsers={assignToUsers}/>;
        default:
          return (
            <React.Fragment>
              <div className="bef-table">
                <div className="btn-add-certificate">
                  <SubmitButton
                    buttonText={"Create Certificate"}
                    onClick={() => {
                      history.push(
                        "/dashboard?menu=manage-certificate&create_certificate_step=1"
                      );
                    }}
                  ></SubmitButton>
                </div>
              </div>
              <TableCertificate setIsDelete={setIsDelete} />
            </React.Fragment>
          );
      }
    }
  };

  const resolveSubtitle = () => {
    if (view) {
      return (
        <h6 className="breadcrumb-path"> Manage Certificate - View Document</h6>
      );
    } else {
      switch (step) {
        case "1":
        case "2":
        case "3":
          return (
            <h6 className="breadcrumb-path">
              {" "}
              Manage Certificate - Create Document
            </h6>
          );
        default:
          return <div></div>;
      }
    }
  };

  const resolveProgressBarContent = () => {
    if (!step) {
      return [];
    }

    return [
      {
        success: Number(step) >= 1 ? true : false,
        text: 'Add Document'
      },
      {
        success: Number(step) >= 2 ? true : false,
        text: 'Assign Document'
      },
      {
        success: Number(step) >= 3 ? true : false,
        text: 'Preview'
      }
    ];
  }

  return (
    <div className="certificate-content">
      <div className="breadcrumb">
        <h1>Manage Certificate</h1>
        {resolveSubtitle()}
      </div>
      <ProgressBar progress={resolveProgressBarContent()}/>
      {resolveContent()}
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};
export default withRouter(ManageCertificate);
