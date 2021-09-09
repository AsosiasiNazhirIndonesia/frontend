import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import TableCertificate from "../../components/Table/TableCertificate";
import { useParams, withRouter } from "react-router-dom";
import { history } from "../../store";
import React, { useEffect, useState } from "react";
import CreateCertificate1 from "./CreateCertificate1";
import CreateCertificate2 from "./CreateCertificate2";
import CreateCertificate3 from "./CreateCertificate3";
import ViewCertificate from "./ViewCertificate";
import "./ManageCertificate.scss";
import Delete from "../../components/Popup/Delete";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";
import { ACTOR, INPUT_STATUS } from "../../constants/component.constant";
import API from "../../services/api";
import DigitalCertificate from "../../contracts/digital_certificate";
import web3 from "../../services/web3";
import { createNotification } from "../../components/Notification/Notification";
import Pagination from "../../components/elements/Pagination/Pagination";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import DigiCertContract from "../../contracts/digital_certificate";
import htmlToText from "html-to-text";

const ManageCertificate = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [certificateLogo, setCertificateLogo] = useState(null);
  const [documentName, setDocumentName] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [receiverName, setReceiverName] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [certificateNo, setCertificateNo] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [certificateTitle, setCertificateTitle] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [certificateDescription, setCertificateDescription] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [certificateScore, setCertificateScore] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [certificateDate, setCertificateDate] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [sendToPubKey, setSendToPubKey] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [sendToUser, setSendToUser] = useState({});
  const [assignToPubKeys, setAssignToPubKeys] = useState([
    { status: INPUT_STATUS.INIT, value: "", errorMessage: "" },
  ]);
  const [assignToUsers, setAssignToUsers] = useState([{}]);
  const [certificates, setCertificates] = useState([]);

  const step = new URLSearchParams(props.location.search).get(
    "create_certificate_step"
  );
  const view = new URLSearchParams(props.location.search).get(
    "view_certificate"
  );
  const certificateId = new URLSearchParams(props.location.search).get(
    "certificate_id"
  );
  const actor = useParams().actor;
  const deleteSelectedData = useSelector((state) => state.getIn(["delete", "selectedData"]).toJS())

  const getAllCertificates = async (offset, limit) => {
    let results = [];
    if (props.type === ACTOR.USER && props.user) {
      results = await API.getCertificatesByUser(props.user.user_id, offset, limit);
    } else if (props.type === ACTOR.ADMIN && props.admin) {
      results = await API.getCertificatesByAdmin(props.admin.admin_id, offset, limit);
    }
    
    const newCertificates = [];
    const composeApprovers = (approvers) => {
      let names = '';
      for(const approver of approvers) {
        names = names + ` ,${approver.User.name}`;
      }

      return names.substring(2, names.length);
    }
    
    for (const result of results) {
      newCertificates.push({
        id: result.certificate_id,
        date: result.date,
        documentName: result.name,
        sendTo: result.User.name,
        signaturedBy: composeApprovers(result.CertificateSigners),
        status: "",
        scAddress: result.sc_address
      });
    }
    if (newCertificates.length > 0) {
      setCertificates(newCertificates);
    }
  }

  useEffect(() => {
    getAllCertificates(currentPage - 1, itemsPerPage);
  }, [step]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = certificates.slice(indexOfFirstPost, indexOfLastPost);

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
      case "certificateLogo":
        return certificateLogo;
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
        const text = htmlToText.fromString(value).replace(/(\r\n|\n|\r)/gm, "");
        status = text ? status : INPUT_STATUS.INVALID;
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
      case "certificateLogo":
        setCertificateLogo(value);
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

  const getDataToSign = (certificate) => {
    const { receiver_name, no, 
      title, description, score, date} = certificate;
    const descriptionText = htmlToText.fromString(description).replace(/(\r\n|\n|\r)/gm, "");
    const mergeCertificateData = receiver_name + no + title + descriptionText + score + date;
    return web3.utils.keccak256(mergeCertificateData)
  }

  const submit = async () => {
    const certificateHash = getDataToSign({
      receiver_name: receiverName.value,
      no: certificateNo.value, 
      title: certificateTitle.value,
      description: certificateDescription.value,
      score: certificateScore.value,
      date: certificateDate.value
    });

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
        gas: 1500000,
        gasPrice: '30000000000'
      });
      

      const certificate_signers = [];
      let index = 0;
      for (const assignToUser of assignToUsers) {
        certificate_signers.push({
          user_id: assignToUser.user_id,
          priority: index
        });
        index++;
      }

      API.addCertificate({
        admin_id: props.admin.admin_id,
        user_id: sendToUser.user_id,
        logo: certificateLogo,
        name: documentName.value,
        title: certificateTitle.value,
        no: certificateNo.value,
        description: certificateDescription.value,
        score: certificateScore.value,
        date: certificateDate.value,
        sc_address: res._address,
        receiver_name: receiverName.value,
        certificate_signers
      });

      await DigiCertContract.verify(res._address, [certificateHash, sendToPubKey.value, approvers]);
      
      createNotification({
        type: "success", 
        value: "Your certificate already on blockchain"});

        history.push(`/dashboard/${actor}?menu=manage-certificate`);
    } catch(e) {
      console.log(e);
      createNotification({
        type: "error",
        value: "Something went wrong"
      })
    } 
  }

  const onDelete = async () => {
    try {
      if (!web3.utils.isAddress(deleteSelectedData.scAddress)) {
        throw "Certificate not exist on blockchain";
      }
  
      const digicertContract = DigiCertContract.getNewInstance(deleteSelectedData.scAddress);
      const accounts = await web3.eth.getAccounts();
      createNotification({
        type: "info",
        value: "Please check your metamask"
      });
      await digicertContract.methods.dropCertificate().send({
        from: accounts[0],
        gas: await digicertContract.methods.dropCertificate().estimateGas({from: accounts[0]}),
        gasPrice: '100000000000'
      });
      createNotification({
        type: "success",
        value: `Drop certificate success`
      });
      getAllCertificates(currentPage - 1, itemsPerPage);
    } catch (e) {
      const message = typeof e === 'object' ? e.message : e;
      createNotification({
        type: "error",
        value: message
      });

    }
  }

  const resolveContent = () => {
    if (view) {
      return <ViewCertificate actor={actor} certificateId={certificateId}/>;
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
          return <CreateCertificate3 
          sendToUser={sendToUser} 
          assignToUsers={assignToUsers} 
          getInputValue={getInputValue}
          submit={submit}/>;
        default:
          return (
            <React.Fragment>
              {actor === ACTOR.ADMIN ?
              <div className="bef-table">
                <div className="btn-add-certificate">
                  <SubmitButton
                    buttonText={"Create Certificate"}
                    onClick={() => {
                      history.push(
                        `/dashboard/${actor}?menu=manage-certificate&create_certificate_step=1`
                      );
                    }}
                  ></SubmitButton>
                </div>
              </div> : <></>}
              <TableCertificate
                certificates={certificates}
                setIsDelete={setIsDelete}
                actor={actor}
              />
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItem={certificates.length}
                setCurrentPage={setCurrentPage}
                reloadFunction={getAllCertificates}
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
      <Delete delete={isDelete} setIsDelete={setIsDelete} del={onDelete} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin:  state.getIn(['actor', 'admin']).toJS(),
  user:  state.getIn(['actor', 'user']).toJS(),
  type: state.getIn(['actor', 'type'])
});

export default connect(mapStateToProps)(React.memo(withRouter(ManageCertificate)));
