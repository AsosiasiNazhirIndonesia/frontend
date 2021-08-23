import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";

class TableCertificate extends Component {
  renderTableData(props) {
    return props.certificates.map((student, index) => {
      const { id, date, documentName, sendTo, signaturedBy, status } = student; //destructuring
      return (
        <tr key={id}>
          <td>{date}</td>
          <td>{documentName}</td>
          <td>{sendTo}</td>
          <td>{signaturedBy}</td>
          <td>{status}</td>
          <td>
            <Link
              style={{ color: "black" }}
              to={"/dashboard?menu=manage-certificate&view_certificate=true"}
            >
              View
            </Link>
            , <Link style={{ color: "black" }}>Edit</Link>,{" "}
            <Link
              style={{ color: "red" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                this.props.setIsDelete(true);
              }}
            >
              Delete
            </Link>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Date</th>
        <th>Document Name</th>
        <th>Send To</th>
        <th>Signatured By</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="certificate-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">
            {this.renderTableData(this.props)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableCertificate;
