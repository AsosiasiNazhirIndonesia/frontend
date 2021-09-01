import { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../../store";
import "./Table.scss";

class TableAdmin extends Component {
  renderTableData(props) {
    return props.admins.map((admin, index) => {
      const { admin_id, admin_role, name, email, phone_number, Institution } = admin; //destructuring
      return (
        <tr key={admin_id}>
          <td>{admin_role}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone_number}</td>
          <td>{Institution ? Institution.name : ''}</td>
          <td>
            <Link
              style={{ color: "black" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                props.setSelectedAdmin(admin);
                history.push("/dashboard/ADMIN?menu=admin-master&view_user=true");
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
                props.setSelectedAdmin(admin);
                history.push("/dashboard/ADMIN?menu=admin-master&edit_user=true");
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
        <th>Admin Role</th>
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

export default TableAdmin;
