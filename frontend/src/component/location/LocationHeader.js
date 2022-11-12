import React from "react";
import Header from "../add/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const LocationHeader = (props) => {
  return (
    <div style={{display: props.isShow ? "block" : "none"}}>
      <Header text="Add Location">
        <button
          className="central_header_remove_btn"
          onClick={() => props.showModalHandler("create")}
        >
          <FontAwesomeIcon icon={faPlus}/> <span>Create</span>
        </button>
      </Header>
    </div>
  );
};

export default LocationHeader;
