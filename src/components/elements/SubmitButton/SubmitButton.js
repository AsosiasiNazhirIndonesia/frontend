
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SubmitButton.scss";

export default (props) => {
    return (
        <button 
            className="submit-btn" 
            onClick={(e) => {if (props.onClick) { props.onClick(e) }}} 
            disabled={props.disabled}>
                {props.isProcessing ? 
                <FontAwesomeIcon icon={faSpinner} className="fa-spinner"/> :
                props.buttonText}
        </button>
    );
}