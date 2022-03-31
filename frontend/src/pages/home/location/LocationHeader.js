import React from "react";
import Header from "../../../component/add/Header";

const LocationHeader = (props) => {
  return (
    <div style={{ display: props.isShow ? "block" : "none" }}>
      <Header text="Add Location">
      </Header>
    </div>
  );
};

export default LocationHeader;
