import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Delete.scss";

const Delete = (props) => {
  const onDelete = (e) => {
    e.preventDefault();
    props.del();
    //props.onDelete(props.selectedData);
    props.setIsDelete(false);
  };

  if (props.delete) {
    return (
      <div className="modal-container">
        <form
          className="modal-box-delete"
          onSubmit={(e) => {
            onDelete(e);
          }}
        >
          <h1>Delete Data</h1>
          <p>Are you sure want to delete this record of data?</p>
          <div className="btn-group">
            <button
              className="btn-cancel"
              onClick={() => props.setIsDelete(false)}
            >
              Cancel
            </button>
            <button className="btn-delete">Delete</button>
          </div>
        </form>
      </div>
    );
  } else return null;
};

const mapStateToProps = (state) => ({
  selectedData: state.getIn(["delete", "selectedData"]).toJS(),
});

export default connect(mapStateToProps)(React.memo(withRouter(Delete)));
