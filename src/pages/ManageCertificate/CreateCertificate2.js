import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import "./CreateCertificate2.scss";
import { history } from "../../store";
import React from "react";

const CreateCertificate2 = (props) => {
  const value = {};
  return (
    <React.Fragment>
      <div className="sign-progress">
        <h3>Progress Bar :</h3>
      </div>
      <form className="form-sendTo">
        <div className="sendTo-input">
          <p>Send to</p>
          <InputField
            type="text"
            name="search-input"
            placeholder="Search User"
            value={value}
          ></InputField>
        </div>
      </form>
      <form className="form-assignTo">
        <div className="assignTo-input">
          <p>Assign To</p>
          <InputField
            type="text"
            name="search-input"
            placeholder="Search User"
            value={value}
          ></InputField>
          <InputField
            type="text"
            name="search-input"
            placeholder="Search User"
            value={value}
          ></InputField>
        </div>
        <div className="btn-add-user">
          <SubmitButton buttonText="Add User"></SubmitButton>
        </div>
      </form>
      <div className="btn-back-next">
        <div className="btn-back">
          <SubmitButton
            buttonText="Back"
            onClick={() => {
              history.push(
                "/dashboard?menu=manage-certificate&create_certificate_step=1"
              );
            }}
          ></SubmitButton>
        </div>
        <div className="btn-next">
          <SubmitButton
            buttonText="Next"
            onClick={() => {
              history.push(
                "/dashboard?menu=manage-certificate&create_certificate_step=3"
              );
            }}
          ></SubmitButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCertificate2;
