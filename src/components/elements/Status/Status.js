import React, { useMemo } from "react";
import clsx from "clsx";

import styles from "./Status.module.scss";

const Status = ({ value }) => {
  const getClassName = useMemo(() => {
    if (value === "On Progress") {
      return "status-progress";
    } else if (value === "DROPPED") {
      return "status-progress";
    } else if (value === "Published") {
      return "status-progress";
    }
  }, [value]);

  return (
    <div className={clsx(styles[getClassName])}>
      <span>{value}</span>
    </div>
  );
};

export default Status;
