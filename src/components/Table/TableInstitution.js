import { Component } from "react";
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
          action: (
            <div>
              <button>Edit</button>,<button>Delete</button>
            </div>
          ),
        },
        {
          id: 2,
          institutionName: "Politeknik Negeri Bandung",
          email: "polban2@polban.ac.id",
          phoneNumber: "0222013789",
          address:
            "Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559",
          action: (
            <div>
              <button>Edit</button>,<button>Delete</button>
            </div>
          ),
        },
        {
          id: 3,
          institutionName: "Politeknik Negeri Bandung",
          email: "polban3@polban.ac.id",
          phoneNumber: "0222013789",
          address:
            "Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559",
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
    return this.state.institutions.map((student, index) => {
      const { id, institutionName, email, phoneNumber, address, action } =
        student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{institutionName}</td>
          <td>{email}</td>
          <td>{phoneNumber}</td>
          <td>{address}</td>
          <td>{action}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.institutions[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
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

export default TableInstitution;
