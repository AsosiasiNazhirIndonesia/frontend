import React, { useEffect, useState } from "react";
import styles from "./ModalCertificateType.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldControl from "../elements/InputField/InputFieldControl";
import Button from "../elements/Button";
import API from "../../services/api";

const addCertTypeSchema = yup.object({
  certificate_type: yup.string().required(),
});

const ModalCertificateType = ({
  title,
  visible,
  selectedData,
  onCancel,
  onSubmitted,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(addCertTypeSchema),
  });

  const [isLoading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(selectedData?.id);

  useEffect(() => {
    if (selectedData) {
      setValue("certificate_type", selectedData?.name);
      setSelectedId(selectedData?.id);
    }
  }, [selectedData]);

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      const result = await API.addCertificateType(values);
      onSubmitted && onSubmitted();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const result = await API.updateCertificateType({
        certificate_type_id: selectedData?.id,
        certificate_type: values?.certificate_type,
      });
      onSubmitted && onSubmitted();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={visible ? "modal-container" : "hidden"}>
      <div className={"modal-box"}>
        <h1>{title}</h1>
        <form
          onSubmit={handleSubmit((d) => {
            if (selectedData) {
              handleEdit(d);
            } else {
              handleAdd(d);
            }
          })}
        >
          <InputFieldControl
            label="Certificate Type Name"
            control={control}
            errors={errors.certificate_type}
            name="certificate_type"
          />
          <div className={styles["submit-btn-container"]}>
            <Button isProcessing={isLoading} buttonText="Add" type="submit" />
            <Button
              buttonText="Cancel"
              onClick={() => onCancel && onCancel()}
              className="bg-grey"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCertificateType;
