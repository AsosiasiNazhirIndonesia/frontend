import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = (props) => {
  return (
    <button
      className={clsx(styles["my-button"], props?.className)}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      disabled={props.disabled}
      type={props.type}
    >
      {props.isProcessing ? (
        <FontAwesomeIcon icon={faSpinner} className={styles["fa-spinner"]} />
      ) : (
        props.buttonText
      )}
    </button>
  );
};

export default Button;
