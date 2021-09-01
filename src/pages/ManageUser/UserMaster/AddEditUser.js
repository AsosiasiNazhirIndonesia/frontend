import { faExclamationCircle, faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../../../components/elements/InputField/InputField";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import { INPUT_STATUS } from "../../../constants/component.constant";
import API from "../../../services/api";
import web3 from "../../../services/web3";
import "./AddEditUser.scss";

const AddEditUser = (props) => {
  const [isProcessing, setProcessing] = useState(false);
  const [name, setName] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [email, setEmail] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [phoneNumber, setPhoneNumber] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [originalFileName, setOriginalFileName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [publicKey, setPublicKey] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [userHistories, setUserHistories] = useState([
    {
      institution: {},
      institutionInput: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      role: {},
      roleInput: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      startDate: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      endDate: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      isStillWorking: false
    }
  ]);
  const [inputFilled, setInputFilled] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [roles, setRoles] = useState([]);

  const getAllInstitutions = async () => {
    if (institutions.length <= 0) {
      setInstitutions(await API.getAllInstitutions(0, 100));
    }
  }

  const getAllRoles = async () => {
    if (roles.length <= 0) {
      setRoles(await API.getAllRoles(0, 100));
    }
  }

  useEffect(() => {
    getAllInstitutions();
    getAllRoles();
  }, []);

  const fillInput = () => {
    if (inputFilled) {
      return;
    }

    setName({status: INPUT_STATUS.VALID, value: props.selectedAdmin.name});
    setEmail({status: INPUT_STATUS.VALID, value: props.selectedAdmin.email});
    setPhoneNumber({status: INPUT_STATUS.VALID, value: props.selectedAdmin.phone_number});
    setPublicKey({status: INPUT_STATUS.VALID, value: props.selectedAdmin.public_key});
    setInputFilled(true);
  }

  const onChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    let status = inputValue && inputValue !== '' ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;
    let errorMessage = status === INPUT_STATUS.INVALID ? `this data is required` : '';

    switch(inputName) {
      case "name":
        setName({
          status,
          errorMessage,
          value: inputValue
        });
        break;
      case "publickey":
        if (!web3.utils.isAddress(inputValue)) {
          status = INPUT_STATUS.INVALID;
          errorMessage = 'Invalid public key format';
        }
        setPublicKey({
          status,
          errorMessage,
          value: inputValue
        });
        break;
      case "email":
        setEmail({
          status,
          errorMessage,
          value: inputValue
        });
        break;
      case "phonenumber":
        setPhoneNumber({
          status,
          errorMessage,
          value: inputValue
        });
        break;
    }
  }

  const onUpload = async (e) => {
    setProcessing(true);
    const result = await API.uploadFile(e.target.files[0]);
    setOriginalFileName(e.target.files[0].name);
    setPhoto(result.filename);
    setProcessing(false);
  }

  const onSelectInstitution = async (key, val) => {
    userHistories[key].institution = institutions.find((institution) => {
      return institution.institution_id === val.value;
    });
    userHistories[key].institutionInput = {
      status: INPUT_STATUS.VALID,
      value: userHistories[key].institution.name
    }
    setUserHistories([...userHistories]);
  }

  const onSelectRole = async (key, val) => {
    userHistories[key].role = roles.find((role) => {
      return role.role_id === val.value;
    });
    userHistories[key].roleInput = {
      status: INPUT_STATUS.VALID,
      value: userHistories[key].role.name
    }
    setUserHistories([...userHistories]);
  }

  const onChangeStartDate = async (key, value) => {
    userHistories[key].startDate = {
      status: value ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID,
      value: value
    }
    setUserHistories([...userHistories]);
  }

  const onChangeEndDate = async (key, value) => {
    let status = value ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID;
    let errorMessage = '';
    if (value < userHistories[key].startDate.value) {
      status = INPUT_STATUS.INVALID;
      errorMessage = 'End date must be greater than start date';
    }

    userHistories[key].endDate = {
      status,
      errorMessage,
      value: value
    }
    setUserHistories([...userHistories]);
  }

  const addInputUserHistories = () => {
    userHistories.push({
      institution: {},
      institutionInput: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      role: {},
      roleInput: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      startDate: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      },
      endDate: {
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
      }
    })

    setUserHistories([...userHistories]);
  }

  const deleteInputUserHistories = (key) => {
    const newUserHistories = [];
    for(var index = 0; index < userHistories.length; index++) {
      if (index !== key) {
        newUserHistories.push(userHistories[index]);
      }
    }
    setUserHistories(newUserHistories);
  }

  const isDisabled = () => {
    if (name.status !== INPUT_STATUS.VALID 
      || publicKey.status !== INPUT_STATUS.VALID
      || email.status !== INPUT_STATUS.VALID
      || phoneNumber.status !== INPUT_STATUS.VALID) {
        return true;
    }

    for(const userHistory of userHistories) {
      if (userHistory.institutionInput.status !== INPUT_STATUS.VALID
        || userHistory.roleInput.status !== INPUT_STATUS.VALID
        || userHistory.startDate.status !== INPUT_STATUS.VALID
        || (userHistory.endDate.status !== INPUT_STATUS.VALID && !userHistory.isStillWorking) ) {
          return true;
      }
    }
    
    return false;
  }

  const inputUserHistories = () => {
    const composeInstitutionOptions = () => {
      return institutions.map((institution) => {
        return {value: institution.institution_id, label: institution.name}
      });
    }

    const composeRoleOptions = () => {
      return roles.map((role) => {
        return {value: role.role_id, label: role.name}
      });
    }

    return userHistories.map((userHistory, key) => {
      return (
        <>
          <form className="add-edit-user-detail-box">
            {userHistories.length > 1 ?
            <div className="delete-btn">
              <FontAwesomeIcon icon={faTimesCircle} onClick={() => deleteInputUserHistories(key)}/>
            </div> : <></>}
            <div className="user-institution">
              <p>
                Institution <font color="red">*</font>
              </p>
              <InputField
                type="dropdown"
                name="institution"
                value={userHistory.institutionInput}
                options={composeInstitutionOptions()}
                onChange={(val) => { onSelectInstitution(key, val)} }
              />
            </div>
            <div className="user-role">
              <p>
                Role <font color="red">*</font>
              </p>
              <InputField
                type="dropdown"
                name="role"
                value={userHistory.roleInput}
                options={composeRoleOptions()}
                onChange={(val) => { onSelectRole(key, val)} }
              />
            </div>
            <div className="user-startDate">
              <p>
                Tanggal Mulai <font color="red">*</font>
              </p>
              <InputField
                type="date"
                name="startdate"
                value={userHistory.startDate}
                onChange={(val) => {onChangeStartDate(key, val)}}
              />
            </div>
            <div className="user-endDate">
              <p>
                Tanggal Akhir <font color="red">*</font>
              </p>
              <div className="check-box">
                <input 
                  type="checkbox" 
                  value={userHistory.isStillWorking}
                  onChange={() => {
                    userHistories[key].isStillWorking = !userHistory.isStillWorking;
                    setUserHistories([...userHistories]);
                  }}
                /><span>Currently working on this role</span>
              </div>
              {!userHistory.isStillWorking ?
              <InputField
                type="date"
                name="enddate"
                value={userHistory.endDate}
                onChange={(val) => {onChangeEndDate(key, val)}}
              /> : <></>}
            </div>
          </form>
        </>
      )
    })
  }

  // const add = () => {
  //   const request = {
  //     name: name.value,
  //     email: email.value,
  //     phone_number: phoneNumber.value,
  //     public_key: publicKey.value,
  //     photo: photo
  //   }
  //   const user = await API.createUser(request);


  // }

  // const onSubmit = () {
  //   if (props.add) {

  //   }
  // }

  return (
    <React.Fragment>
      <form className="add-edit-user-box">
        <div className="user-name">
          <p>
            Full Name <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="name"
            placeholder="Masukan Nama Lengkap"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="user-email">
          <p>
            Public Key <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="publickey"
            placeholder="Masukan Public Key"
            value={publicKey}
            onChange={onChange}
          />
        </div>
        <div className="user-email">
          <p>
            Email <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="email"
            placeholder="Masukan Email Aktif"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="user-phoneNumber">
          <p>
            Phone Number <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="phonenumber"
            placeholder="Masukan Nomor Telepon Aktif"
            value={phoneNumber}
            onChange={onChange}
          />
        </div>
        <div className="upload-photo">
          <p>Upload Photo</p>
          {!photo ?
          <>
            <input
              type="file"
              className="custom-file-input"
              id="input"
              accept="image/*"
              onChange={onUpload}
              disabled={isProcessing}
              hidden
            />
            <label htmlFor="input" className="browse-btn">
              {!isProcessing ? 'Browse' : <FontAwesomeIcon icon={faSpinner}/>}
            </label>
          </> : <span>{originalFileName}</span> }
        </div>
      </form>
      {inputUserHistories()}
      <div className="btn-add">
        <button className="btn-add-more" onClick={addInputUserHistories}>Add More</button>
      </div>
      <div className="save-btn">
        <SubmitButton disabled={isDisabled()} buttonText={"Save"} />
      </div>
    </React.Fragment>
  );
};

export default AddEditUser;
