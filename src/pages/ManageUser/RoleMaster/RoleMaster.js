import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableRole from "../../../components/Table/TableRole";
import AddEditRole from "./AddEditRole";
import Delete from "../../../components/Popup/Delete";
import "./RoleMaster.scss";
import { useState } from "react";

const RoleMaster = (props) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const value = {};
  return (
    <div className="role-content">
      <div className="breadcrumb">
        <h1>Role Master</h1>
      </div>
      <div className="bef-table">
        <div className="btn-add-role">
          {/* <button onClick={addRole}>Add Role</button> */}
          <SubmitButton
            buttonText={"Add Role"}
            onClick={() => setIsAdd(true)}
          ></SubmitButton>
        </div>
        <div className="search-input">
          <InputField
            type="text"
            name="search-input"
            placeholder="Search Role Name"
            value={value}
          />
        </div>
      </div>
      <TableRole setIsEdit={setIsEdit} setIsDelete={setIsDelete} />
      <AddEditRole
        add={isAdd}
        edit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
      />
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};

export default withRouter(RoleMaster);
