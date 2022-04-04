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
      />
    </div>
  );
};

export default ShipmentInput;
