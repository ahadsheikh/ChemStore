import React from "react";

function Input(props) {
  return (
    <input
      className={["input", props.bckColor].join(" ")}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
