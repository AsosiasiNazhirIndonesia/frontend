import { useParams, withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import TableInstitution from "../../../components/Table/TableInstitution";
import AddEditInstitution from "./AddEditInstitution";
import Delete from "../../../components/Popup/Delete";
import Pagination from "../../../components/elements/Pagination/Pagination";
import { useEffect, useState } from "react";
import "./InstitutionMaster.scss";
import API from "../../../services/api";
import { INPUT_STATUS } from "../../../constants/component.constant";
import { createNotification } from "../../../components/Notification/Notification";
import { history } from "../../../store";
import web3 from "../../../services/web3";
import CertificateSetFactory from "../../../contracts/digital_certificate_factory";

const InstitutionMaster = (props) => {
  const value = {};

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [institutions, setInstitutions] = useState([]);
  const [institutionId, setInstitutionId] = useState({
    value: "",
  });
  const [institutionName, setInstitutionName] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [email, setEmail] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [phoneNumber, setPhoneNumber] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [address, setAddress] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [type, setType] = useState({
    status: INPUT_STATUS.INIT,
    value: "UNIVERSITY",
    errorMessage: "",
  });
  const actor = useParams().actor;

  const getAllInstitutions = async (offset, limit) => {
    const results = await API.getAllInstitutions(offset, limit);
    const newInstitutions = [];
    for (const result of results) {
      newInstitutions.push({
        id: result.institution_id,
        institutionName: result.name,
        email: result.email,
        phoneNumber: result.phone_number,
        address: result.address,
        type: result.type,
        deletedDate: result.deleted_date,
      });
    }
    if (newInstitutions.length > 0) {
      setInstitutions(newInstitutions);
    }
  };

  const submit = async () => {
    try {
      
      const certificateSetFactory = CertificateSetFactory.getNewInstance('0xF595439D6c19cBc441e358CBD71799125724EA11');//'0xfBEce0ED5143A6778a5DdFED685dCa33AC4c0B4e');
      const accounts = await web3.eth.getAccounts();
      const tx = certificateSetFactory.methods.createCertificateSet(accounts[0], institutionName.value);

      createNotification({
        type: "Deploy...", 
        value: "Please check your metamask and stay on this page until new smartcontract is deployed for this Institution"});

      const res = await tx.send({
        from: accounts[0],
        gas: 3000000,
        gasPrice: '30000000000'
      });

      const contractAddresses = await certificateSetFactory.methods.certificateSets().call();
      const institutionContractAddress = contractAddresses[contractAddresses.length-1];

      await API.addInstitution({
        name: institutionName.value,
        email: email.value,
        phone_number: phoneNumber.value,
        address: address.value,
        type: type.value,
        sc_address: institutionContractAddress,
      });
      createNotification({
        type: "success",
        value: "Create institution success",
      });
      getAllInstitutions(currentPage - 1, itemsPerPage);
    } catch (e) {
      console.log(e);
      createNotification({
        type: "error",
        value: "Something went wrong",
      });
    }
  };

  const update = async () => {
    try {
      await API.updateInstitution({
        institution_id: institutionId.value,
        name: institutionName.value,
        email: email.value,
        phone_number: phoneNumber.value,
        address: address.value,
        type: type.value,
      });
      createNotification({
        type: "success",
        value: "Update institution success",
      });
      getAllInstitutions(currentPage - 1, itemsPerPage);
    } catch (e) {
      console.log(e);
      createNotification({
        type: "error",
        value: "Something went wrong",
      });
    }
  };

  const del = async () => {
    try {
      await API.deleteInstitution({
        institution_id: institutionId.value,
      });
      createNotification({
        type: "success",
        value: "Delete institution success",
      });
      getAllInstitutions(currentPage - 1, itemsPerPage);
    } catch (e) {
      console.log(e);
      createNotification({
        type: "error",
        value: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    getAllInstitutions(currentPage - 1, itemsPerPage);
  }, []);

  const getInputValue = (key) => {
    switch (key) {
      case "institutionId":
        return institutionId;
      case "institutionName":
        return institutionName;
      case "email":
        return email;
      case "phoneNumber":
        return phoneNumber;
      case "address":
        return address;
      case "type":
        return type;
    }
  };

  const setInputValue = (key, value, setStatus) => {
    let status =
      !setStatus ? value && value != "" ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID : setStatus;

    switch (key) {
      case "institutionId":
        setInstitutionId({
          value: value,
        });
        break;
      case "institutionName":
        setInstitutionName({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "email":
        setEmail({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "phoneNumber":
        setPhoneNumber({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "address":
        setAddress({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "type":
        setType({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
    }
  };

  const openAddModal = () => {
    setInputValue("institutionId", '', INPUT_STATUS.INIT);
    setInputValue("institutionName", '', INPUT_STATUS.INIT);
    setInputValue("email", '', INPUT_STATUS.INIT);
    setInputValue("phoneNumber", '', INPUT_STATUS.INIT);
    setInputValue("address", '', INPUT_STATUS.INIT);
    setInputValue("type", 'UNIVERSITY', INPUT_STATUS.INIT);
    setIsAdd(true);
  }

  return (
    <div className="institution-content">
      <div className="breadcrumb">
        <h1>Institution Master</h1>
      </div>
      <div className="bef-table">
        <div className="btn-add-institution">
          <SubmitButton
            buttonText={"Add Institution"}
            onClick={() => openAddModal()}
          ></SubmitButton>
        </div>
      </div>
      <TableInstitution
        setInputValue={setInputValue}
        institutions={institutions}
        setIsEdit={setIsEdit}
        setIsDelete={setIsDelete}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItem={institutions.length}
        setCurrentPage={setCurrentPage}
        reloadFunction={getAllInstitutions}
      />
      <AddEditInstitution
        add={isAdd}
        edit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
        submit={submit}
        update={update}
        getInputValue={getInputValue}
        setInputValue={setInputValue}
      />
      <Delete delete={isDelete} setIsDelete={setIsDelete} del={del} />
    </div>
  );
};

export default withRouter(InstitutionMaster);
