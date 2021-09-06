import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import "./CreateCertificate1.scss";
import React, { useEffect, useState } from "react";
import { history } from "../../store";
import { INPUT_STATUS } from "../../constants/component.constant";
import CertificatePDF from "../../components/CertificatePDF/CertificatePDF";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html"
import API from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreateCertificate1 = (props) => {
  const [isProcessing, setProcessing] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  
  const onEditorStateChange = () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    props.setInputValue("certificateDescription", content);
  }

  useEffect(() => {
    onEditorStateChange();
  }, [editorState]);

  const disabledButton = () => {
    let disabled = false;
    if (props.getInputValue("documentName").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("receiverName").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateTitle").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateNo").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateDescription").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateScore").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } else if (props.getInputValue("certificateDate").status !== INPUT_STATUS.VALID) {
      disabled = true;
    } 

    return disabled;
  }

  const onUpload = async (e) => {
    setProcessing(true);
    const result = await API.uploadFile(e.target.files[0]);
    props.setInputValue("certificateLogo", result.filename);
    setProcessing(false);
  }

  return (
    <React.Fragment>
      <div className="form-name-template">
        <div className="name-template">
          <p>Document Name</p>
          <InputField
            type="text"
            name="search-input"
            placeholder="Document name"
            value={props.getInputValue("documentName")}
            onChange={(e) => { props.setInputValue("documentName", e.target.value) }}
          ></InputField>
        </div>
      </div>
      <div className="pdf">
        <CertificatePDF 
          certificateTitle={props.getInputValue("certificateTitle").value} 
          receiverName={props.getInputValue("receiverName").value}
          certificateNo={props.getInputValue("certificateNo").value}
          certificateDescription={props.getInputValue("certificateDescription").value}
          certificateScore={props.getInputValue("certificateScore").value}
          certificateDate={props.getInputValue("certificateDate").value}
          certificateLogo={props.getInputValue("certificateLogo")}/>
      </div>
      <div className="form-detail-certificate">
        <div className="title">
          <p>Logo</p>
          {!props.getInputValue("certificateLogo")?
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
          </> : <span>{props.getInputValue("certificateLogo")}</span> }
        </div>
        <div className="title">
          <p>Title</p>
          <InputField
            type="text"
            name="title-input"
            placeholder="Certificate title"
            value={props.getInputValue("certificateTitle")}
            onChange={(e) => { props.setInputValue("certificateTitle", e.target.value) }}
          ></InputField>
        </div>
        <div className="no-certificate">
          <p>No Certificate</p>
          <InputField
            type="text"
            name="no-certificate-input"
            placeholder="Certificate number"
            value={props.getInputValue("certificateNo")}
            onChange={(e) => { props.setInputValue("certificateNo", e.target.value) }}
          ></InputField>
        </div>
        <div className="name-user">
          <p>Receiver Name</p>
          <InputField
            type="text"
            name="name-input"
            placeholder="Certificate receiver"
            value={props.getInputValue("receiverName")}
            onChange={(e) => { props.setInputValue("receiverName", e.target.value) }}
          ></InputField>
        </div>
        <div className="title">
          <p>Description</p>
          {/* <InputField
            type="text"
            name="title-input"
            placeholder="Certificate description"
            value={props.getInputValue("certificateDescription")}
            onChange={(e) => { props.setInputValue("certificateDescription", e.target.value) }}
          ></InputField> */}
          <div className="certificate-desc">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editor-class"
              onEditorStateChange={setEditorState}
            />
          </div>
        </div>
        <div className="title">
          <p>Score</p>
          <InputField
            type="text"
            name="title-input"
            placeholder="Certificate score"
            value={props.getInputValue("certificateScore")}
            onChange={(e) => { props.setInputValue("certificateScore", e.target.value) }}
          ></InputField>
        </div>
        <div className="title">
          <p>Certificate Date</p>
          <InputField
            type="text"
            name="title-input"
            placeholder="Certificate date"
            value={props.getInputValue("certificateDate")}
            onChange={(e) => { props.setInputValue("certificateDate", e.target.value) }}
          ></InputField>
        </div>
      </div>
      <div className="btn-next">
        <SubmitButton
          buttonText="Next"
          disabled={disabledButton()}
          onClick={() => {
            history.push(
              "/dashboard/ADMIN?menu=manage-certificate&create_certificate_step=2"
            );
          }}
        ></SubmitButton>
      </div>
    </React.Fragment>
  );
};

export default CreateCertificate1;
