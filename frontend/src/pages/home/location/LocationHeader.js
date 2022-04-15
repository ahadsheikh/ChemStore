import React from "react";
import Header from "../../../component/add/Header";

const LocationHeader = (props) => {
  return (
    <div style={{ display: props.isShow ? "block" : "none" }}>
      <Header text="Location" />
    </div>
  );
};

export default LocationHeader;
