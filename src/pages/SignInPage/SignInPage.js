import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SubmitButton from '../../components/elements/SubmitButton/SubmitButton';
import API from '../../services/api';
import web3 from '../../services/web3';
import { history } from '../../store';
import './SignInPage.scss';

export default () => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const login = async () => {
        if (!web3) {
            return;
        }
        const accounts = await web3.eth.getAccounts();
        const user = await API.getUserByPublicKey(accounts[0]);
        const message = `DIGICERT${user.login_nonce}`;
        const dataToSign = web3.utils.sha3(message);
        const signature = await web3.eth.personal.sign(dataToSign, accounts[0]);
        console.log(signature);
        const address = await web3.eth.personal.ecRecover(dataToSign, signature);
        console.log(address);
    }

    return (
        <div className="signin">
            <div className="signin-form">
                <div className="title">
                    <h2>Login</h2>
                    <hr></hr>
                    <h5>Make sure you choose the right account on Metamask</h5>
                </div>
                {web3 ?
                    <div className="button">
                        <SubmitButton buttonText={"Login as Admin"}/>
                        <SubmitButton buttonText={"Login as User"} onClick={() => login()}/>
                    </div> : <FontAwesomeIcon icon={faSpinner} className="big-spinner"></FontAwesomeIcon>}
            </div>
        </div>
    );
}