import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Instrument = (props) => {
  return (
    <div className="issue_chemical_container">
      <div className="issue_chemical_header">
        <p>Instrument issue</p>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="issue_chemical_delete"
          onClick={props.removeIssue}
        />
      </div>
      <div className="chemical_fuzzy_div">
        <input
          className="issue_content_container_top_input"
          type="text"
          placeholder="Instrument Name"
          name="instrument"
          value={props.data.instrument}
          onChange={props.inputHandler}
        />

        <ul className="chemical_fuzzy_ul">
          {props.isFuzzy &&
            props.options.map((el, i) => (
              <li
                onClick={() => props.foundCredentialHandler(el.name, el.id)}
                key={i}
              >
                {el.name}
              </li>
            ))}
        </ul>
        <ul className="chemical_fuzzy_ul">
          {props.isFuzzy && props.loading && <li>loading........</li>}
        </ul>
      </div>
      <input
        className="issue_content_container_top_input"
        type="number"
        placeholder="Amount"
        name="amount"
        value={props.data.amount}
        onChange={props.inputHandler}
      />
    </div>
  );
};

export default Instrument;
