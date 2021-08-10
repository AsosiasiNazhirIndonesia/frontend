import SubmitButton from '../../components/elements/SubmitButton/SubmitButton';
import { history } from '../../store';
import './SignInPage.scss';

export default () => {
    return (
        <div className="signin">
            <div className="signin-form">
                <div className="title">
                    <h2>Login</h2>
                    <hr></hr>
                    <h5>Make sure your Metamask available</h5>
                </div>
                <div className="button">
                    <SubmitButton buttonText={"Login as Admin"}/>
                    <SubmitButton buttonText={"Login as User"} onClick={() => history.push('/dashboard')}/>
                </div>
            </div>
        </div>
    );
}