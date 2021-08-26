import { withRouter } from "react-router-dom";
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

const RoleMaster = (props) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [roles, setRoles] = useState([]);

  const getAllRoles = async (offset, limit) => {
    const results = await API.getAllRoles(offset, limit);
    const newRoles = [];
    for (const result of results) {
      newRoles.push({
        id: result.role_id,
        roleName: result.name,
        description: result.description,
      });
    }
    if (newRoles.length > 0) {
      setRoles(newRoles);
    }
  };

  useEffect(() => {
    getAllRoles(currentPage - 1, itemsPerPage);
  }, []);

  // const submit = async () => {
  // const certificateHash = getDataToSign({
  //   receiver_name: receiverName.value,
  //   no: certificateNo.value,
  //   title: certificateTitle.value,
  //   description: certificateDescription.value,
  //   score: certificateScore.value,
  //   date: certificateDate.value
  // });

  // let approvers = [];
  // for (const assignToPubKey of assignToPubKeys) {
  //   approvers.push(assignToPubKey.value);
  // }

  // const tx = DigitalCertificate.deploy(certificateHash, sendToPubKey.value, approvers);
  // const accounts = await web3.eth.getAccounts();
  // try {
  //   createNotification({
  //     type: "info",
  //     value:
  //       "Please check your metamask and stay on this page until certificate has been deployed to blockchain",
  //   });
  // const res = await tx.send({
  //   from: accounts[0],
  //   gas: 3000000,
  //   gasPrice: '100000000000'
  // });

  // const certificate_signers = [];
  // let index = 0;
  // for (const assignToUser of assignToUsers) {
  //   certificate_signers.push({
  //     user_id: assignToUser.user_id,
  //     priority: index
  //   });
  //   index++;
  // }

  //     API.addRole({
  //       id: props.role_id,
  //       roleName: props.name,
  //       description: props.description,
  //     });

  //     createNotification({
  //       type: "success",
  //       value: "Your certificate already on blockchain",
  //     });

  //     history.push(`/dashboard/${actor}?menu=manage-certificate`);
  //   } catch (e) {
  //     console.log(e);
  //     createNotification({
  //       type: "error",
  //       value: "Something went wrong",
  //     });
  //   }
  // };
  const value = {};

  // const getInputValue = (key) => {
  //   switch (key) {
  //     case "roleId":
  //       return roleId;
  //     case "roleName":
  //       return roleName;
  //     case "description":
  //       return description;
  //   }
  // };

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
      <TableRole
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
        add={isAdd}
        edit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
        // getInputValue={getInputValue}
      />
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};

export default withRouter(RoleMaster);
