import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import InputField from "../../../components/elements/InputField/InputField";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import { createNotification } from "../../../components/Notification/Notification";
import { INPUT_STATUS } from "../../../constants/component.constant";
import API from "../../../services/api";
import web3 from "../../../services/web3";
import { history } from "../../../store";
import "./AddEditAdmin.scss";

const AddEditAdmin = (props) => {
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
  const [role, setRole] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "MAIN",
  });
  const [publicKey, setPublicKey] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });
  const [selectedInstitution, setSelectedInstitution] = useState({});
  const [institutions, setInstitutions] = useState([]);
  const [inputFilled, setInputFilled] = useState(false);
  
  const getAllInstitutions = async () => {
    if (institutions.length <= 0) {
      setInstitutions(await API.getAllInstitutions(0, 100));
    }
  }

  const fillInput = () => {
    if (inputFilled) {
      return;
    }

    setName({status: INPUT_STATUS.VALID, value: props.selectedAdmin.name});
    setEmail({status: INPUT_STATUS.VALID, value: props.selectedAdmin.email});
    setPhoneNumber({status: INPUT_STATUS.VALID, value: props.selectedAdmin.phone_number});
    setPublicKey({status: INPUT_STATUS.VALID, value: props.selectedAdmin.public_key});
    setRole({status: INPUT_STATUS.VALID, value: props.selectedAdmin.admin_role});
    setSelectedInstitution(props.selectedAdmin.Institution ? props.selectedAdmin.Institution : {});
    setInputFilled(true);
  }

  useEffect(() => {
    getAllInstitutions();
    if (props.edit) {
      fillInput();
    }
  }, role);

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

  const getInstitutionsOptions = () => {
    const options = [];
    for(const institution of institutions) {
      options.push({
        label: institution.name,
        value: institution.institution_id
      });
    }
    return options;
  }

  const onSelect = async (val) => {
    setRole({
      status: INPUT_STATUS.VALID,
      value: val.value
    });

    if (val.value === 'MAIN') {
      setSelectedInstitution({});
    }
  }

  const onSelectInstitution = async (val) => {
    setSelectedInstitution(institutions.find((institution) => {
      return institution.institution_id === val.value;
    }))
  }

  const onUpload = async (e) => {
    setProcessing(true);
    const result = await API.uploadFile(e.target.files[0]);
    setOriginalFileName(e.target.files[0].name);
    setPhoto(result.filename);
    setProcessing(false);
  }

  const add = async () => {
    setProcessing(true);
    try {
      const request = {
        name: name.value,
        email: email.value,
        public_key: publicKey.value,
        phone_number: phoneNumber.value,
        admin_role: role.value,
        institution_id: selectedInstitution.institution_id ? selectedInstitution.institution_id : null,
        photo: photo
      }
      await API.addAdmin(request);
      createNotification({
        type: 'success',
        value: 'Success to add admin'
      });
      history.push('/dashboard/ADMIN?menu=admin-master');
    } catch (e) {
      console.log(e);
      createNotification({
        type: 'error',
        value: e
      });
    }
    
    setProcessing(false);
  }

  const edit = async () => {
    setProcessing(true);
    try {
      const request = {
        admin_id: props.selectedAdmin.admin_id,
        name: name.value,
        email: email.value,
        public_key: publicKey.value,
        phone_number: phoneNumber.value,
        admin_role: role.value,
        institution_id: selectedInstitution.institution_id ? selectedInstitution.institution_id : null,
        photo: photo ? photo : props.selectedAdmin.photo
      }
      await API.editAdmin(request);
      createNotification({
        type: 'success',
        value: 'Success to update admin'
      });
      history.push('/dashboard/ADMIN?menu=admin-master');
    } catch (e) {
      console.log(e);
      createNotification({
        type: 'error',
        value: e
      });
    }
    
    setProcessing(false);
  }

  const submit = () => {
    if (props.add) {
      add();
    } else {
      edit();
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
        <div className="user-phoneNumber">
          <p>
            Role <font color="red">*</font>
          </p>
          <InputField
            type="dropdown"
            name="role"
            value={role}
            options={['MAIN','INSTITUTION']}
            onChange={onSelect}
          />
        </div>
        {role.value === 'INSTITUTION' ?
          <div className="user-phoneNumber">
            <p>
              Instituion
            </p>
            <InputField
              type="dropdown"
              name="role"
              value={{value: selectedInstitution.name, label: selectedInstitution.institution_id}}
              options={getInstitutionsOptions()}
              onChange={onSelectInstitution}
            />
          </div> : <></>}
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
        <SubmitButton 
          isProcessing={isProcessing} 
          disabled = {
            name.status !== INPUT_STATUS.VALID ||
            publicKey.status !== INPUT_STATUS.VALID ||
            email.status !== INPUT_STATUS.VALID ||
            phoneNumber.status !== INPUT_STATUS.VALID ||
            role.status !== INPUT_STATUS.VALID
          }
          buttonText={"Save"}
          onClick={submit} />
      </div>
    </React.Fragment>
  );
};

export default AddEditAdmin;
