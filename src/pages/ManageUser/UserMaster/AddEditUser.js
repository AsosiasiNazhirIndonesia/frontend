import { faExclamationCircle, faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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
  const [address, setAddress] = useState({
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
  const [inputFilled, setInputFilled] = useState(false);
  const [institutions, setInstitutions] = useState([]);

  const getAllInstitutions = async () => {
    if (institutions.length <= 0) {
      setInstitutions(await API.getAllInstitutions(0, 100));
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
    setAddress({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.address
    });
    setPhoneNumber({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.phone_number
    });
    setPublicKey({
      status: INPUT_STATUS.VALID,
      value: props.selectedUser.public_key
    });
    
  }

  useEffect(() => {
    getAllInstitutions();

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


  const isDisabled = () => {
    if (name.status !== INPUT_STATUS.VALID 
      || publicKey.status !== INPUT_STATUS.VALID
      || email.status !== INPUT_STATUS.VALID
      || phoneNumber.status !== INPUT_STATUS.VALID) {
        return true;
    }
    
    return false;
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
        <div className="user-address">
          <p>
            Address <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="address"
            placeholder="Masukan Alamat"
            value={address}
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

      <div className="save-btn">
        <SubmitButton isProcessing={isProcessing} disabled={isDisabled()} buttonText={"Save"} onClick={onSubmit}/>
      </div>
    </React.Fragment>
  );
};

export default AddEditUser;
