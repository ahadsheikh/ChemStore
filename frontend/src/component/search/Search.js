import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [fuzzyResult, setFuzzyResult] = useState({
    options: [],
    loading: false,
  });

  const getFuzzyResultHandler = (value) => {
    setFuzzyResult({ options: [], loading: true });
    axios
      .get(`/api/management/fuzzysearch/?query=${value}`)
      .then((res) => {
        setFuzzyResult({ options: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err.response);
        setFuzzyResult({ options: [], loading: true });
      });
  };

  const searchInputHandler = (e) => {
    if (e.target.value !== "") {
      getFuzzyResultHandler(e.target.value);
    } else {
      setFuzzyResult({ options: [], loading: false });
    }

    setSearchInput(e.target.value);
  };

  const fuzzysearchHandler = (value) => {
    setSearchInput(value);
    setFuzzyResult({ options: [], loading: false });
  };
  return (
    <div className="search_container">
      <div className="search_input_box_container">
        <div className="search_input_box_div">
          <input
            value={searchInput}
            onChange={searchInputHandler}
            placeholder="Search"
            type="search"
          />
          <button className="search_btn">
            Search
            {/* {" "}
            <FontAwesomeIcon icon={faAddressCard} />{" "} */}
          </button>
        </div>
        <div className="search_fuzzy_container">
          <ul>
            {fuzzyResult.loading && <p>loading........</p>}
            {!fuzzyResult.loading &&
              fuzzyResult.options.map((el, i) => (
                <li onClick={() => fuzzysearchHandler(el.name)} key={i}>
                  {el.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
