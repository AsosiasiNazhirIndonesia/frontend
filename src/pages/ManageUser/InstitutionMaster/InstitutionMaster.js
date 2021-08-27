import { useParams, withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
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
      });
    }
    if (newInstitutions.length > 0) {
      setInstitutions(newInstitutions);
    }
  };

  const submit = async () => {
    try {
      API.addInstitution({
        name: institutionName.value,
        email: email.value,
        phone_number: phoneNumber.value,
        address: address.value,
        type: "UNIVERSITY",
      });
      createNotification({
        type: "success",
        value: "Your institution already on blockchain",
      });
      history.push(`/dashboard/${actor}?menu=institution-master`);
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
      API.updateInstitution({
        institution_id: institutionId.value,
        name: institutionName.value,
        email: email.value,
        phone_number: phoneNumber.value,
        address: address.value,
        type: "UNIVERSITY",
      });
      createNotification({
        type: "success",
        value: "Your institution updated on blockchain",
      });
      history.push(`/dashboard/${actor}?menu=institution-master`);
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
    }
  };

  const setInputValue = (key, value) => {
    let status =
      value && value != "" ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;

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
    }
  };

  return (
    <div className="institution-content">
      <div className="breadcrumb">
        <h1>Institution Master</h1>
      </div>
      <div className="bef-table">
        <div className="btn-add-institution">
          <SubmitButton
            buttonText={"Add Institution"}
            onClick={() => setIsAdd(true)}
          ></SubmitButton>
        </div>
        <div className="search-input">
          <InputField
            type="text"
            name="search-input"
            placeholder="Search Institution Name"
            value={value}
          />
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
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};

export default withRouter(InstitutionMaster);
