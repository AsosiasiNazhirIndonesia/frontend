import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import "./ViewCertificate.scss";

const ViewCertificate = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  return (
    <div className="certificate-master">
      <Header />
      <div className="certificate-body">
        <Sidebar menu={menu} />
        <div className="certificate-content">
          <div className="breadcrumb">
            <h1>Manage Certificate</h1>
            {/* breadcrumb path dibuat dinamic sesuai path yang diakses */}
            <h6 className="breadcrumb-path">
              Manage Certificate - View Document
            </h6>
            {/*  */}
          </div>
          <form className="form-document-status">
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
          <form className="form-view-document">
            <div className="view-before-signing">
              <p>View document before signing :</p>
              <div className="btn-view">
                <SubmitButton buttonText="View"></SubmitButton>
              </div>
              <div className="btn-download">
                <SubmitButton buttonText="Download"></SubmitButton>
              </div>
            </div>
            <div className="view-after-signed">
              <p>View document after signed :</p>
              <div className="btn-view">
                <SubmitButton buttonText="View"></SubmitButton>
              </div>
              <div className="btn-download">
                <SubmitButton buttonText="Download"></SubmitButton>
              </div>
            </div>
          </form>
          <div className="btn-done">
            <SubmitButton buttonText="Back"></SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCertificate;
