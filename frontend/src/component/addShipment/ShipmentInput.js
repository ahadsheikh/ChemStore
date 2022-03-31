import React from "react";

const ShipmentInput = (props) => {
  return (
    <div>
      <label>{props.placeholder}</label>
      <input
        className={["input", props.bckColor].join(" ")}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handler}
      />
    </div>
  );
};

export default ShipmentInput;
