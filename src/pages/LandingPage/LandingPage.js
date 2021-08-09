import Footer from '../../components/Footer/Footer';
import SearchCertificate from '../../components/SearchCertifcate/SearchCertificate';
import { history } from '../../store';
import './LandingPage.scss';

export default () => {

    return (
        <div className="landing-page">
            <div className="first-section">
                <h1>BLOCKCHAIN - BASED EDUCATIONAL CERTIFICATES</h1>
                <button className="signin-btn" onClick={() => history.push("/signin")}>Sign In</button>
                <button className="search-btn" onClick={() => history.push("/search_certificate")}>Search Certificate</button>
            </div>
            <div className="second-section">
                <SearchCertificate/>
            </div>
            <Footer/>
        </div>
    );
}