import React from "react";

const Header = (props) => {
  return (
    <div className="add_header_container">
      <p>{props.text}</p>
      {props.children}
    </div>
  );
};

export default Header;
