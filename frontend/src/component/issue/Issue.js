import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Chemical from "./Chemical";
import Instrument from "./Instrument";
import GlassWare from "./GlassWare";

const Issue = () => {
  const [issueList, setIssueList] = useState([]);
  const issueHandler = (id) => {
    const issueListCopy = [...issueList];
    issueListCopy.push(id);
    setIssueList(issueListCopy);
  };

  return (
    <>
      <div className="issue_container">
        <div className="issue_header_container">
          <p>Request An Order</p>
        </div>
        <div className="issue_content_container">
          <div className="issue_content_container_top">
            <input
              className="issue_content_container_top_input"
              type="text"
              placeholder="Refferer Name"
              id="refferer "
            />
            <select
              className="issue_content_container_top_input"
              name="cars"
              id="cars"
            >
              <option value="volvo">Refferer Type</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <input
              className="issue_content_container_top_input"
              type="date"
              id="timeAndDate"
            />
            <textarea
              className="issue_content_container_top_input"
              type="text"
              placeholder="Comments"
              id="comments"
            />
            {issueList.map((el, i) => {
              if (el === 1) {
                return <Chemical key={i} />;
              } else if (el === 2) {
                return <Instrument key={i} />;
              } else if (el === 3) {
                return <GlassWare key={i} />;
              }
            })}
            <Dropdown>
              <Dropdown.Toggle
                variant="transparent"
                id="dropdown-basic"
                style={{
                  width: "0rem",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                }}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ fontSize: "2.5rem" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ fontSize: "1.6rem" }}>
                <Dropdown.Item onClick={() => issueHandler(1)}>
                  Chemical
                </Dropdown.Item>
                <Dropdown.Item onClick={() => issueHandler(2)}>
                  Instrument
                </Dropdown.Item>
                <Dropdown.Item onClick={() => issueHandler(3)}>
                  Glass Ware
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="dark">Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Issue;
