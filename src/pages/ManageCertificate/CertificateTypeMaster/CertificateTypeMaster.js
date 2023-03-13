import { withRouter } from "react-router-dom";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
// import AddEditInstitution from "./AddEditInstitution";
import { useEffect, useState } from "react";
import ModalCertificateType from "../../../components/Modal/ModalCertificateType";
import Delete from "../../../components/Popup/Delete";
import TableCertificateTypes from "../../../components/Table/TableCertificateTypes";
import Pagination from "../../../components/elements/Pagination/Pagination";
import API from "../../../services/api";
import styles from "./CertificateTypeMaster.module.scss";

const CertificateTypeMaster = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [certTypes, setCertTypes] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  const [modalChange, setModalChange] = useState(false);

  useEffect(() => {
    getAllCertificateTypes(currentPage - 1, itemsPerPage);
  }, []);

  const getAllCertificateTypes = async (offset, limit) => {
    if (!isLoading) {
      setLoading(true);
    }
    try {
      const results = await API.getAllCertificateTypes(offset, limit);
      const certTypes = [];
      for (const result of results) {
        certTypes.push({
          name: result?.type,
          id: result?.certificate_type_id,
        });
      }
      if (certTypes.length > 0) {
        setCertTypes(certTypes);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const response = await API.deleteCertificateType({
        certificate_type_id: selectedCert?.id,
      });
      setSelectedCert(null);
      getAllCertificateTypes(currentPage - 1, itemsPerPage);
    } catch (error) {
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className={styles["certificatetype-content"]}>
      <div className={styles["breadcrumb"]}>
        <h1>Certificate Type Master</h1>
      </div>
      <div className={styles["bef-table"]}>
        <div className={styles["btn-add-certificatetype"]}>
          <SubmitButton
            buttonText={"Add Certificate Type"}
            onClick={() => setModalChange(true)}
          ></SubmitButton>
        </div>
      </div>
      <TableCertificateTypes
        loading={isLoading}
        // setInputValue={setInputValue}
        certTypes={certTypes}
        // setIsEdit={setIsEdit}
        onDelete={(certType) => {
          setIsDelete(true);
          setSelectedCert(certType);
        }}
        onEdit={(certType) => {
          setModalChange(true);
          setSelectedCert(certType);
        }}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItem={certTypes.length}
        setCurrentPage={setCurrentPage}
        reloadFunction={getAllCertificateTypes}
      />
      {modalChange && (
        <ModalCertificateType
          onCancel={() => {
            setModalChange(false);
            if (selectedCert) {
              setSelectedCert(null);
            }
          }}
          onSubmitted={() => {
            getAllCertificateTypes(currentPage - 1, itemsPerPage);
            setModalChange(false);
            if (selectedCert) {
              setSelectedCert(null);
            }
          }}
          selectedData={selectedCert}
          visible={modalChange}
          title={"Add Certificate Type"}
        />
      )}
      {/* <AddEditInstitution
        add={isAdd}
        edit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
        submit={submit}
        update={update}
        getInputValue={getInputValue}
        setInputValue={setInputValue}
      /> */}
      <Delete
        loading={isLoadingDelete}
        delete={isDelete}
        setIsDelete={setIsDelete}
        del={handleDelete}
      />
    </div>
  );
};

export default withRouter(CertificateTypeMaster);
