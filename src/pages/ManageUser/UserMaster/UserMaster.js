import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableUser from "../../../components/Table/TableUser";
import "./UserMaster.scss";
import React, { useState } from "react";
import { history } from "../../../store";
import AddEditUser from "./AddEditUser";
import ViewDataUser from "./ViewDataUser";
import Delete from "../../../components/Popup/Delete";

const UserMaster = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const add = new URLSearchParams(props.location.search).get("add_user");
  const edit = new URLSearchParams(props.location.search).get("edit_user");
  const view = new URLSearchParams(props.location.search).get("view_user");
  const value = {};
  const resolveContent = () => {
    if (add || edit) {
      return <AddEditUser />;
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
                  history.push("/dashboard?menu=user-master&add_user=true");
                }}
              ></SubmitButton>
            </div>
            <div className="search-input">
              <InputField
                type="text"
                name="search-input"
                placeholder="Search User Name"
                value={value}
              />
            </div>
          </div>
          <TableUser setIsDelete={setIsDelete} />
        </React.Fragment>
      );
    }
  };

  const resolveSubtitle = () => {
    if (add) {
      return <h6 className="breadcrumb-path"> User Master - Add User</h6>;
    } else if (edit) {
      return <h6 className="breadcrumb-path"> User Master - Edit User</h6>;
    } else if (view) {
      return <h6 className="breadcrumb-path"> User Master - View User</h6>;
    } else return <div></div>;
  };

  const subtitle = resolveSubtitle();
  const content = resolveContent();
  return (
    <div className="user-content">
      <div className="breadcrumb">
        <h1>User Master</h1>
        {subtitle}
      </div>
      {content}
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};

export default withRouter(UserMaster);
