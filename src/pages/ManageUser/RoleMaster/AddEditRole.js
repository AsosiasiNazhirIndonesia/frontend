import InputField from "../../../components/elements/InputField/InputField";
import "./AddEditRole.scss";

const AddEditRole = (props) => {
  if (props.add) {
    return (
      <div className="modal-container">
        <div className="modal-box">
          <h1>Add Role</h1>
          <div className="role-name">
            <p>
              Role Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="role-name-input"
              placeholder="Masukan Nama Role"
              value={props.getInputValue("roleName")}
              onChange={(e) => props.setInputValue("roleName", e.target.value)}
            />
          </div>
          <div className="role-description">
            <p>Deskripsi (Optional)</p>
            <InputField
              type="text"
              name="role-description-input"
              placeholder="Masukan Deskripsi"
              value={props.getInputValue("description")}
              onChange={(e) =>
                props.setInputValue("description", e.target.value)
              }
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
        </div>
      </div>
    );
  } else if (props.edit) {
    return (
      <div className="modal-container">
        <div className="modal-box">
          <h1>Edit Role</h1>
          <div className="role-name">
            <p>
              Role Name <font color="red">*</font>
            </p>
            <InputField
              type="text"
              name="role-name-input"
              value={props.getInputValue("roleName")}
              onChange={(e) =>
                props.setInputValue("roleName", e.target.value)
              }
            />
          </div>
          <div className="role-description">
            <p>Deskripsi (Optional)</p>
            <InputField
              type="text"
              name="role-description-input"
              value={props.getInputValue("description")}
              onChange={(e) =>
                props.setInputValue("description", e.target.value)
              }
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
        </div>
      </div>
    );
  } else return null;
};

export default AddEditRole;
