import { Component } from "react";
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
          action: (
            <div>
              <button onClick={() => {props.setIsEdit(true)}}>Edit</button>,<button onClick={() => {props.setIsDelete(true)}}>Delete</button>
            </div>
          ),
        },
        {
          id: 2,
          roleName: "Rektor",
          description: "-",
          action: (
            <div>
              <button>Edit</button>,<button>Delete</button>
            </div>
          ),
        },
        {
          id: 3,
          roleName: "Pembantu Bidang 1",
          description: "-",
          action: (
            <div>
              <button>Edit</button>,<button>Delete</button>
            </div>
          ),
        },
        {
          id: 4,
          roleName: "Pembantu Bidang 2",
          description: "-",
          action: (
            <div>
              <button>Edit</button>,<button>Delete</button>
            </div>
          ),
        },
        {
          id: 5,
          roleName: "Pembantu Bidang 3",
          description: "-",
          action: (
            <div>
              <button>Edit</button>,<button>Delete</button>
            </div>
          ),
        },
      ],
    };
  }

  renderTableData() {
    return this.state.roles.map((student, index) => {
      const { id, roleName, description, action } = student; //destructuring
      return (
        <tr key={id}>
          <td>{roleName}</td>
          <td>{description}</td>
          <td>{action}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>ROLENAME</th>
        <th>DESCRIPTION</th>
        <th>ACTION</th>
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
