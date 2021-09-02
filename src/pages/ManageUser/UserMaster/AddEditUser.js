import { faExclamationCircle, faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../../../components/elements/InputField/InputField";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import { createNotification } from "../../../components/Notification/Notification";
import { INPUT_STATUS } from "../../../constants/component.constant";
import API from "../../../services/api";
import web3 from "../../../services/web3";
import { history } from "../../../store";
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
  const [deletedHistories, setDeletedHistories] = useState([]);

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

  const fillInput = () => {
    if (inputFilled) {
      return;
    }

    setName({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.name
    });
    setEmail({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.email
    });
    setPhoneNumber({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.phone_number
    });
    setPublicKey({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.public_key
    });
    const histories = props.selectedUser.UserHistories;
    const newUserHistories = [];
    for (const history of histories) {
      newUserHistories.push({
        user_history_id: history.user_history_id,
        institution: history.Institution,
        institutionInput: {
          status: INPUT_STATUS.VALID,
          errorMessage: "",
          value: history.Institution.name,
        },
        role: history.Role,
        roleInput: {
          status: INPUT_STATUS.VALID,
          errorMessage: "",
          value: history.Role.name,
        },
        startDate: {
          status: INPUT_STATUS.VALID,
          value: moment(history.start_date).format('YYYY-MM-DD'),
          errorMessage: "",
        },
        endDate: {
          status: history.end_date ? INPUT_STATUS.VALID : INPUT_STATUS.INIT,
          value: history.end_date ? moment(history.end_date).format('YYYY-MM-DD') : '',
          errorMessage: "",
        },
        isStillWorking: !history.end_date
      });
    }
    setUserHistories(newUserHistories);
  }

  useEffect(() => {
    getAllInstitutions();
    getAllRoles();

    if (props.edit) {
      fillInput();
    }
  }, [props.selectedUser]);

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
      } else if (userHistories[index].user_history_id) {
        deletedHistories.push(userHistories[index].user_history_id);
        setDeletedHistories([...deletedHistories]);
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

  const onAdd = async () => {
    setProcessing(true);
    try {
      let request = {
        name: name.value,
        email: email.value,
        phone_number: phoneNumber.value,
        public_key: publicKey.value,
        photo: photo
      }
      const user = await API.createUser(request);
  
      for (const userHistory of userHistories) {
        let request = {
          user_id: user.user_id,
          institution_id: userHistory.institution.institution_id,
          role_id: userHistory.role.role_id,
          start_date: moment(userHistory.startDate.value).format("YYYY-MM-DD"),
          end_date: userHistory.isStillWorking ? null : moment(userHistory.endDate.value).format("YYYY-MM-DD")
        }
  
        await API.createUserHistory(request);
      }

      createNotification({
        type: 'success',
        value: 'Add user success'
      });
      history.push('/dashboard/ADMIN?menu=user-master');
    } catch (e) {
      console.log(e);
      createNotification({
        type: 'error',
        value: typeof e === 'string' ? e : 'Add user failed'
      });
    }
    
    setProcessing(true);
  }

  const onEdit = async () => {
    setProcessing(true);
    try {
      let request = {
        user_id: props.selectedUser.user_id,
        name: name.value,
        email: email.value,
        phone_number: phoneNumber.value,
        public_key: publicKey.value,
        photo: photo ? photo : props.selectedUser.photo
      }
      const user = await API.updateUser(request);
  
      for (const userHistory of userHistories) {
        let request = {
          user_id: props.selectedUser.user_id,
          institution_id: userHistory.institution.institution_id,
          role_id: userHistory.role.role_id,
          start_date: moment(userHistory.startDate.value).format("YYYY-MM-DD"),
          end_date: userHistory.isStillWorking ? null : moment(userHistory.endDate.value).format("YYYY-MM-DD")
        }
        
        if (!userHistory.user_history_id) {
          await API.createUserHistory(request);
        } else {
          console.log(request);
          request.user_history_id = userHistory.user_history_id;
          await API.updateUserHistory(request);
        }
      }

      for (const deletedUserHistoryId of deletedHistories) {
        await API.deleteUserHistory({user_history_id: deletedUserHistoryId});
      }

      createNotification({
        type: 'success',
        value: 'Update user success'
      });
      history.push('/dashboard/ADMIN?menu=user-master');
    } catch (e) {
      console.log(e);
      createNotification({
        type: 'error',
        value: typeof e === 'string' ? e : 'Update user failed'
      });
    }
    
    setProcessing(true);
  }

  const onSubmit = () => {
    if (props.add) {
      onAdd();
    } else {
      onEdit();
    }
  }

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
        <SubmitButton isProcessing={isProcessing} disabled={isDisabled()} buttonText={"Save"} onClick={onSubmit}/>
      </div>
    </React.Fragment>
  );
};

export default AddEditUser;
