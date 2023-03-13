import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class TableCertificateTypes extends Component {
  renderTableData(props) {
    return props.certTypes.map((certType, index) => {
      const { name, id } = certType; //destructuring
      return (
        <tr key={index}>
          <td>{name}</td>
          <td>
            <>
              <Link
                style={{ color: "black" }}
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  //   this.props.setInputValue("institutionId", id);
                  //   this.props.setInputValue("institutionName", institutionName);
                  //   this.props.setInputValue("email", email);
                  //   this.props.setInputValue("phoneNumber", phoneNumber);
                  //   this.props.setInputValue("address", address);
                  //   this.props.setInputValue("type", type);
                  //   this.props.setIsEdit(true);
                  this.props.onEdit(certType);
                }}
              >
                Edit
              </Link>
              ,{" "}
              <Link
                style={{ color: "red" }}
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  //   this.props.setInputValue("institutionId", id);
                  this.props.onDelete(certType);
                }}
              >
                Delete
              </Link>
            </>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Certificate Type Name</th>
        <th>Action</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <div>
            <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
          </div>
        ) : (
          <table className="institutions-table">
            <thead>{this.renderTableHeader()}</thead>
            <tbody className="content-table">
              {this.renderTableData(this.props)}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default TableCertificateTypes;
