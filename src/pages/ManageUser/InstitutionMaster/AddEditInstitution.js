import { useState } from "react";
import InputField from "../../../components/elements/InputField/InputField";
import "./AddEditInstitution.scss";

const AddEditInstitution = (props) => {
  if (props.add) {
    return (
      <div className="modal-container">
        <div className="modal-box-institution">
          <h1>Add Institution</h1>
          <div className="institution-name">
            <p>
              Institution Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-name-input"
              placeholder="Institution Name"
              value={props.getInputValue("institutionName")}
              onChange={(e) =>
                props.setInputValue("institutionName", e.target.value)
              }
            />
          </div>
          <div className="institution-email">
            <p>
              Institution Email <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-email-input"
              placeholder="Institution Email"
              value={props.getInputValue("email")}
              onChange={(e) => props.setInputValue("email", e.target.value)}
            />
          </div>
          <div className="institution-phoneNumber">
            <p>
              Institution Phone Number <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-phoneNumber-input"
              placeholder="Institution Phone Number"
              value={props.getInputValue("phoneNumber")}
              onChange={(e) =>
                props.setInputValue("phoneNumber", e.target.value)
              }
            />
          </div>
          <div className="institution-address">
            <p>
              Institution Address <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-address"
              placeholder="Institution Address"
              value={props.getInputValue("address")}
              onChange={(e) => props.setInputValue("address", e.target.value)}
            />
          </div>
          <div className="institution-type">
            <p>
              Institution Type <font color="red">*</font>
            </p>
            <InputField 
              value={props.getInputValue("type")}
              type="dropdown" 
              onChange={(value) => props.setInputValue("type", value.value)} 
              options={['UNIVERSITY','COMPANY']} />
          </div>
          <div className="btn-group">
            <button
              className="btn-cancel"
              onClick={() => props.setIsAdd(false)}
            >
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={async () => {
                await props.submit();
                props.setIsAdd(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  } else if (props.edit) {
    return (
      <div className="modal-container">
        <div className="modal-box-institution">
          <h1>Edit Institution</h1>
          <div className="institution-name">
            <p>
              Institution Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="Institution Name"
              placeholder="Institution Name"
              value={props.getInputValue("institutionName")}
              onChange={(e) =>
                props.setInputValue("institutionName", e.target.value)
              }
            />
          </div>
          <div className="institution-email">
            <p>
              Institution Email <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-email-input"
              placeholder="Institution Email"
              value={props.getInputValue("email")}
              onChange={(e) => props.setInputValue("email", e.target.value)}
            />
          </div>
          <div className="institution-phoneNumber">
            <p>
              Institution Phone Number <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-phoneNumber-input"
              placeholder="Institution Phone Number"
              value={props.getInputValue("phoneNumber")}
              onChange={(e) =>
                props.setInputValue("phoneNumber", e.target.value)
              }
            />
          </div>
          <div className="institution-address">
            <p>
              Institution Address <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-address"
              placeholder="Institution Address"
              value={props.getInputValue("address")}
              onChange={(e) => props.setInputValue("address", e.target.value)}
            />
          </div>
          <div className="institution-type">
            <p>
              Institution Type <font color="red">*</font>
            </p>
            <InputField 
              value={props.getInputValue("type")}
              type="dropdown" 
              onChange={(value) => props.setInputValue("type", value.value)} 
              options={['UNIVERSITY','COMPANY']} />
          </div>
          <div className="btn-group">
            <button
              className="btn-cancel"
              onClick={() => props.setIsEdit(false)}
            >
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={async () => {
                await props.update();
                props.setIsEdit(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default AddEditInstitution;
