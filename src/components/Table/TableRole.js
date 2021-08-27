import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";

class TableRole extends Component {
  renderTableData(props) {
    return props.roles.map((student, index) => {
      const { id, roleName, description } = student; //destructuring
      return (
        <tr key={id}>
          <td>{roleName}</td>
          <td>{description}</td>
          <td>
            <Link
              style={{ color: "black" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                this.props.setInputValue("roleId", id);
                this.props.setInputValue("roleName", roleName);
                this.props.setInputValue("description", description);
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
        <th>Role Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="roles-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">
            {this.renderTableData(this.props)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableRole;
