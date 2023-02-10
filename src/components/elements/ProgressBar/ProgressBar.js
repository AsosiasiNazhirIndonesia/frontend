import circleCheck from "../../../assets/icons/circle-check.svg";
import circleBlank from "../../../assets/icons/circle-blank.svg";
import styles from "./ProgressBar.module.scss";
import React from "react";

const ProgressBar = (props) => {
  const composeProgressList = () => {
    return props.progress.map((item, key) => {
      return (
        <div class={styles['progress-info-container']}>
          <div className={styles["progress-info"]} key={key}>
            <img
              src={item.success ? circleCheck : circleBlank}
              alt=""
              className={styles["progress-icon"]}
            />
            <span>{item.text}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles["progress-list"]}>
      {composeProgressList()}
      {/* <div className={styles["separator"]}></div> */}
    </div>
  );
};

export default ProgressBar;
