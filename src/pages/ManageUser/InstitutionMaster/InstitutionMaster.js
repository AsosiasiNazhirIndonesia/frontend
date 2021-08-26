import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableInstitution from "../../../components/Table/TableInstitution";
import AddEditInstitution from "./AddEditInstitution";
import Delete from "../../../components/Popup/Delete";
import Pagination from "../../../components/elements/Pagination/Pagination";
import { useEffect, useState } from "react";
import "./InstitutionMaster.scss";
import API from "../../../services/api";

const InstitutionMaster = (props) => {
  const value = {};

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [institutions, setInstitutions] = useState([]);

  const getAllInstitutions = async (offset, limit) => {
    const results = await API.getAllInstitutions(offset, limit);
    const newRoles = [];
    for (const result of results) {
      newRoles.push({
        id: result.institution_id,
        institutionName: result.name,
        email: result.email,
        phoneNumber: result.phone_number,
        address: result.address,
      });
    }
    if (newRoles.length > 0) {
      setInstitutions(newRoles);
    }
  };

  useEffect(() => {
    getAllInstitutions(currentPage - 1, itemsPerPage);
  }, []);

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
      />
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};

export default withRouter(InstitutionMaster);
