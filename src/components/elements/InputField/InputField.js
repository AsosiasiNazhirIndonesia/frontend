import React from "react";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InputField.scss";
import { INPUT_STATUS } from "../../../constants/component.constant";
import DatePicker from "react-date-picker";
import Dropdown from "react-dropdown";

export default (props) => {
  let input;

  switch (props.type) {
    case "text":
    case "password":
      input = (
        <input
          className="text-input"
          disabled={props.disabled ? props.disabled : false}
          type={props.type ? props.type : "text"}
          value={props.value.value}
          name={props.name}
          placeholder={props.placeholder}
          onChange={(e) => (props.onChange ? props.onChange(e) : "")}
          autoComplete="off"
        />
      );
      break;
    case "date":
      input = (
        <DatePicker
          value={props.value.value}
          name={props.name}
          onChange={(e) => props.onChange(e)}
          format={"dd-MM-yyyy"}
        />
      );
      break;
    case "dropdown":
      input = (
        <Dropdown
          name={props.name}
          options={props.options}
          onChange={(e) => (props.onChange ? props.onChange(e) : "")}
          value={props.value.value}
        />
      );
      break;
  }

  return (
    <div className="inputField">
      <span
        className={
          props.value.status === INPUT_STATUS.INVALID
            ? "input-span error"
            : props.value.status === INPUT_STATUS.VALID
            ? "input-span success"
            : "input-span default"
        }
      >
        {input}
        {props.value.status === INPUT_STATUS.VALID ? (
          <FontAwesomeIcon icon={faCheckCircle} className="faCheckCircle" />
        ) : (
          <div></div>
        )}
        {props.value.status === INPUT_STATUS.INVALID ? (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="faExclamationCircle"
          />
        ) : (
          <div></div>
        )}
      </span>
      {props.value.status === INPUT_STATUS.INVALID ? (
        <small className="small-error">{props.value.errorMessage}</small>
      ) : (
        <div></div>
      )}
    </div>
  );
};
