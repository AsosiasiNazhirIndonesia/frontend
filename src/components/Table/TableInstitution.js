import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";

class TableInstitution extends Component {
  renderTableData(props) {
    return props.institutions.map((student, index) => {
      const {
        id,
        institutionName,
        email,
        phoneNumber,
        address,
        type,
        deletedDate,
      } = student; //destructuring
        return (
          <tr key={id}>
            <td className={deletedDate ? "deleted" : ""}>{institutionName}</td>
            <td className={deletedDate ? "deleted" : ""}>{email}</td>
            <td className={deletedDate ? "deleted" : ""}>{phoneNumber}</td>
            <td className={deletedDate ? "deleted" : ""}>{address}</td>
            <td className={deletedDate ? "deleted" : ""}>{type}</td>
            <td className={deletedDate ? "deleted" : ""}>
              {!deletedDate ?
              <>
              <Link
                style={{ color: "black" }}
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  this.props.setInputValue("institutionId", id);
                  this.props.setInputValue("institutionName", institutionName);
                  this.props.setInputValue("email", email);
                  this.props.setInputValue("phoneNumber", phoneNumber);
                  this.props.setInputValue("address", address);
                  this.props.setInputValue("type", type);
                  this.props.setIsEdit(true);
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
                  this.props.setInputValue("institutionId", id);
                  this.props.setIsDelete(true);
                }}
              >
                Delete
              </Link></> : <></>}
            </td>
          </tr>
        );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Institution Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="institutions-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">
            {this.renderTableData(this.props)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableInstitution;
