import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SubmitButton from "../../../components/elements/SubmitButton/SubmitButton";
import "./ViewDataUser.scss";

const ViewDataUser = (props) => {
  const menu = new URLSearchParams(props.location.search).get("token");
  return (
    <div className="user-master">
      <Header />
      <div className="user-body">
        <Sidebar menu={menu} />
        <div className="user-content">
          <div className="breadcrumb">
            <h1>User Master</h1>
            {/* breadcrumb path dibuat dinamic sesuai path yang diakses */}
            <h6 className="breadcrumb-path">
              User Master - Add/Edit/View User
            </h6>
            {/*  */}
          </div>
          <form className="form-base-information">
            <div>
              <p className="title-name">Full Name :</p>
              <p className="name">Anggi Nur Dhamayanty</p>
            </div>
            <div>
              <p className="title-email">Email :</p>
              <p className="email">Nuranggie@gmail.co.id</p>
            </div>
            <div>
              <p className="title-phoneNumber">Phone Number :</p>
              <p className="phoneNumber">08123456789</p>
            </div>
            <div>
              <p className="title-photo">Photo :</p>
              <img src="#" alt="photo profile"></img>
            </div>
          </form>
          <form className="form-role-information">
            <div>
              <p className="title-role">Role :</p>
              <p className="role">Student</p>
            </div>
          </form>
          <form className="form-institution-information">
            <div>
              <p className="title-institution">Institution :</p>
              <p className="institution">Politeknik Negeri Bandung</p>
            </div>
          </form>
          <div className="btn-back">
            <SubmitButton buttonText="Back" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDataUser;
