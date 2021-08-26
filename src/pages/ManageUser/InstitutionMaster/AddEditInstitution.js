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
              value={value}
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
              value={value}
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
              value={value}
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
              value={value}
            />
          </div>
          <div className="btn-group">
            <button
              className="btn-cancel"
              onClick={() => props.setIsAdd(false)}
            >
              Cancel
            </button>
            <button className="btn-save">Save</button>
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
              value={value}
            />
          </div>
          <div className="institution-description">
            <p>
              Institution Email <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="institution-email-input"
              placeholder="Masukan Email Institusi"
              value={value}
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
              value={value}
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
              value={value}
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
                await props.submit();
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
