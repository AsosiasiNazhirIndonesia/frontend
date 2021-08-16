import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './ProfilePage.scss';
import avatar from '../../assets/images/avatar.svg';
import { withRouter } from 'react-router-dom';
import { ACTOR } from '../../constants/component.constant';
import API from '../../services/api';

const Profile = (props) => {
    const [actor, setActor] = useState({});
    const [histories, setHistories] = useState([]);
    const actorType = new URLSearchParams(props.location.search).get("actor_type");
    const actorPubKey = new URLSearchParams(props.location.search).get("actor_public_key");
    
    const getActor = async () => {
        if (actorType === ACTOR.ADMIN) {
            setActor(await API.getAdminByPublicKey(actorPubKey));
        } else if (actorType === ACTOR.USER) {
            setActor(await API.getUserByPublicKey(actorPubKey));
        }
    }

    useEffect(() => {
        getActor();
    }, [])

    return (
        <React.Fragment>
            <Header/>
            <div className="profile-page">
                <div className="title">
                    <h2>My Profile</h2>
                </div>
                <div className="details">
                    <div className="user-data">
                        <img src={actor.photo ? '' : avatar} />
                        <div className="biodata">
                            <h3>Biodata</h3>
                            <div className="biodata-details">
                                <div className="table-row">
                                    <div className="colOne">
                                        Nama:
                                    </div>
                                    <div className="colTwo">
                                        {actor.name}
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div className="colOne">
                                        Phone Number:
                                    </div>
                                    <div className="colTwo">
                                        {actor.phone_number}
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div className="colOne">
                                        Email:
                                    </div>
                                    <div className="colTwo">
                                        {actor.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="history">
                        <div className="detail-history">
                            <span className="title-history">Institution</span>
                            <span className="title-value">Politeknik Negeri Bandung</span>  
                        </div>
                        <div className="detail-history">
                            <span className="title-history">Role</span>
                            <span className="title-value">Student</span>  
                        </div>
                        <div className="detail-history">
                            <span className="title-history">Start Date</span>
                            <span className="title-value">February 2021</span>  
                        </div>
                        <div className="detail-history">
                            <span className="title-history">End Date</span>
                            <span className="title-value">Until Now</span>  
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    );
}

export default React.memo(withRouter(Profile));