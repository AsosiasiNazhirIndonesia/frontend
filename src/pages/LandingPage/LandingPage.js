import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import SearchCertificate from '../../components/SearchCertifcate/SearchCertificate';
import { history } from '../../store';
import ViewCertificate from '../ManageCertificate/ViewCertificate';
import './LandingPage.scss';

export default () => {
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();

    return (
        <div className="landing-page">
            <div className="first-section">
                <h1>BLOCKCHAIN - BASED EDUCATIONAL CERTIFICATES</h1>
                <button className="signin-btn" onClick={() => history.push("/signin")}>Sign In</button>
                <button className="search-btn" onClick={() => executeScroll()}>Search Certificate</button>
            </div>
            <div className="second-section" ref={myRef}>
                <SearchCertificate/>
            </div>
            <Footer/>
        </div>
    );
}