import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import SearchCertificate from '../../components/SearchCertifcate/SearchCertificate';
import { history } from '../../store';
import './LandingPage.scss';

const LandingPage = (props) => {
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();
    const contractAddress = new URLSearchParams(props.location.search).get("contract_address");

    useEffect(() => {
        if (contractAddress) {
            executeScroll();
        }
    }, [])

    return (
        <div className="landing-page">
            <div className="first-section">
                <h1>TELKOM BLOCKCHAIN - BASED EDUCATIONAL CERTIFICATES</h1>
                <button className="signin-btn" onClick={() => history.push("/signin")}>Sign In</button>
                <button className="search-btn" onClick={() => executeScroll()}>Search Certificate</button>
            </div>
            <div className="second-section" ref={myRef}>
                <SearchCertificate contractAddress={contractAddress}/>
            </div>
            <Footer/>
        </div>
    );
}

export default withRouter(LandingPage);