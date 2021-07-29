import React from 'react';
import Header from '../../components/Header/Header';
import './ProfilePage.scss';
import avatar from '../../assets/images/avatar.svg';

export default () => {
    return (
        <React.Fragment>
            <Header/>
            <div className="profile-page">
                <div className="title">
                    <h2>My Profile</h2>
                </div>
                <div className="details">
                    <div className="user-data">
                        <img src={avatar} />
                        <div className="biodata">
                            <h3>Biodata</h3>
                            <div className="biodata-details">
                                <div className="table-row">
                                    <div className="colOne">
                                        Nama:
                                    </div>
                                    <div className="colTwo">
                                        Josep Mario
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div className="colOne">
                                        Phone Number:
                                    </div>
                                    <div className="colTwo">
                                        08574******
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div className="colOne">
                                        Email:
                                    </div>
                                    <div className="colTwo">
                                        Am*****@gmail.com
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