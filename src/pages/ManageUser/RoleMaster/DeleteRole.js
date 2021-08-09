import "./DeleteRole.scss";

const DeleteRole = (props) => {
  if (props.delete) {
    return (
      <div className="modal-container">
        <form className="modal-box-delete">
          <h1>Delete Role</h1>
          <p>Are you sure want to delete this record of data?</p>
          <div className="btn-group">
            <button className="btn-cancel" onClick={() => props.setIsDelete(false)}>Cancel</button>
            <button className="btn-delete">Delete</button>
          </div>
        </form>
      </div>
    );
  } else return null;
};

export default DeleteRole;
