import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import styles from "./CreateCertificateMember1.module.scss";
import React, { useEffect, useState } from "react";
import { history } from "../../../store";
import { INPUT_STATUS } from "../../../constants/component.constant";
import CertificatePDF from "../../../components/CertificatePDF/CertificatePDF";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import API from "../../../services/api";

import moment from "moment";
import CertificateMemberPDF from "../../../components/CertificatePDF/CertificateMemberPDF";
import { useForm } from "react-hook-form";
import Button from "../../../components/elements/Button";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldControl from "../../../components/elements/InputField/InputFieldControl";

const createCertificateMemberSchema = yup.object({
  card_number: yup.string().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  dob: yup.string().required(),
});

const CreateCertificateMember1 = (props) => {
  const [isProcessing, setProcessing] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(createCertificateMemberSchema),
  });

  const [certificateDate, setCertificateDate] = useState({
    status: INPUT_STATUS.INIT,
    errorMessage: "",
    value: null,
  });

  const onEditorStateChange = () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    props.setInputValue("certificateDescription", content);
  };

  useEffect(() => {
    onEditorStateChange();
  }, [editorState]);

  const onUpload = async (e) => {
    setProcessing(true);
    const result = await API.uploadFile(e.target.files[0]);
    props.setInputValue("certificateLogo", result.filename);
    setProcessing(false);
  };

  const onSubmit = (values) => {};

  return (
    <div className={styles["container"]}>
      <div className={styles["pdf"]}>
        {/* <CertificatePDF 
          certificateTitle={props.getInputValue("certificateTitle").value} 
          receiverName={props.getInputValue("receiverName").value}
          certificateNo={props.getInputValue("certificateNo").value}
          certificateDescription={props.getInputValue("certificateDescription").value}
          certificateScore={props.getInputValue("certificateScore").value}
          certificateDate={props.getInputValue("certificateDate").value}
          certificateLogo={props.getInputValue("certificateLogo")}/> */}
        <CertificateMemberPDF
          cardNumber={watch("card_number")}
          cardName={watch("name")}
          cardAddress={watch("address")}
          cardDob={watch("dob")}
        />
      </div>
      <form onSubmit={handleSubmit((d) => onSubmit(d))}>
        <div className={styles["form-detail-certificate"]}>
          <div className={styles["title"]}>
            <InputFieldControl
              label="Card Number"
              control={control}
              errors={errors.card_number}
              name="card_number"
              placeholder="Card Number"
            />
          </div>
          <div className={styles["no-certificate"]}>
            <InputFieldControl
              label="Name"
              control={control}
              errors={errors.name}
              name="name"
              placeholder="Name"
            />
          </div>
          <div className={styles["name-user"]}>
            <InputFieldControl
              label="Address"
              control={control}
              errors={errors.address}
              name="address"
              placeholder="Address"
            />
          </div>

          <div className={styles["title"]}>
            <p>Date of birth</p>
            <InputField
              type="date"
              name="title-input"
              placeholder="Certificate date"
              value={certificateDate}
              onChange={(value) => {
                setCertificateDate({
                  status: value ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID,
                  errorMessage: value ? "" : "This field is required",
                  value: value,
                });
                setValue("dob", moment(value).format("DD-MM-YYYY"));
              }}
            ></InputField>
          </div>
        </div>
        <div className={styles["btn-next"]}>
          <Button
            type="submit"
            buttonText="Create"
            // disabled={disabledButton()}
            // onClick={() => {
            //   history.push(
            //     "/dashboard/ADMIN?menu=manage-certificate&create_certificate_step=2"
            //   );
            // }}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCertificateMember1;
