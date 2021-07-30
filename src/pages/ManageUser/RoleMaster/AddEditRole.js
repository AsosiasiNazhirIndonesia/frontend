import InputField from "../../../components/elements/InputField/InputField";
import "./AddEditRole.scss";

const AddEditRole = (props) => {
  const value = {};
  if (props.add) {
    return (
      <div className="modal-container">
        <form className="modal-box">
          <h1>Add Role</h1>
          <div className="role-name">
            <p>
              Role Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="role-name-input"
              placeholder="Masukan Nama Role"
              value={value}
            />
          </div>
          <div className="role-description">
            <p>Deskripsi (Optional)</p>
            <InputField
              type="text"
              name="role-description-input"
              placeholder="Masukan Deskripsi"
              value={value}
            />
          </div>
          <div className="btn-group">
            <button className="btn-cancel">Cancel</button>
            <button className="btn-save">Save</button>
          </div>
        </form>
      </div>
    );
  } else if (props.edit) {
    return (
      <div className="modal-container">
        <form className="modal-box">
          <h1>Edit Role</h1>
          <div className="role-name">
            <p>
              Role Name <font color="red">*</font>
            </p>
            {/* butuh yg nampilin nama yang sblmnya*/}
            <InputField
              type="text"
              name="role-name-input"
              placeholder="Masukan Nama Role"
              value={value}
            />
          </div>
          <div className="role-description">
            <p>Deskripsi (Optional)</p>
            <InputField
              type="text"
              name="role-description-input"
              placeholder="Masukan Deskripsi"
              value={value}
            />
          </div>
          <div className="btn-group">
            <button className="btn-cancel">Cancel</button>
            <button className="btn-save">Save</button>
          </div>
        </form>
      </div>
    );
  } else return null;
};

export default AddEditRole;
