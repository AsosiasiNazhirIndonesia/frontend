import { Component } from "react";
import { Link } from "react-router-dom";
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
        },
        {
          id: 2,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Done",
        },
        {
          id: 3,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Failed",
        },
        {
          id: 4,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Done",
        },
        {
          id: 5,
          date: "10 Mei 2021",
          documentName: "Ijasah D4 Politeknik Negeri Bandung",
          sendTo: "Anggi Nur Dhamayanty",
          signaturedBy: "Bambang Arianto, Riana Maharani, Tari Saputri",
          status: "Done",
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
          <td>{date}</td>
          <td>{documentName}</td>
          <td>{sendTo}</td>
          <td>{signaturedBy}</td>
          <td>{status}</td>
          <td>
            <Link>View</Link>, <Link>Edit</Link>, <Link>Delete</Link>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Date</th>
        <th>Document Name</th>
        <th>Send To</th>
        <th>Signatured By</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    );
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
