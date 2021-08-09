import { withRouter } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableUser from "../../../components/Table/TableUser";
import DeleteUser from "./DeleteUser";
import "./UserMaster.scss";

const UserMaster = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};
  const openModal = () => {};
  const closeModal = () => {};
  const addUser = () => {
    console.log("Adding User");
  };
  return (
    <div className="user-master">
      <Header />
      <div className="user-body">
        <Sidebar menu={menu} />
        <div className="user-content">
          <div className="breadcrumb">
            <h1>User Master</h1>
            {/* breadcrumb path dibuat dinamic sesuai path yang diakses */}
            <h6 className="breadcrumb-path">
              User Master - Add/Edit/View User
            </h6>
            {/*  */}
          </div>
          <div className="bef-table">
            <div className="btn-add-user">
              <SubmitButton buttonText={"Add User"}></SubmitButton>
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
          <TableUser />
        </div>
        )
      </div>
      <DeleteUser />
    </div>
  );
};

export default withRouter(UserMaster);
