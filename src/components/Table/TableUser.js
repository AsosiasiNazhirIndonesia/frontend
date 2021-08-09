import { Component } from "react";
import "./Table.scss";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          role: "Student",
          name: "Anggi Nur D",
          email: "Nuranggie@gmail.co.id",
          phoneNumber: "08123456789",
          institution: "Politeknik Negeri Bandung",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
        {
          id: 2,
          role: "Rektor",
          name: "Bambang Saputra",
          email: "BambangS@gmail.co.id",
          phoneNumber: "08123123123",
          institution: "Politeknik Negeri Bandung",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
        {
          id: 3,
          role: "Pembantu Direktur 1",
          name: "Bambang Supardi",
          email: "BambangSup@gmail.co.id",
          phoneNumber: "08123212321",
          institution: "Politeknik Negeri Bandung",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
      ],
    };
  }
  renderTableData() {
    return this.state.users.map((student, index) => {
      const { id, role, name, email, phoneNumber, institution, action } =
        student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{role}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phoneNumber}</td>
          <td>{institution}</td>
          <td>{action}</td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    let header = Object.keys(this.state.users[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  render() {
    return (
      <div>
        <table className="users-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default TableUser;
