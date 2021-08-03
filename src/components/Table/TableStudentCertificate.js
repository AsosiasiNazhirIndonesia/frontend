import { Component } from "react";
import "./Table.scss";

class TableStudentCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: [
        {
          id: 1,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "On Progress",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
        {
          id: 2,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Done",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
        {
          id: 3,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Failed",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
        {
          id: 4,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Done",
          action: (
            <div>
              <button>View</button>,<button>Edit</button>,
              <button>Delete</button>
            </div>
          ),
        },
        {
          id: 5,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Done",
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
    return this.state.certificates.map((student, index) => {
      const { id, date, documentName, sendTo, signaturedBy, status, action } =
        student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{date}</td>
          <td>{documentName}</td>
          <td>{sendTo}</td>
          <td>{signaturedBy}</td>
          <td>{status}</td>
          <td>{action}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.certificates[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <table className="certificate-table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="content-table">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default TableStudentCertificate;
