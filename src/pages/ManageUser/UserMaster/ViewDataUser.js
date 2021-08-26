import React from "react";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import { history } from "../../../store";
import "./ViewDataUser.scss";

const ViewDataUser = (props) => {
  return (
    <React.Fragment>
      <form className="form-base-information">
        <div>
          <p className="title-name">Full Name :</p>
          <span className="name">Anggi Nur Dhamayanty</span>
        </div>
        <div>
          <p className="title-email">Email :</p>
          <span className="email">Nuranggie@gmail.co.id</span>
        </div>
        <div>
          <p className="title-phoneNumber">Phone Number :</p>
          <span className="phoneNumber">08123456789</span>
        </div>
        <div>
          <p className="title-photo">Photo :</p>
          <img src="#" alt="photo profile"></img>
        </div>
      </form>
      <form className="form-role-information">
        <div>
          <p className="title-role">Role :</p>
          <span className="role">Student</span>
        </div>
      </form>
      <form className="form-institution-information">
        <div>
          <p className="title-institution">Institution :</p>
          <span className="institution">Politeknik Negeri Bandung</span>
        </div>
      </form>
      <div className="btn-back">
        <SubmitButton
          buttonText="Back"
          onClick={() => history.push("/dashboard/ADMIN?menu=user-master")}
        />
      </div>
    </React.Fragment>
  );
};

export default ViewDataUser;
