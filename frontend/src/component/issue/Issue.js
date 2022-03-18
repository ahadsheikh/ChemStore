import React, { useState, useLayoutEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Chemical from "./Chemical";
import Instrument from "./Instrument";
import GlassWare from "./GlassWare";
import Location from "../location/Location";
import axios from "../../axios/axios";
import Header from "../add/Header";
import { issueLabHandler } from "../../redux/StoreManagment";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";

const Issue = () => {
  const dispatch = useDispatch();
  const { issueLab } = useSelector((state) => state.StoreManagment);
  const [issueList, setIssueList] = useState([]);
  const [fuzzySearchResult, setFuzzySearchResult] = useState({
    index: -1,
    type: "",
    options: [],
    isloading: true,
  });

  const [isError, setIssError] = useState({ message: "", error: false });

  const [issueCredential, setIssueCredential] = useState({
    carrier_name: "",
    note: "",
    issue_date: "",
  });

  useLayoutEffect(() => {
    dispatch(issueLabHandler(""));
  }, []);

  const issueHandler = (name) => {
    const issueListCopy = [...issueList];
    issueListCopy.push({ material_type: name, amount: "", id: "" });
    setIssueList(issueListCopy);
  };

  const fuzzySearchHandler = (value, name, i) => {
    setFuzzySearchResult({
      index: i,
      type: name,
      options: [],
      isloading: true,
    });
    let url = ``;
    if (name === "chemical") {
      url = `/api/management/fuzzysearch/?type=chemical&query=${value}`;
    } else if (name === "instrument") {
      url = `/api/management/fuzzysearch/?type=instrument&query=${value}`;
    } else url = `/api/management/fuzzysearch/?type=glassware&query=${value}`;
    axios
      .get(url)
      .then((res) => {
        setFuzzySearchResult({
          index: i,
          type: name,
          options: res.data,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const inputHandler = (e, i) => {
    const { name, value } = e.target;
    if (name === "chemical" || name === "instrument" || name === "glassware") {
      fuzzySearchHandler(value, name, i);
    }

    let issueListCopy = [...issueList];
    let issueElement = issueListCopy[i];
    issueElement = {
      ...issueElement,
      [name]: value,
    };
    issueListCopy[i] = issueElement;
    setIssueList(issueListCopy);
  };

  const submitIssueHandler = () => {
    const issueCredentialCopy = { ...issueCredential, consumer_id: issueLab };
    const issueListCopy = [...issueList];
    issueListCopy.forEach((issue) => {
      if (issue.material_type === "CHEMICAL") delete issue.chemical;
      else if (issue.material_type === "INSTRUMENT") delete issue.instrument;
      else if (issue.material_type === "GLASSWARE") delete issue.glassware;
    });
    issueCredentialCopy.objects = issueListCopy;
    setIssError({ message: "", error: false });
    axios
      .post(`/api/management/make-issue/`, issueCredentialCopy)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        setIssError({ message: err.response.data.errors[0], error: true });
      });

    console.log(issueCredentialCopy);
  };

  const foundCredentialHandler = (value, id, index, name) => {
    let issueListCopy = [...issueList];
    let element = issueListCopy[index];
    element[name] = value;
    element.id = id;
    issueListCopy[index] = element;
    setFuzzySearchResult({
      index: -1,
      type: "",
      options: [],
      isloading: true,
    });
    setIssueList(issueListCopy);
  };

  const removeIssueHandler = (index) => {
    let issueListCopy = [...issueList];
    issueListCopy.splice(index, 1);
    setIssueList(issueListCopy);
  };

  const issueInputHandler = (e) => {
    const { name, value } = e.target;
    setIssueCredential({ ...issueCredential, [name]: value });
  };

  return (
    <>
      {isError.error && <Error message={isError.message} />}
      <div className="issue_container">
        <Header text="Create An Issue" />
        <div className="issue_content_container">
          <div className="issue_content_container_top">
            <input
              className="issue_content_container_top_input"
              type="text"
              placeholder="Refferer Name"
              name="carrier_name"
              value={issueCredential.carrier_name}
              onChange={issueInputHandler}
            />
            {/* <select
              className="issue_content_container_top_input"
              name="cars"
              id="cars"
            >
              <option value="volvo">Refferer Type</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select> */}
            <input
              className="issue_content_container_top_input"
              type="date"
              id="timeAndDate"
              name="issue_date"
              value={issueCredential.issue_date}
              onChange={issueInputHandler}
            />
            <textarea
              className="issue_content_container_top_input"
              type="text"
              placeholder="Notes"
              id="comments"
              name="note"
              value={issueCredential.note}
              onChange={issueInputHandler}
            />
            <p>Location : </p>
            <div
              style={{
                height: "20rem",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <Location isShow={false} />
            </div>
            {issueList.map((el, i) => {
              if (el.material_type === "CHEMICAL") {
                return (
                  <Chemical
                    key={i}
                    inputHandler={(e) => inputHandler(e, i)}
                    data={el}
                    options={fuzzySearchResult.options}
                    isFuzzy={fuzzySearchResult.index === i}
                    loading={fuzzySearchResult.isloading}
                    removeIssue={() => removeIssueHandler(i)}
                    foundCredentialHandler={(value, id) =>
                      foundCredentialHandler(value, id, i, "chemical")
                    }
                  />
                );
              } else if (el.material_type === "INSTRUMENT") {
                return (
                  <Instrument
                    key={i}
                    inputHandler={(e) => inputHandler(e, i)}
                    data={el}
                    options={fuzzySearchResult.options}
                    isFuzzy={fuzzySearchResult.index === i}
                    loading={fuzzySearchResult.isloading}
                    removeIssue={() => removeIssueHandler(i)}
                    foundCredentialHandler={(value, id) =>
                      foundCredentialHandler(value, id, i, "instrument")
                    }
                  />
                );
              } else if (el.material_type === "GLASSWARE") {
                return (
                  <GlassWare
                    key={i}
                    inputHandler={(e) => inputHandler(e, i)}
                    data={el}
                    options={fuzzySearchResult.options}
                    isFuzzy={fuzzySearchResult.index === i}
                    loading={fuzzySearchResult.isloading}
                    removeIssue={() => removeIssueHandler(i)}
                    foundCredentialHandler={(value, id) =>
                      foundCredentialHandler(value, id, i, "glassware")
                    }
                  />
                );
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
                <Dropdown.Item onClick={() => issueHandler("CHEMICAL")}>
                  Chemical
                </Dropdown.Item>
                <Dropdown.Item onClick={() => issueHandler("INSTRUMENT")}>
                  Instrument
                </Dropdown.Item>
                <Dropdown.Item onClick={() => issueHandler("GLASSWARE")}>
                  Glass Ware
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="dark" onClick={submitIssueHandler}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Issue;
