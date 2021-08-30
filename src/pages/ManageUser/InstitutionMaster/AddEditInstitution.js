import InputField from "../../../components/elements/InputField/InputField";
import "./AddEditInstitution.scss";

const AddEditInstitution = (props) => {
  const value = {};
  if (props.add) {
    return (
      <div className="modal-container">
        <form className="modal-box">
          <h1>Add Institution</h1>
          <div className="institution-name">
            <p>
              Institution Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-name-input"
              placeholder="Masukan Nama Institusi"
              value={props.getInputValue("institutionName")}
              onChange={(e) =>
                props.setInputValue("institutionName", e.target.value)
              }
            />
          </div>
          <div className="institution-email">
            <p>
              Institution Email <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-email-input"
              placeholder="Masukan Email Institusi"
              value={props.getInputValue("email")}
              onChange={(e) => props.setInputValue("email", e.target.value)}
            />
          </div>
          <div className="institution-phoneNumber">
            <p>
              Institution Phone Number <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-phoneNumber-input"
              placeholder="Masukan Nomor Telepon Institusi"
              value={props.getInputValue("phoneNumber")}
              onChange={(e) =>
                props.setInputValue("phoneNumber", e.target.value)
              }
            />
          </div>
          <div className="institution-address">
            <p>
              Institution Address <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-address"
              placeholder="Masukan Alamat Institusi"
              value={props.getInputValue("address")}
              onChange={(e) => props.setInputValue("address", e.target.value)}
            />
          </div>
          <div className="institution-type">
            <p>
              Institution Type <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-type"
              placeholder="Masukan Tipe Institusi"
              value={props.getInputValue("type")}
              onChange={(e) => props.setInputValue("type", e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button
              className="btn-cancel"
              onClick={() => props.setIsAdd(false)}
            >
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={async () => {
                await props.submit();
                props.setIsAdd(false);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  } else if (props.edit) {
    return (
      <div className="modal-container">
        <form className="modal-box">
          <h1>Edit Institution</h1>
          <div className="institution-name">
            <p>
              Institution Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-name-input"
              placeholder="Masukan Nama Institusi"
              value={props.getInputValue("institutionName")}
              onChange={(e) =>
                props.setInputValue("institutionName", e.target.value)
              }
            />
          </div>
          <div className="institution-email">
            <p>
              Institution Email <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-email-input"
              placeholder="Masukan Email Institusi"
              value={props.getInputValue("email")}
              onChange={(e) => props.setInputValue("email", e.target.value)}
            />
          </div>
          <div className="institution-phoneNumber">
            <p>
              Institution Phone Number <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-phoneNumber-input"
              placeholder="Masukan Nomor Telepon Institusi"
              value={props.getInputValue("phoneNumber")}
              onChange={(e) =>
                props.setInputValue("phoneNumber", e.target.value)
              }
            />
          </div>
          <div className="institution-address">
            <p>
              Institution Address <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-address"
              placeholder="Masukan Alamat Institusi"
              value={props.getInputValue("address")}
              onChange={(e) => props.setInputValue("address", e.target.value)}
            />
          </div>
          <div className="institution-type">
            <p>
              Institution Type <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-type"
              placeholder="Masukan Tipe Institusi"
              value={props.getInputValue("type")}
              onChange={(e) => props.setInputValue("type", e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button
              className="btn-cancel"
              onClick={() => props.setIsEdit(false)}
            >
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={async () => {
                await props.update();
                props.setIsEdit(false);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  } else return null;
};

export default AddEditInstitution;
