import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import axios from "../../axios/axios";
import Header from "../add/Header";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [type, setType] = useState("chemical");
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("Chemical");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ error: false, message: "" });

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchHandler = () => {
    setLoading(true);
    axios
      .get(`/api/management/fuzzysearch/?type=${type}&query=${searchInput}`)
      .then((res) => {
        setLoading(false);
        setSearchResult(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setIsError({ error: true, message: "Something Went Wrong" });
      });
  };

  const selectSearchTypehandler = (e) => {
    let title = "";
    if (e.target.value === "chemical") title = "Chemical";
    else if (e.target.value === "instrument") title = "Instrument";
    else if (e.target.value === "glassware") title = "GlassWare";

    setTitle(title);
    const prevType = type;
    if (prevType !== e.target.value) setSearchResult([]);
    setType(e.target.value);
  };

  return (
    <>
      <div className="search_container">
        <div className="search_input_box_container">
          <div className="search_input_box_div">
            <select name="cars" onChange={selectSearchTypehandler}>
              <option value="chemical">Chemical</option>
              <option value="instrument">Instrument</option>
              <option value="glassware">Glass Ware</option>
            </select>
            <input
              value={searchInput}
              onChange={searchInputHandler}
              placeholder="Search"
              type="search"
            />
            <button
              className="search_btn"
              onClick={searchHandler}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {loading && <Spinner animation="border" variant="dark" />}
              Search
              {/* {" "}
            <FontAwesomeIcon icon={faAddressCard} />{" "} */}
            </button>
          </div>
        </div>
      </div>
      {searchResult.length > 0 && (
        <div className="search_result_table_container">
          <Header text={`${title}`} />
          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                {type === "chemical" && (
                  <tr>
                    <th style={{ paddingLeft: "2rem" }}>#</th>
                    <th>Name</th>
                    <th>Molecular Formula</th>
                    <th>Purity</th>
                    <th>Amount</th>
                    <th>State</th>
                    <th>Manufacturer</th>
                    <th>Supplier</th>
                  </tr>
                )}
                {type === "instrument" && (
                  <tr>
                    <th style={{ paddingLeft: "2rem" }}>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Manufacturer</th>
                    <th>Supplier</th>
                  </tr>
                )}
                {type === "glassware" && (
                  <tr>
                    <th style={{ paddingLeft: "2rem" }}>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Manufacturer</th>
                    <th>Supplier</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {type === "chemical" &&
                  searchResult.map((el, i) => (
                    <tr key={el.id}>
                      <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.molecular_formula}</td>
                      <td>{el.purity}</td>
                      <td>{el.amount}</td>
                      <td>{el.state}</td>
                      <td>{el.manufacturer}</td>
                      <td>{el.supplier}</td>
                    </tr>
                  ))}
                {type === "instrument" &&
                  searchResult.map((el, i) => (
                    <tr key={el.id}>
                      <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.manufacturer}</td>
                      <td>{el.supplier}</td>
                    </tr>
                  ))}
                {type === "glassware" &&
                  searchResult.map((el, i) => (
                    <tr key={el.id}>
                      <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.size}</td>
                      <td>{el.material_type}</td>
                      <td>{el.manufacturer}</td>
                      <td>{el.supplier}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
