import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import template from "../../assets/images/CertificateTemplate.jpg";
import "./CreateCertificate3.scss";

const CreateCertificate3 = (props) => {
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
              Manage Certificate - Create Document
            </h6>
            {/*  */}
          </div>
          <div className="sign-progress">
            <h3>Progress Bar :</h3>
          </div>
          <form className="form-sendTo-assignTo">
            <div className="sendTo-view">
              <p>Send to :</p>
              <span>Anggi Nur Dhamayanty</span>
            </div>
            <div className="assignTo-view">
              <p>Assign to :</p>
              <span>Bambang Ariyanto, Riana Maharani, Tari Saputri</span>
            </div>
          </form>
          <form className="form-certificate">
            <img src={template} alt="template certificate"></img>
          </form>
          <div className="btn-back-next">
            <div className="btn-back">
              <SubmitButton buttonText="Back"></SubmitButton>
            </div>
            <div className="btn-send">
              <SubmitButton buttonText="Send"></SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate3;
