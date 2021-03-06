import React from "react";

function Input(props) {
  return (
    <input
      className={["input", props.bckColor].join(" ")}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.handler}
      readOnly={props.readOnly}
      required={props.isRequired}
    />
  );
}

export default Input;
