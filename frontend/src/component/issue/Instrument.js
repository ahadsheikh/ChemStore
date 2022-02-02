import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const unitOption = ["L", "Kg"];

const Instrument = () => {
  return (
    <div className="issue_chemical_container">
      <div className="issue_chemical_header">
        <p>Instrument issue</p>
        <FontAwesomeIcon icon={faTrashAlt} className="issue_chemical_delete" />
      </div>
      <input
        className="issue_content_container_top_input"
        type="text"
        placeholder="Instrument Name"
      />
      <div className="issue_chemical_amount_wrapper">
        <div className="issue_chemical_amount_wrapper_input">
          <input
            className="issue_content_container_top_input"
            type="number"
            placeholder="Amount"
          />
        </div>
        <div className="issue_chemical_amount_wrapper_select">
          <select
            className="issue_content_container_top_input"
            style={{ padding: "1.1rem .5rem" }}
          >
            {unitOption.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Instrument;
