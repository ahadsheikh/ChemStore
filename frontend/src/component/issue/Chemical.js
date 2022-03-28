import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const unitOption = ["ml"];

const Chemical = (props) => {

  return (
    <div className="issue_chemical_container">
      <div className="issue_chemical_header">
        <p>Chemical issue</p>
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
          placeholder="Chemical Name"
          name="chemical"
          value={props.data.chemical}
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
      <div className="issue_chemical_amount_wrapper">
        <div className="issue_chemical_amount_wrapper_input">
          <input
            className="issue_content_container_top_input"
            type="number"
            placeholder="Amount"
            name="quantity"
            value={props.data.quantity}
            onChange={props.inputHandler}
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

export default Chemical;
