import "./DeleteInstitution.scss";

const DeleteInstitution = (props) => {
  if (props.delete) {
    return (
      <div className="modal-container">
        <form className="modal-box-delete">
          <h1>Delete Data?</h1>
          <p>Are you sure want to delete this record of data?</p>
          <div className="btn-group">
            <button className="btn-cancel">Cancel</button>
            <button className="btn-delete">Delete</button>
          </div>
        </form>
      </div>
    );
  } else return null;
};

export default DeleteInstitution;
