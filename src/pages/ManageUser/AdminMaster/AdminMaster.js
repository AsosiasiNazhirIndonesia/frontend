import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import "./AdminMaster.scss";
import React, { useEffect, useState } from "react";
import { history } from "../../../store";
import Delete from "../../../components/Popup/Delete";
import Pagination from "../../../components/elements/Pagination/Pagination";
import TableAdmin from "../../../components/Table/TableAdmin";
import API from "../../../services/api";
import ViewDataAdmin from "./ViewDataAdmin";
import AddEditAdmin from "./AddEditAdmin";
import { createNotification } from "../../../components/Notification/Notification";

const AdminMaster = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const getAllAdmins = async (offset, limit) => {
    const results = await API.getAllAdmins(offset, limit);
    if (results.length > 0) {
      setAdmins(results);
    }
  }

  const add = new URLSearchParams(props.location.search).get("add_user");
  const edit = new URLSearchParams(props.location.search).get("edit_user");
  const view = new URLSearchParams(props.location.search).get("view_user");

  useEffect(() => {
    getAllAdmins(currentPage - 1, itemsPerPage);
  }, [add, edit, view]);

  const resolveContent = () => {
    if (add || edit) {
      return <AddEditAdmin selectedAdmin={selectedAdmin} add={add} edit={edit} />;
    } else if (view) {
      return <ViewDataAdmin selectedAdmin={selectedAdmin} />;
    } else {
      return (
        <React.Fragment>
          <div className="bef-table">
            <div className="btn-add-user">
              <SubmitButton
                buttonText={"Add Admin"}
                onClick={() => {
                  history.push(`/dashboard/ADMIN?menu=admin-master&add_user=true`);
                }}
              ></SubmitButton>
            </div>
          </div>
          <TableAdmin 
            admins={admins} 
            setIsDelete={setIsDelete} 
            setSelectedAdmin={setSelectedAdmin}/>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItem={admins.length}
            setCurrentPage={setCurrentPage}
            reloadFunction={getAllAdmins}
          />
        </React.Fragment>
      );
    }
  };

  const resolveSubtitle = () => {
    if (add) {
      return <h6 className="breadcrumb-path"> Admin Master - Add Admin</h6>;
    } else if (edit) {
      return <h6 className="breadcrumb-path"> Admin Master - Edit Admin</h6>;
    } else if (view) {
      return <h6 className="breadcrumb-path"> Admin Master - View Admin</h6>;
    } else return <div></div>;
  };

  const subtitle = resolveSubtitle();
  const content = resolveContent();
  return (
    <div className="user-content">
      <div className="breadcrumb">
        <h1>Admin Master</h1>
        {subtitle}
      </div>
      {content}
    </div>
  );
};

export default withRouter(AdminMaster);
