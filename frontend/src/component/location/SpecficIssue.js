import React from "react";

const SpecficIssue = (props) => {
  return (
    <div className="specfic_issue_container">
      <div className="specfic_issue_header_container">
        <p className="specfic_issue_header_carrier_name">
          Carrier Name : <span>{props.item.carrier_name}</span>
        </p>
        <p className="specfic_issue_header_carrier_name">
          Issue Date : <span>{props.item.issue_date}</span>
        </p>
      </div>
      {props.item.chemicals.length > 0 && (
        <div className="specfic_issue_item_container">
          <p className="specfic_issue_item_container_title">Chemicals:</p>
          <div className="specfiv_issue_item_wrappper">
            {props.item.chemicals.map((el, i) => (
              <div key={i} className="specfic_issue_one_item">
                <p className="specfic_issue_one_item_name">{el.name}</p>
                <p className="specfic_issue_one_item_amount">{el.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {props.item.instruments.length > 0 && (
        <div className="specfic_issue_item_container">
          <p className="specfic_issue_item_container_title">Instruments:</p>
          <div className="specfiv_issue_item_wrappper">
            {props.item.instruments.map((el, i) => (
              <div key={i} className="specfic_issue_one_item">
                <p className="specfic_issue_one_item_name">{el.name}</p>
                <p className="specfic_issue_one_item_amount">{el.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {props.item.glasswares.length > 0 && (
        <div className="specfic_issue_item_container">
          <p className="specfic_issue_item_container_title">Glasswares:</p>
          <div className="specfiv_issue_item_wrappper">
            {props.item.glasswares.map((el, i) => (
              <div key={i} className="specfic_issue_one_item">
                <p className="specfic_issue_one_item_name">{el.name}</p>
                <p className="specfic_issue_one_item_amount">{el.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecficIssue;
