import { Component } from "react";
import { Link } from "react-router-dom";
import "./Table.scss";

class TableInstitution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institutions: [
        {
          id: 1,
          institutionName: "Politeknik Negeri Bandung",
          email: "polban@polban.ac.id",
          phoneNumber: "0222013789",
          address:
            "Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559",
        },
        {
          id: 2,
          institutionName: "Politeknik Negeri Bandung",
          email: "polban2@polban.ac.id",
          phoneNumber: "0222013789",
          address:
            "Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559",
        },
        {
          id: 3,
          institutionName: "Politeknik Negeri Bandung",
          email: "polban3@polban.ac.id",
          phoneNumber: "0222013789",
          address:
            "Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559",
        },
      ],
    };
  }

  renderTableData() {
    return this.state.institutions.map((student, index) => {
      const { id, institutionName, email, phoneNumber, address } = student; //destructuring
      return (
        <tr key={id}>
          <td>{institutionName}</td>
          <td>{email}</td>
          <td>{phoneNumber}</td>
          <td>{address}</td>
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
        <th>Institution Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="institutions-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default TableInstitution;
