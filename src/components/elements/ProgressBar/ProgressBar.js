import circleCheck from "../../../assets/icons/circle-check.svg";
import circleBlank from "../../../assets/icons/circle-blank.svg";
import styles from "./ProgressBar.module.scss";
import React from "react";

const ProgressBar = (props) => {
  const composeProgressList = () => {
    const progressLength = props.progress.length;
    return props.progress.map((item, key) => {
      return (
        <React.Fragment>
          <div className={styles["progress-info"]} key={key}>
            <img src={item.success ? circleCheck : circleBlank} alt="" />
            <span>{item.text}</span>
          </div>
          {key <= progressLength - 2 ? (
            <div className={styles["separator"]}></div>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    });
  };

  return <div className={styles["progress-list"]}>{composeProgressList()}</div>;
};

export default ProgressBar;
