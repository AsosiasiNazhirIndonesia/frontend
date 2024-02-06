import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./ProfilePageContent.scss";
import avatar from "../../assets/images/avatar.svg";
import { withRouter } from "react-router-dom";
import { ACTOR } from "../../constants/component.constant";
import API, { HOST } from "../../services/api";
import TableCertificate from "../../components/Table/TableCertificate";

const Profile = (props) => {
  const [actor, setActor] = useState({});
  const actorType = new URLSearchParams(props.location.search).get(
    "actor_type"
  );
  const actorPubKey = new URLSearchParams(props.location.search).get(
    "actor_public_key"
  );
  const [certificates, setCertificates] = useState([]);

  const getAllCertificates = async (actor, offset, limit) => {
    let results = [];
    if (actorType == ACTOR.USER) {
      results = await API.getCertificatesByUser(actor.user_id, offset, limit);
    } else if (actorType === ACTOR.ADMIN) {
      results = await API.getCertificatesByAdmin(actor.admin_id, offset, limit);
    }
    
    const newCertificates = [];
    const composeApprovers = (approvers) => {
      let names = '';
      for(const approver of approvers) {
        names = names + ` ,${approver.User.name}`;
      }

      return names.substring(2, names.length);
    }
    
    for (const result of results) {
      newCertificates.push({
        id: result.certificate_id,
        date: result.date,
        documentName: result.name,
        sendTo: result.User.name,
        signaturedBy: composeApprovers(result.CertificateSigners),
        status: "",
        scAddress: result.sc_address,
        tokenId: result.token_id,
      });
    }
    if (newCertificates.length > 0) {
      setCertificates(newCertificates);
    }
  }

  const getActor = async () => {
    let newActor;
    if (actorType === ACTOR.ADMIN) {
      newActor = await API.getAdminByPublicKey(actorPubKey);
    } else if (actorType === ACTOR.USER) {
      newActor = await API.getUserByPublicKey(actorPubKey); 
    }
    setActor(newActor);
    if (newActor) {
      getAllCertificates(newActor, 0, 20);
    }
  };

  useEffect(() => {
    getActor();
  }, [actorPubKey]);



  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className="profile-page">
        <div className="title">
          <h2>My Profile</h2>
        </div>
        <div className="details">
          <div className="user-data">
            {/* <img
              src={actor && actor.photo ? `${HOST}/api/files/${actor.photo}` : avatar}
            /> */}
            <div className="biodata">
              <div className="biodata-details">
                <div className="table-row">
                  <div className="colOne">Nama:</div>
                  <div className="colTwo">{actor ? actor.name : ''}</div>
                </div>
                <div className="table-row">
                  <div className="colOne">Public Key:</div>
                  <div className="colTwo">{actor ? actor.public_key : ''}</div>
                </div>
                <div className="table-row">
                  <div className="colOne">Phone Number:</div>
                  <div className="colTwo">{actor ? actor.phone_number : ''}</div>
                </div>
                <div className="table-row">
                  <div className="colOne">Email:</div>
                  <div className="colTwo">{actor ? actor.email : ''}</div>
                </div>
                <div className="table-row">
                  <div className="colOne">Address:</div>
                  <div className="colTwo">{actor ? actor.address : ''}</div>
                </div>
              </div>
            </div>
          </div>
          {/* {certificates.length > 0 ?
          <div className="certificates-user">
            <TableCertificate
              certificates={certificates}
              actor={actor}
            />
          </div> : <></>} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(withRouter(Profile));
