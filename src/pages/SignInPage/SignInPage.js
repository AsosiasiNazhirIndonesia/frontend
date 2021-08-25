import { faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import jsConvert from 'js-convert-case';
import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SubmitButton from '../../components/elements/SubmitButton/SubmitButton';
import { ACTOR, ACTOR_TOKEN } from '../../constants/component.constant';
import { setActorType } from '../../modules/actions/actor.action';
import API from '../../services/api';
import web3 from '../../services/web3';
import { history } from '../../store';
import './SignInPage.scss';

const SignInPage = (props) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Test');

    const userLogin = async () => {
        if (!web3) {
            return;
        }
        setIsProcessing(true);
        setIsFailed(false);
        try {
            const accounts = await web3.eth.getAccounts();
            const user = await API.getUserByPublicKey(accounts[0]);
            if (!user) {
                throw 'User with your address not found';
            }
            const message = `DIGICERT${user.login_nonce}`;
            const dataToSign = web3.utils.sha3(message);
            const signature = await web3.eth.personal.sign(dataToSign, accounts[0]);
            const result = await API.userLogin({user_id: user.user_id, signature});
            localStorage.setItem(ACTOR_TOKEN.DIGICERT_USER_TOKEN, result.token);
            props.setActorType(ACTOR.USER);
            history.push('/dashboard/USER');
        } catch (e) {
            setIsFailed(true);
            setErrorMessage(typeof e === 'string' ? e : e.message);
        }
        setIsProcessing(false);
    }

    const adminLogin = async () => {
        if (!web3) {
            return;
        }
        setIsProcessing(true);
        setIsFailed(false);
        try {
            const accounts = await web3.eth.getAccounts();
            const admin = await API.getAdminByPublicKey(accounts[0]);
            if (!admin) {
                throw 'Admin with your address not found';
            }
            const message = `DIGICERT${admin.login_nonce}`;
            const dataToSign = web3.utils.sha3(message);
            const signature = await web3.eth.personal.sign(dataToSign, accounts[0]);
            const result = await API.adminLogin({admin_id: admin.admin_id, signature});
            localStorage.setItem(ACTOR_TOKEN.DIGICERT_ADMIN_TOKEN, result.token);
            props.setActorType(ACTOR.ADMIN);
            history.push('/dashboard/ADMIN');
        } catch (e) {
            setIsFailed(true);
            setErrorMessage(typeof e === 'string' ? e : e.message);
        }
        setIsProcessing(false);
    }

    return (
        <div className="signin">
            <div className="signin-form">
                <div className="title">
                    <h2>Login</h2>
                    <hr></hr>
                    <h5>Make sure you choose the right account on Metamask</h5>
                </div>
                {isFailed ? 
                    <span className="error-flag"><FontAwesomeIcon icon={faExclamationCircle} className="error-icon"/>{errorMessage}</span> : <></>}
                {web3 ?
                    <div className="button">
                        <SubmitButton isProcessing={isProcessing} buttonText={"Login as Admin"} onClick={() => adminLogin()}/>
                        <SubmitButton isProcessing={isProcessing} buttonText={"Login as User"} onClick={() => userLogin()}/>
                    </div> : <FontAwesomeIcon icon={faSpinner} className="big-spinner"></FontAwesomeIcon>}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        async setActorType(type) {
            dispatch(setActorType(type));
        }
    }
};
  
export default connect(null, mapDispatchToProps)(React.memo(SignInPage));