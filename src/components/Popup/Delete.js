import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Delete.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Delete = (props) => {
  const onDelete = (e) => {
    e.preventDefault();
    props.del();
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
            {props.loading ? (
              <div>
                <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
              </div>
            ) : (
              <button className="btn-delete">Delete</button>
            )}
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
