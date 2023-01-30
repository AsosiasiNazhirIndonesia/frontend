import { useState } from 'react';
import InputField from "../components/elements/InputField/InputField";
import SubmitButton from '../components/elements/SubmitButton/SubmitButton';
import "./email-form.scss";

const EmailForm = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    setProcessing(true);
    e.preventDefault();
    onEmailSubmit(email);
    setProcessing(false);
  };

  return (
    <>
    <div className='search-certificate'>
      <h4>Login</h4>
      <div className="search-form">
        <div>
          <p>
            Email <font color="red">*</font>
          </p>
          <InputField
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton
              isProcessing={isProcessing}
              onClick={handleSubmit}
              buttonText={"Login"}
            >
              Send Login Link
          </SubmitButton>
        </div>
      </div>
      </div>
    </>
  );
};

export default EmailForm;
