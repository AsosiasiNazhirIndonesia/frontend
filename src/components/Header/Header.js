import './Header.scss';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.svg';

export default () => {
    return (
        <div className="header">
            <div className="header-left">
                <img src={logo}></img>
                <div className="title">
                    <h4>Blockchain-Based</h4>
                    <h4>Digital Certifiates</h4>
                </div>
            </div>
            <div className="header-right">
                {/* <h5 className="to-login">Log In</h5> */}
                <span>Josep Mario</span>
                <img src={avatar}/>
            </div>
        </div>
    );
}