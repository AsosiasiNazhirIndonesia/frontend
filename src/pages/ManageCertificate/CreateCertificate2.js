import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import InputField from "../../components/elements/InputField/InputField";
import "./CreateCertificate2.scss";

const CreateCertificate2 = (props) => {
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
          <form className="form-sendTo">
            <div className="sendTo-input">
              <p>Send to</p>
              <InputField
                type="text"
                name="search-input"
                placeholder="Search User"
                value={value}
              ></InputField>
            </div>
          </form>
          <form className="form-assignTo">
            <div className="assignTo-input">
              <p>Assign To</p>
              <InputField
                type="text"
                name="search-input"
                placeholder="Search User"
                value={value}
              ></InputField>
              <InputField
                type="text"
                name="search-input"
                placeholder="Search User"
                value={value}
              ></InputField>
            </div>
            <div className="btn-add-user">
              <SubmitButton buttonText="Add User"></SubmitButton>
            </div>
          </form>
          <div className="btn-back-next">
            <div className="btn-back">
              <SubmitButton buttonText="Back"></SubmitButton>
            </div>
            <div className="btn-next">
              <SubmitButton buttonText="Next"></SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate2;
