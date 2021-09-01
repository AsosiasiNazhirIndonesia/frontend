import { useParams, withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableRole from "../../../components/Table/TableRole";
import AddEditRole from "./AddEditRole";
import Delete from "../../../components/Popup/Delete";
import Pagination from "../../../components/elements/Pagination/Pagination";
import API from "../../../services/api";
import { createNotification } from "../../../components/Notification/Notification";
import "./RoleMaster.scss";
import { useState, useEffect } from "react";
import { history } from "../../../store";
import { INPUT_STATUS } from "../../../constants/component.constant";

const RoleMaster = (props) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState({
    value: "",
  });
  const [roleName, setRoleName] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [description, setDescription] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });

  const getAllRoles = async (offset, limit) => {
    const results = await API.getAllRoles(offset, limit);
    const newRoles = [];
    for (const result of results) {
      newRoles.push({
        id: result.role_id,
        roleName: result.name,
        description: result.description,
        deletedDate: result.deleted_date,
      });
    }
    if (newRoles.length > 0) {
      setRoles(newRoles);
    }
  };

  useEffect(() => {
    getAllRoles(currentPage - 1, itemsPerPage);
  }, []);

  const submit = async () => {
    try {
      await API.addRole({
        name: roleName.value,
        description: description.value,
      });
      createNotification({
        type: "success",
        value: "Create role success",
      });
      getAllRoles(currentPage - 1, itemsPerPage);
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
      await API.updateRole({
        role_id: roleId.value,
        name: roleName.value,
        description: description.value,
      });
      createNotification({
        type: "success",
        value: "Update role success",
      });
      getAllRoles(currentPage - 1, itemsPerPage);
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
      await API.deleteRole({
        role_id: roleId.value,
      });
      createNotification({
        type: "success",
        value: "Delete role success",
      });
      getAllRoles(currentPage - 1, itemsPerPage);
    } catch (e) {
      console.log(e);
      createNotification({
        type: "error",
        value: "Something went wrong",
      });
    }
  };
  const value = {};

  const getInputValue = (key) => {
    switch (key) {
      case "roleId":
        return roleId;
      case "roleName":
        return roleName;
      case "description":
        return description;
    }
  };

  const setInputValue = (key, value) => {
    let status =
      value && value != "" ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;

    switch (key) {
      case "roleId":
        setRoleId({
          value: value,
        });
        break;
      case "roleName":
        setRoleName({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
      case "description":
        setDescription({
          status,
          value: value,
          errorMessage: status === INPUT_STATUS.INVALID ? "required field" : "",
        });
        break;
    }
  };

  return (
    <div className="role-content">
      <div className="breadcrumb">
        <h1>Role Master</h1>
      </div>
      <div className="bef-table">
        <div className="btn-add-role">
          <SubmitButton
            buttonText={"Add Role"}
            onClick={() => setIsAdd(true)}
          ></SubmitButton>
        </div>
      </div>
      <TableRole
        setInputValue={setInputValue}
        roles={roles}
        setIsEdit={setIsEdit}
        setIsDelete={setIsDelete}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItem={roles.length}
        setCurrentPage={setCurrentPage}
        reloadFunction={getAllRoles}
      />
      <AddEditRole
        getInputValue={getInputValue}
        setInputValue={setInputValue}
        add={isAdd}
        edit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
        submit={submit}
        update={update}
      />
      <Delete delete={isDelete} setIsDelete={setIsDelete} del={del} />
    </div>
  );
};

export default withRouter(RoleMaster);
