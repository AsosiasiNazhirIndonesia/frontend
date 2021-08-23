import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import TableCertificate from "../../components/Table/TableCertificate";
import { withRouter } from "react-router-dom";
import { history } from "../../store";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> remotes/origin/Improvement
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
import Pagination from "../../components/elements/Pagination/Pagination";
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
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      date: "10 Mei 2021",
      documentName: "Ijasah D4 Politeknik Negeri Bandung",
      sendTo: "Anggi Nur Dhamayanty",
      signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
      status: "On Progress",
    },
    {
      id: 2,
      date: "10 Mei 2021",
      documentName: "Ijasah D4 Politeknik Negeri Bandung",
      sendTo: "Anggi Nur Dhamayanty",
      signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
      status: "Done",
    },
    {
      id: 3,
      date: "10 Mei 2021",
      documentName: "Ijasah D4 Politeknik Negeri Bandung",
      sendTo: "Anggi Nur Dhamayanty",
      signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
      status: "Failed",
    },
    {
      id: 4,
      date: "10 Mei 2021",
      documentName: "Ijasah D4 Politeknik Negeri Bandung",
      sendTo: "Anggi Nur Dhamayanty",
      signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
      status: "Done",
    },
    {
      id: 5,
      date: "10 Mei 2021",
      documentName: "Ijasah D4 Politeknik Negeri Bandung",
      sendTo: "Anggi Nur Dhamayanty",
      signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
      status: "Done",
    },
  ]);

  const step = new URLSearchParams(props.location.search).get(
    "create_certificate_step"
  );
  const view = new URLSearchParams(props.location.search).get(
    "view_certificate"
  );

  useEffect(() => {
    //console.log(this.prop);
    // setItems();
  });

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = certificates.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getInputValue = (key) => {
    switch (key) {
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
  };

  const loadSendToUser = async (publicKey) => {
    const user = await API.getUserByPublicKey(publicKey);
    setSendToUser(user ? user : {});
    const status = user ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;
    setSendToPubKey({
      status,
      value: publicKey,
      errorMessage:
        status === INPUT_STATUS.INVALID
          ? !user
            ? "user not found"
            : "required field"
          : "",
    });
  };

  const setInputValue = (key, value) => {
    let status =
      value && value != "" ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;

    switch (key) {
      case "documentName":
        setDocumentName({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "receiverName":
        setReceiverName({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "certificateNo":
        setCertificateNo({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "certificateTitle":
        setCertificateTitle({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "certificateDescription":
        setCertificateDescription({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "certificateScore":
        setCertificateScore({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
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
          errorMessage:
            status === INPUT_STATUS.INVALID
              ? "public key length must be 42 characters"
              : "",
        });
        break;
    }
  };

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
          return (
            <CreateCertificate1
              getInputValue={getInputValue}
              setInputValue={setInputValue}
            />
          );
        case "2":
          return (
            <CreateCertificate2
              getInputValue={getInputValue}
              setInputValue={setInputValue}
              sendToUser={sendToUser}
              assignToPubKeys={assignToPubKeys}
              setAssignToPubKeys={setAssignToPubKeys}
              assignToUsers={assignToUsers}
              setAssignToUsers={setAssignToUsers}
            />
          );
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
              <TableCertificate
                certificates={currentItems}
                setIsDelete={setIsDelete}
              />
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItem={certificates.length}
                paginate={paginate}
              />
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
        text: "Add Document",
      },
      {
        success: Number(step) >= 2 ? true : false,
        text: "Assign Document",
      },
      {
        success: Number(step) >= 3 ? true : false,
        text: "Preview",
      },
    ];
  };

  return (
    <div className="certificate-content">
      <div className="breadcrumb">
        <h1>Manage Certificate</h1>
        {resolveSubtitle()}
      </div>
      <ProgressBar progress={resolveProgressBarContent()} />
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
