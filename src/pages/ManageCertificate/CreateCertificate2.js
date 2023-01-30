import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import "./CreateCertificate2.scss";
import { history } from "../../store";
import React from "react";
import { Link } from "react-router-dom";
import { INPUT_STATUS } from "../../constants/component.constant";
import API from "../../services/api";

const CreateCertificate2 = (props) => {
  const loadAssignToUsers = async (publicKey, index) => {
    const user = await API.getUserByPublicKey(publicKey);
    props.assignToUsers[index] = user ? user : {};
    props.setAssignToUsers([...props.assignToUsers]);
    const status = user ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;
    props.assignToPubKeys[index] = {
      status: status,
      value: publicKey,
      errorMessage: status === INPUT_STATUS.INVALID && !user ? 'user not found' : ''
    }
    props.setAssignToPubKeys([...props.assignToPubKeys]);
  }

  const setAssignToPubKeys = (value, index) => {
    let status = INPUT_STATUS.INVALID;
    if (value.length === 42) {
      loadAssignToUsers(value, index);
      status = INPUT_STATUS.VALID;
    } else {
      props.assignToUsers[index] = {};
      props.setAssignToUsers([...props.assignToUsers]);
    }

    props.assignToPubKeys[index] = {
      status: INPUT_STATUS.INVALID,
      value: value,
      errorMessage: status === INPUT_STATUS.INVALID ? 'public key length must be 42 characters' : ''
    }
    props.setAssignToPubKeys([...props.assignToPubKeys]);
  }

  const addAssignToInputs = () => {
    props.assignToPubKeys.push({status: INPUT_STATUS.INIT, value: '', errorMessage: ''});
    props.assignToUsers.push({});
    props.setAssignToPubKeys([...props.assignToPubKeys]);
    props.setAssignToUsers([...props.assignToUsers]);
  }

  const deleteAssignToInputs = () => {
    props.assignToPubKeys.pop();
    props.assignToUsers.pop();
    props.setAssignToPubKeys([...props.assignToPubKeys]);
    props.setAssignToUsers([...props.assignToUsers]);
  }

  const goToProfile = (e, pubKey) => {
    e.preventDefault();
    window.open(`/profile?actor_type=USER&actor_public_key=${pubKey}`, "_blank");
  }

  const disabledSubmitBtn = () => {
    let disabled = false;
    if (props.getInputValue('sendToPubKey').status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else {
      for(const assignToPubKey of props.assignToPubKeys) {
        if (assignToPubKey.status !== INPUT_STATUS.VALID) {
          disabled = true;
          break;
        }
      }
    }

    return disabled;
  }


  return (
    <React.Fragment>
      <form className="form-sendTo">
        <div className="sendTo-input">
          <p>Awarded to</p>
          <InputField
            type="text"
            name="search-input"
            placeholder="Public key"
            value={props.getInputValue('sendToPubKey')}
            onChange={(e) => props.setInputValue('sendToPubKey', e.target.value)}
          ></InputField>
          {props.sendToUser.user_id ?
          <span>Name: <Link to="" onClick={(e) => goToProfile(e, props.sendToUser.public_key)}>{props.sendToUser.name}</Link></span> :
          <></>}
        </div>
      </form>
      <div className="form-assignTo">
        <div className="assignTo-input">
          <p>Signers</p>
          {props.assignToPubKeys.map((assignToPubKey, key) => {
            return (
            <div className="assignTo-input-item">
              <InputField
                key={key}
                type="text"
                name="search-input"
                placeholder="Public key"
                value={props.assignToPubKeys[key]}
                onChange={(e) => setAssignToPubKeys(e.target.value, key)}
              ></InputField>
              {props.assignToUsers[key].user_id ?
                <span>Name: <Link to="" onClick={(e) => goToProfile(e, props.assignToUsers[key].public_key)}>{props.assignToUsers[key].name}</Link></span> :
                <></>}
            </div>
            );
          })}
        </div>
        <div className="btn-add-user">
          <SubmitButton buttonText="Add Signer" onClick={() => addAssignToInputs()}></SubmitButton>
          {props.assignToPubKeys.length > 1 ? 
            <div className="btn-delete-user">
              <SubmitButton className="delete-btn" buttonText="Delete User" onClick={() => deleteAssignToInputs()}></SubmitButton>
            </div> :
            <></>}
        </div>
      </div>
      <div className="btn-back-next">
        <div className="btn-back">
          <SubmitButton
            buttonText="Back"
            onClick={() => {
              history.push(
                "/dashboard/ADMIN?menu=manage-certificate&create_certificate_step=1"
              );
            }}
          ></SubmitButton>
        </div>
        <div className="btn-next">
          <SubmitButton
            buttonText="Next"
            disabled={disabledSubmitBtn()}
            onClick={() => {
              history.push(
                "/dashboard/ADMIN?menu=manage-certificate&create_certificate_step=3"
              );
            }}
          ></SubmitButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCertificate2;
