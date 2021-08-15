import React from "react";
import InputField from "../../../components/elements/InputField/InputField";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import "./AddEditUser.scss";

const AddEditUser = (props) => {
  const value = {};
  // if condition untuk edit/add
  // if(props.edit) / if(props.add)
  return (
    <React.Fragment>
      <form className="add-edit-user-box">
        <div className="user-name">
          <p>
            Full Name <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="user-name-input"
            placeholder="Masukan Nama Lengkap"
            value={value}
          />
        </div>
        <div className="user-email">
          <p>
            Email <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="user-email-input"
            placeholder="Masukan Email Aktif"
            value={value}
          />
        </div>
        <div className="user-phoneNumber">
          <p>
            Phone Number <font color="red">*</font>
          </p>
          <InputField
            type="text"
            name="user-phoneNumber-input"
            placeholder="Masukan Nomor Telepon Aktif"
            value={value}
          />
        </div>
        <div className="upload-photo">
          <p>Upload Photo</p>
          <SubmitButton buttonText={"Browse"} />
        </div>
      </form>
      <form className="add-edit-user-detail-box">
        {/* blm nerapin component dropdown (sementara inputfield) */}
        <div className="user-institution">
          <p>
            Institution <font color="red">*</font>
          </p>
          <select id="dropdown">
            <option value="1">Politeknik Negeri Bandung</option>
            <option value="2">Politeknik Negeri Cimahi</option>
            <option value="3">Politeknik Negeri Garut</option>
            <option value="4">Politeknik Negeri Sukabumi</option>
            <option value="5">Politeknik Negeri Cianjut</option>
          </select>
        </div>
        <div className="user-role">
          <p>
            Role <font color="red">*</font>
          </p>
          <select id="dropdown">
            <option value="1">Student</option>
            <option value="2">Rektor</option>
            <option value="3">Pembantu Direktorat 1</option>
            <option value="4">Dosen</option>
          </select>
        </div>
        <div className="user-startDate">
          <p>
            Tanggal Mulai <font color="red">*</font>
          </p>
          <div className="dropdown-startDate">
            <select id="dropdown">
              <option value="1">Bulan</option>
              <option value="2">Januari</option>
              <option value="3">Februari</option>
              <option value="4">Maret</option>
            </select>
            <select id="dropdown">
              <option value="1">2018</option>
              <option value="2">2019</option>
              <option value="3">2020</option>
              <option value="4">2021</option>
            </select>
          </div>
        </div>
        <div className="user-endDate">
          <p>
            Tanggal Akhir <font color="red">*</font>
          </p>
          <div className="dropdown-endDate">
            <select id="dropdown">
              <option value="1">Bulan</option>
              <option value="2">Januari</option>
              <option value="3">Februari</option>
              <option value="4">Maret</option>
            </select>
            <select id="dropdown">
              <option value="1">Sekarang</option>
              <option value="2">2018</option>
              <option value="3">2019</option>
              <option value="4">2020</option>
            </select>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddEditUser;
