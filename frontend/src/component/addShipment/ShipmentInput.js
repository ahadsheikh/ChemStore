import React from "react";

const ShipmentInput = (props) => {
  return (
    <div>
      {props.labelShow && <label>{props.placeholder}</label>}
      <input
        className={["input", props.bckColor].join(" ")}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handler}
        readOnly={props.readOnly}
        style={{color: props.readOnly ? "#9e9898": "white"}}
      />
    </div>
  );
};

export default ShipmentInput;
