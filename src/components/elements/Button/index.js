import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.scss";
import clsx from "clsx";

const Button = (props) => {
  return (
    <button
      className={clsx("my-button", props?.className)}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      disabled={props.disabled}
    >
      {props.isProcessing ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
      ) : (
        props.buttonText
      )}
    </button>
  );
};

export default Button;
