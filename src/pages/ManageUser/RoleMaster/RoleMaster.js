import { withRouter } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import Table from "../../../components/Table/Table";
import AddEditRole from "./AddEditRole";
import DeleteRole from "./DeleteRole";
import "./RoleMaster.scss";

const RoleMaster = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};
  const openModal = () => {};
  const closeModal = () => {};
  const addRole = () => {
    console.log("Adding Role");
  };
  return (
    <div className="role-master">
      <Header />
      <div className="role-body">
        <Sidebar menu={menu} />
        <div className="role-content">
          <div className="breadcrumb">
            <h1>Role Master</h1>
          </div>
          <div className="bef-table">
            <div className="btn-add-role">
              {/* <button onClick={addRole}>Add Role</button> */}
              <SubmitButton buttonText={"Add Role"}></SubmitButton>
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
          <Table />
        </div>
        )
      </div>
      <AddEditRole />
      <DeleteRole />
    </div>
  );
};

export default withRouter(RoleMaster);
