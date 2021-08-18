import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../../components/elements/InputField/InputField";
import TableInstitution from "../../../components/Table/TableInstitution";
import AddEditInstitution from "./AddEditInstitution";
import Delete from "../../../components/Popup/Delete";
import Pagination from "../../../components/elements/Pagination/Pagination";
import { useState } from "react";
import "./InstitutionMaster.scss";

const InstitutionMaster = (props) => {
  const value = {};

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [institutions, setInstitutions] = useState([
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
  ]);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = institutions.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="institution-content">
      <div className="breadcrumb">
        <h1>Institution Master</h1>
      </div>
      <div className="bef-table">
        <div className="btn-add-institution">
          <SubmitButton
            buttonText={"Add Institution"}
            onClick={() => setIsAdd(true)}
          ></SubmitButton>
        </div>
        <div className="search-input">
          <InputField
            type="text"
            name="search-input"
            placeholder="Search Institution Name"
            value={value}
          />
        </div>
      </div>
      <TableInstitution
        institutions={currentItems}
        setIsEdit={setIsEdit}
        setIsDelete={setIsDelete}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItem={institutions.length}
        paginate={paginate}
      />
      <AddEditInstitution
        add={isAdd}
        edit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
      />
      <Delete delete={isDelete} setIsDelete={setIsDelete} />
    </div>
  );
};

export default withRouter(InstitutionMaster);
