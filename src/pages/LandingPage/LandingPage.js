import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import SearchCertificate from '../../components/SearchCertifcate/SearchCertificate';
import { history } from '../../store';
import './LandingPage.scss';
import logo from '../../assets/images/ani-logo-img.png';

const LandingPage = (props) => {
    // const myRef = useRef(null);
    // const executeScroll = () => myRef.current.scrollIntoView();
    // const contractAddress = new URLSearchParams(props.location.search).get("contract_address");
    // const tokenId = new URLSearchParams(props.location.search).get("token_id");

    // useEffect(() => {
    //     if (contractAddress && tokenId) {
    //         executeScroll();
    //     }
    // }, [])

    return (
        <div className="landing-page">
            <div className="first-section">
                <h1>BLOCKCHAIN DIGITAL CERTIFICATE</h1><br/>
                <br/>
                <button className="signin-btn" onClick={() => history.push("/signin")}>Sign In</button>
                {/* <button className="search-btn" onClick={() => executeScroll()}>Search Certificate</button> */}
            </div>
            {/* <div className="second-section" ref={myRef}>
                <SearchCertificate contractAddress={contractAddress} tokenId={tokenId}/>
            </div> 
            <Footer/>*/}
        </div>
    );
}

export default withRouter(LandingPage);