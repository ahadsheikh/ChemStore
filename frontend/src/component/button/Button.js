import React from "react";

const Button = (props) => {
  return (
    <button
      className="central_btn"
      onClick={() => props.handler(props.argument)}
    >
      {props.title}
    </button>
  );
};

export default Button;
