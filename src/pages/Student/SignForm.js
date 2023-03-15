import InputField from "../../components/elements/InputField/InputField";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import "./SignForm.scss";

const SignForm = (props) => {
  const value = {};
  if (props.add) {
    return (
      <div className="sign-form-modal-container">
        <form className="modal-box-signform">
          <h1>Sign</h1>
          <div className="sign-table">
            <p>Sign Table</p>
          </div>
          <div className="private-key">
            <p>Private Key :</p>
            <InputField
              type="text"
              name="private-key-input"
              placeholder="Input Private Key"
              value={value}
            />
          </div>
          <div className="digital-sign-bef">
            <p>Digital Signature before you sign</p>
            <InputField
              type="text"
              name="digital-sign-input"
              placeholder="AM2bLUBH3der9ezJ2DxrO3gGdP1MgW"
              value={value}
            />
          </div>
          <div className="btn-generate">
            <SubmitButton buttonText="Generate"></SubmitButton>
          </div>
          <div className="digital-sign-aft">
            <p>Digital Signature after you signed</p>
            <InputField
              type="text"
              name="digital-sign-input"
              placeholder="AM2bLUBH3der9ezJ2DxrO3gGdP1MgW"
              value={value}
            />
          </div>
        </form>
      </div>
    );
  } else return null;
};

export default SignForm;
