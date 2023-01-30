import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import TableUser from "../../../components/Table/TableUser";
import "./UserMaster.scss";
import React, { useEffect, useState } from "react";
import { history } from "../../../store";
import AddEditUser from "./AddEditUser";
import ViewDataUser from "./ViewDataUser";
import Pagination from "../../../components/elements/Pagination/Pagination";
import API from "../../../services/api";

const UserMaster = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const getAllUsers = async (offset, limit) => {
    setUsers(await API.getAllUsers(offset, limit));
  }

  const add = new URLSearchParams(props.location.search).get("add_user");
  const edit = new URLSearchParams(props.location.search).get("edit_user");
  const view = new URLSearchParams(props.location.search).get("view_user");

  useEffect(() => {
    getAllUsers(currentPage - 1, itemsPerPage);
  }, [add, edit]);

  const resolveContent = () => {
    if (add || edit) {
      return <AddEditUser add={add} edit={edit} selectedUser={selectedUser} />;
    } else if (view) {
      return <ViewDataUser />;
    } else {
      return (
        <React.Fragment>
          <div className="bef-table">
            <div className="btn-add-user">
              <SubmitButton
                buttonText={"Add User"}
                onClick={() => {
                  history.push(`/dashboard/ADMIN?menu=user-master&add_user=true`);
                }}
              ></SubmitButton>
            </div>
          </div>
          <TableUser 
            users={users}
            setSelectedUser={setSelectedUser} 
            setIsDelete={setIsDelete} 
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItem={users.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            reloadFunction={getAllUsers}
          />
        </React.Fragment>
      );
    }
  };

  const resolveSubtitle = () => {
    if (add) {
      return <h6 className="breadcrumb-path"> Manage User - Add User</h6>;
    } else if (edit) {
      return <h6 className="breadcrumb-path"> Manage User - Edit User</h6>;
    } else if (view) {
      return <h6 className="breadcrumb-path"> Manage User - View User</h6>;
    } else return <div></div>;
  };

  const subtitle = resolveSubtitle();
  const content = resolveContent();
  return (
    <div className="user-content">
      <div className="breadcrumb">
        <h1>Manage User</h1>
        {subtitle}
      </div>
      {content}
    </div>
  );
};

export default withRouter(UserMaster);
