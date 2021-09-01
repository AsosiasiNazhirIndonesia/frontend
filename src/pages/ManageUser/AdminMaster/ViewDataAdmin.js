import React from "react";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import { HOST } from "../../../services/api";
import { history } from "../../../store";
import "./ViewDataAdmin.scss";

const ViewDataAdmin = (props) => {
  return (
    <React.Fragment>
      <form className="form-base-information">
        <div>
          <p className="title-name">Full Name :</p>
          <span className="name">{props.selectedAdmin.name}</span>
        </div>
        <div>
          <p className="title-email">Public Key :</p>
          <span className="email">{props.selectedAdmin.public_key}</span>
        </div>
        <div>
          <p className="title-email">Email :</p>
          <span className="email">{props.selectedAdmin.email}</span>
        </div>
        <div>
          <p className="title-phoneNumber">Phone Number :</p>
          <span className="phoneNumber">{props.selectedAdmin.phone_number}</span>
        </div>
        <div>
          <p className="title-photo">Photo :</p>
          <img src={props.selectedAdmin.photo ? `${HOST}/api/files/${props.selectedAdmin.photo}` : '#'} alt="photo profile"></img>
        </div>
      </form>
      <form className="form-role-information">
        <div>
          <p className="title-role">Admin Role :</p>
          <span className="role">{props.selectedAdmin.admin_role}</span>
        </div>
      </form>
      {props.selectedAdmin.Institution ?
        <form className="form-institution-information">
          <div>
            <p className="title-institution">Institution :</p>
            <span className="institution">{props.selectedAdmin.Institution.name}</span>
          </div>
        </form> : <></>}
      <div className="btn-back">
        <SubmitButton
          buttonText="Back"
          onClick={() => history.push("/dashboard/ADMIN?menu=admin-master")}
        />
      </div>
    </React.Fragment>
  );
};

export default ViewDataAdmin;
