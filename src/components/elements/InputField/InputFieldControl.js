import clsx from "clsx";
import React from "react";
import { Controller } from "react-hook-form";
import "./InputField.scss";

const InputFieldControl = (props) => {
  return (
    <div className={clsx("inputField")}>
      {props?.label && <p style={{ marginBottom: '4px' }}>{props?.label}</p>}
      <span
        className={clsx(
          props.errors?.message ? "input-span error" : "input-span default",
          props?.type === "dropdown" ? "overflow-visible" : ""
        )}
        style={{ paddingLeft: props.icon ? "44px" : "16px" }}
      >
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <input
              {...field}
              className={clsx("text-input")}
              disabled={props.disabled ? props.disabled : false}
              type={props.type ? props.type : "text"}
              placeholder={props.placeholder}
              autoComplete="off"
            />
          )}
        />
      </span>
      {props?.errors?.message && (
        <span className="absolute text-sr right-2 top-1 text-danger">
          {props?.errors?.message}
        </span>
      )}
    </div>
  );
};

export default InputFieldControl;
