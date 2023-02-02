import circleCheck from "../../../assets/icons/circle-check.svg";
import circleBlank from "../../../assets/icons/circle-blank.svg";
import "./ProgressBar.scss";
import React from "react";

export default (props) => {
  console.log(props)
  const composeProgressList = () => {
    const progressLength = props.progress.length;
    return props.progress.map((item, key) => {
      return (
        <React.Fragment>
          <div className="progress-info" key={key}>
            <img src={item.success ? circleCheck : circleBlank} />
            <span>{item.text}</span>
          </div>
          {key <= progressLength - 2 ? (
            <div className="separator"></div>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    });
  };

  return <div className="progress-list">{composeProgressList()}</div>;
};
