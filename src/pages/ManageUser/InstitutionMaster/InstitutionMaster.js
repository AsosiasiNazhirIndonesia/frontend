import { withRouter } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableInstitution from "../../../components/Table/TableInstitution";
import AddEditInstitution from "./AddEditInstitution";
import DeleteInstitution from "./DeleteInstitution";
import "./InstitutionMaster.scss";

const InstitutionMaster = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};
  const openModal = () => {};
  const closeModal = () => {};
  const addInstitution = () => {
    console.log("Adding Institution");
  };
  return (
    <div className="institution-content">
      <div className="breadcrumb">
        <h1>Institution Master</h1>
      </div>
      <div className="bef-table">
        <div className="btn-add-institution">
          <SubmitButton buttonText={"Add Institution"}></SubmitButton>
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
      <TableInstitution />
    </div>
  );
};

export default withRouter(InstitutionMaster);
