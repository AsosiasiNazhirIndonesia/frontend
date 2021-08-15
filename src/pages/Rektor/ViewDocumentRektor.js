import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import template from "../../assets/images/CertificateTemplate.jpg";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import ModalSign from "./ModalSign";
import linkedin from "../../assets/images/linkedin.png";
import "./ViewDocumentRektor.scss";

const ViewDocumentRektor = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  return (
    <div className="view-document-master">
      <Header />
      <div className="view-document-body">
        <Sidebar menu={menu} />
        <div className="view-document-content">
          <div className="breadcrumb">
            <h1>Manage Certificate</h1>
            {/* breadcrumb path dibuat dinamic sesuai path yang diakses */}
            <h6 className="breadcrumb-path">
              Manage Certificate - View Document
            </h6>
            {/*  */}
          </div>
          <form className="view-document-status">
            <div className="document-name">
              <p className="document-name-title">Document Name :</p>
              <span>Ijasah D4 Politeknik Negeri Bandung</span>
            </div>
            <div className="status">
              <p className="status-title">Status :</p>
              <span>On Progress</span>
            </div>
          </form>
          <div className="sign-progress">
            <h3>Progress Bar :</h3>
          </div>
          <form className="form-certificate">
            <img src={template} alt="template certificate"></img>
          </form>
          <form className="form-qr-code">
            <div className="qr-code">
              <p className="qr-code-title">QR CODE NUMBER :</p>
              {/* tag yang nampung qr code */}
            </div>
          </form>
          <form className="form-digital-sign">
            <div className="digital-signe">
              <p className="digital-sign-title">Digital Signature :</p>
              {/* tag yang nampung qr code */}
            </div>
          </form>
          <form className="form-sign">
            <div className="sign">
              <p>Sign :</p>
              <div className="btn-sign">
                <SubmitButton buttonText="Sign"></SubmitButton>
              </div>
            </div>
          </form>
        </div>
        <ModalSign />
      </div>
    </div>
  );
};

export default ViewDocumentRektor;
