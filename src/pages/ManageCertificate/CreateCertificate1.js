import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import template from "../../assets/images/CertificateTemplate.jpg";
import "./CreateCertificate1.scss";

const CreateCertificate1 = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  const value = {};
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
          <form className="form-name-template">
            <div className="name-template">
              <p>Document Name</p>
              <InputField
                type="text"
                name="search-input"
                placeholder="Search Document Name"
                value={value}
              ></InputField>
            </div>
            <div className="submit-template">
              <p>Upload Template</p>
              <SubmitButton buttonText="Browse Template"></SubmitButton>
            </div>
          </form>
          <div className="form-group">
            <form className="form-detail-certificate">
              <div className="name-user">
                <p>Name</p>
                <InputField
                  type="text"
                  name="name-input"
                  placeholder=""
                  value={value}
                ></InputField>
              </div>
              <div className="no-certificate">
                <p>No Certificate</p>
                <InputField
                  type="text"
                  name="no-certificate-input"
                  placeholder=""
                  value={value}
                ></InputField>
              </div>
              <div className="title">
                <p>Title</p>
                <InputField
                  type="text"
                  name="title-input"
                  placeholder=""
                  value={value}
                ></InputField>
              </div>
              <div className="btn-submit">
                <SubmitButton buttonText="Add"></SubmitButton>
              </div>
            </form>
            <img src={template} alt="template certificate"></img>
          </div>
          <div className="btn-next">
            <SubmitButton buttonText="Next"></SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate1;
