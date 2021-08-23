import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";

class TableUser extends Component {
  renderTableData(props) {
    return props.users.map((student, index) => {
      const { id, role, name, email, phoneNumber, institution } = student; //destructuring
      return (
        <tr key={id}>
          <td>{role}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phoneNumber}</td>
          <td>{institution}</td>
          <td>
            <Link
              style={{ color: "black" }}
              to={"/dashboard?menu=user-master&view_user=true"}
            >
              View
            </Link>
            ,{" "}
            <Link
              style={{ color: "black" }}
              to={"/dashboard?menu=user-master&edit_user=true"}
            >
              Edit
            </Link>
            ,{" "}
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
        <th>Role</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Institution</th>
        <th>Action</th>
      </tr>
    );
  }
  render() {
    return (
      <div>
        <table className="users-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">
            {this.renderTableData(this.props)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableUser;
