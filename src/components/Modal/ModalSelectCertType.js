import React, { useEffect, useState } from "react";
import styles from "./ModalCertificateType.module.scss";
import TextField from "../elements/InputField/InputField";
import { INPUT_STATUS } from "../../constants/component.constant";
import API from "../../services/api";
import Button from "../elements/Button";

const ModalSelectCertType = ({ visible, onSubmit, onCancel }) => {
  const [type, setType] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    label: "",
    errorMessage: "",
  });
  const [certTypes, setCertTypes] = useState([]);

  useEffect(() => {
    if (visible) {
      getAllCertificateType();
    }
  }, [visible]);

  const getAllCertificateType = async () => {
    try {
      const response = await API.getAllCertificateTypes(0, 1000);
      const arr = [];
      response?.map((val) => {
        arr.push({
          value: val?.certificate_type_id,
          label: val?.type,
        });
      });
      setCertTypes(arr);
    } catch (error) {}
  };

  return (
    <div className={visible ? "modal-container" : "hidden"}>
      <div className={"modal-box"}>
        <h1>SELECT CERTIFICATE TYPE</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit(type);
          }}
        >
          <TextField
            type="dropdown"
            name="type"
            value={type}
            options={certTypes}
            onChange={(val) => {
              setType({
                status: INPUT_STATUS.VALID,
                value: val?.value,
                label: val?.label,
              });
            }}
          />
          <div className={styles["submit-btn-container"]}>
            <Button
              type="button"
              className="bg-danger"
              buttonText="Cancel"
              onClick={() => onCancel && onCancel()}
            />
            <Button disabled={!type.value} buttonText="Next" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSelectCertType;
