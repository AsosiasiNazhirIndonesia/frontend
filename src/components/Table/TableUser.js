import { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../../store";
import "./Table.scss";

class TableUser extends Component {
  renderTableData(props) {
    return props.users.map((user, index) => {
      const { user_id, name, email, phone_number, public_key } = user; //destructuring
      return (
        <tr key={user_id}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone_number}</td>
          <td>{public_key}</td>
          <td>
            <Link
              style={{ color: "black" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                window.open(`/profile?actor_type=USER&actor_public_key=${public_key}`, "_blank");
              }}
            >
              View
            </Link>
            ,{" "}
            <Link
              style={{ color: "black" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                this.props.setSelectedUser(user);
                history.push("/dashboard/ADMIN?menu=user-master&edit_user=true");
              }}
            >
              Edit
            </Link>
          </td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    return (
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Public Key</th>
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
