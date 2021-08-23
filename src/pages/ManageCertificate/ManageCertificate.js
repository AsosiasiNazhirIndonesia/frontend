import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import TableCertificate from "../../components/Table/TableCertificate";
import { withRouter } from "react-router-dom";
import { history } from "../../store";
import React, { useEffect, useState } from "react";
import CreateCertificate1 from "./CreateCertificate1";
import CreateCertificate2 from "./CreateCertificate2";
import CreateCertificate3 from "./CreateCertificate3";
import ViewCertificate from "./ViewCertificate";
import "./ManageCertificate.scss";
import Delete from "../../components/Popup/Delete";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";
import { INPUT_STATUS } from "../../constants/component.constant";
import API from "../../services/api";
import DigitalCertificate from "../../contracts/digital_certificate";
import web3 from "../../services/web3";
import { createNotification } from "../../components/Notification/Notification";
import { connect } from "react-redux";

const ManageCertificate = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [documentName, setDocumentName] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [receiverName, setReceiverName] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateNo, setCertificateNo] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateTitle, setCertificateTitle] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateDescription, setCertificateDescription] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateScore, setCertificateScore] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [certificateDate, setCertificateDate] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [sendToPubKey, setSendToPubKey] = useState({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
  const [sendToUser, setSendToUser] = useState({});
  const [assignToPubKeys, setAssignToPubKeys] = useState([{status: INPUT_STATUS.INIT, value: '', errorMessage: ''}]);
  const [assignToUsers, setAssignToUsers] = useState([{}]);

  const tryToDeploy = async () => {
    const toDeploy = DigitalCertificate
      .deploy('0xabc','0x45d2A3aF7f12Fbb8b9797E966402579bBE43B7C5',['0xb7932b22d821b60e2A801269b8DE9005019CE578'])
    toDeploy.send({
      from: '0xAb3593B790e0c1Ef8058329A2B8f41E00904B214',
      gasPrice: '13000000'
    })
  }

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
      case "certificateDate":
        return certificateDate;
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
      case "certificateDate":
        setCertificateDate({
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

  const submit = async () => {
    const mergeCertificateData = receiverName.value + certificateNo.value + 
      certificateTitle.value + certificateDescription.value + certificateScore.value + certificateDate.value;
    const certificateHash = web3.utils.keccak256(mergeCertificateData);
    console.log(certificateHash);
    let approvers = [];
    for (const assignToPubKey of assignToPubKeys) {
      approvers.push(assignToPubKey.value);
    }

    const tx = DigitalCertificate.deploy(certificateHash, sendToPubKey.value, approvers);
    const accounts = await web3.eth.getAccounts();
    try {
      createNotification({
        type: "info", 
        value: "Please check your metamask and stay on this page until certificate has been deployed to blockchain"});
      const res = await tx.send({
        from: accounts[0],
        gas: 3000000,
        gasPrice: '100000000000'
      });
      console.log(res);
      API.addCertificate({
        admin_id: props.admin.admin_id,
        user_id: sendToUser.user_id,
        name: documentName.value,
        title: certificateTitle.value,
        no: certificateNo.value,
        description: certificateDescription.value,
        score: certificateScore.value,
        date: certificateDate.value,
        sc_address: res._address
      });
      
      createNotification({
        type: "success", 
        value: "Your certificate already on blockchain"});

        history.push('/dashboard?menu=manage-certificate');
    } catch(e) {
      console.log(e);
      createNotification({
        type: "error",
        value: "Something went wrong"
      })
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
          return <CreateCertificate3 sendToUser={sendToUser} assignToUsers={assignToUsers} submit={submit}/>;
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

const mapStateToProps = (state) => ({
  admin:  state.getIn(['actor', 'admin']).toJS(),
  type: state.getIn(['actor', 'type'])
});

export default connect(mapStateToProps)(React.memo(withRouter(ManageCertificate)));
