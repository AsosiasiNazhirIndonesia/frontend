import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";

class TableRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [
        {
          id: 1,
          roleName: "Student",
          description: "-",
        },
        {
          id: 2,
          roleName: "Rektor",
          description: "-",
        },
        {
          id: 3,
          roleName: "Pembantu Bidang 1",
          description: "-",
        },
        {
          id: 4,
          roleName: "Pembantu Bidang 2",
          description: "-",
        },
        {
          id: 5,
          roleName: "Pembantu Bidang 3",
          description: "-",
        },
      ],
    };
  }

  renderTableData() {
    return this.state.roles.map((student, index) => {
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
          <tbody className="content-table">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default TableRole;
