import { Component } from "react";
import { Link } from "react-router-dom";
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
        },
        {
          id: 2,
          role: "Rektor",
          name: "Bambang Saputra",
          email: "BambangS@gmail.co.id",
          phoneNumber: "08123123123",
          institution: "Politeknik Negeri Bandung",
        },
        {
          id: 3,
          role: "Pembantu Direktur 1",
          name: "Bambang Supardi",
          email: "BambangSup@gmail.co.id",
          phoneNumber: "08123212321",
          institution: "Politeknik Negeri Bandung",
        },
      ],
    };
  }
  renderTableData() {
    return this.state.users.map((student, index) => {
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
          <tbody className="content-table">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default TableUser;
