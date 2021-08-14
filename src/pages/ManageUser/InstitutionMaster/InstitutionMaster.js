import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableInstitution from "../../../components/Table/TableInstitution";
import AddEditInstitution from "./AddEditInstitution";
import Delete from "../../../components/Popup/Delete";
import { useState } from "react";
import "./InstitutionMaster.scss";

const InstitutionMaster = (props) => {
  const value = {};

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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
      <TableInstitution setIsEdit={setIsEdit} setIsDelete={setIsDelete} />
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
