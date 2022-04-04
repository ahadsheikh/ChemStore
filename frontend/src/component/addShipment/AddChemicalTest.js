import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Input from "../input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "../add/Header";
import ShipmentInput from "./ShipmentInput";
import axios from "../../axios/axios";

const dummyChemical = {
  CAS_RN: "",
  name: "",
  purity: "",
  molecular_formula: "",
  manufacturer: "",
  supplier: "",
  state: "",
  quantity: "",
  molecular_weight: "",
  type: "",
  newQuantity: "",
};

const AddChemicalTest = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [tempShipment, setTempShipment] = useState({ data: [], flag: false });
  const [fuzzySearchResult, setFuzzySearchResult] = useState([]);
  const [chemicalCredential, setChemicalCredential] = useState({});
  const [showChemicalElement, setShowChemicalElement] = useState(false);
  const [type, setType] = useState({ create: false, edit: false });

  // console.log(tempShipment);

  const getTempShipmentHandler = () => {
    axios
      .get(`/api/management/chemical-temp-shipment/`)
      .then((res) => {
        setTempShipment({ data: res.data, flag: true });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getTempShipmentHandler();
  });

  const fuzzySearchHandler = (value) => {
    axios
      .get(`/api/management/fuzzysearch/?type=chemical&query=${value}`)
      .then((res) => {
        setFuzzySearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchInputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };

  const foundChemicalHandler = (chemical, isNew) => {
    if (isNew) {
      chemical = { ...chemical, name: searchInput, quantity: 0 };
    } else {
      chemical = { ...chemical, newQuantity: "" };
    }
    setChemicalCredential({ ...chemical, isNew });
    setSearchInput("");
    setShowChemicalElement(true);
    setType({ create: true, edit: false });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setChemicalCredential({ ...chemicalCredential, [name]: value });
  };

  const addTemporaryHandler = () => {
    let copyCredential = { ...chemicalCredential };
    copyCredential.quantity = 0;
    delete copyCredential.molecular_weight;
    delete copyCredential.newQuantity;
    delete copyCredential.type;
    delete copyCredential.isNew;

    copyCredential = {
      ...copyCredential,
      store: 1,
    };
    console.log(copyCredential);

    if (chemicalCredential.isNew && type.create) {
      axios
        .post(`/api/management/chemicals/`, copyCredential)
        .then((res) => {
          console.log(res.data);
          const newData = {
            chemical: res.data.id,
            quantity: chemicalCredential.newQuantity,
          };
          console.log(newData);
          axios
            .post(`/api/management/chemical-temp-shipment/`, newData)
            .then((res) => {
              getTempShipmentHandler();
              setShowChemicalElement(false);
              console.log(res.data);
            })
            .catch((err) => {
              console.log("CREATE Temp HSIPMENT");
              console.log(err.response);
            });
        })
        .catch((err) => {
          console.log("CREATE CHEMICAL");
          console.log(err.response);
        });
    } else if (!chemicalCredential.isNew && type.create) {
      axios
        .post(`/api/management/chemical-temp-shipment/`, {
          chemical: chemicalCredential.id,
          quantity: chemicalCredential.newQuantity,
        })
        .then((res) => {
          getTempShipmentHandler();
          setShowChemicalElement(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("CREATE Temp HSIPMENT");
          console.log(err.response);
        });
    } else if (type.edit) {
      console.log({
        chemical: chemicalCredential.secId,
        quantity: chemicalCredential.newQuantity,
      });
      axios
        .patch(
          `/api/management/chemical-temp-shipment/${chemicalCredential.id}/`,
          {
            chemical: chemicalCredential.secId,
            quantity: chemicalCredential.newQuantity,
          }
        )
        .then((res) => {
          getTempShipmentHandler();
          setShowChemicalElement(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("CREATE Temp HSIPMENT");
          console.log(err.response);
        });
    }
  };

  const deleteFromTempShipmentHandler = (id) => {
    axios
      .delete(`/api/management/chemical-temp-shipment/${id}/`)
      .then((res) => {
        console.log(res.data);
        getTempShipmentHandler();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const editChemicalHandler = (el) => {
    console.log(el);
    const dummyChemical = {
      ...el.chemical,
      id: el.id,
      secId: el.chemical.id,
      newQuantity: el.quantity,
    };
    setShowChemicalElement(true);
    setChemicalCredential(dummyChemical);
    setType({ create: false, edit: true });
    console.log(dummyChemical);
  };

  return (
    <div className="chemical_add_wrapper">
      <div className="chemical_add_container">
        <div className="chemical_div">
          <input
            name="chemical"
            placeholder="Chemical"
            value={searchInput}
            onChange={searchInputHandler}
          />
          <button onClick={() => foundChemicalHandler(dummyChemical, true)}>
            Create
          </button>
        </div>
        <div className="fuzzy_search_div_chemical">
          {searchInput.length > 0 && (
            <ul className="model_suggestion_ul">
              {props.isProcessing ? (
                <p>loading..........</p>
              ) : (
                fuzzySearchResult.map((el) => (
                  <li
                    key={el.id}
                    onClick={() => foundChemicalHandler(el, false)}
                  >
                    {el.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
      {showChemicalElement && (
        <div className="add_chemical_container">
          <Header text="Add Chemical">
            <button
              className="central_header_remove_btn"
              onClick={props.removeHandler}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> <span>Remove</span>
            </button>
          </Header>
          <div className="add_chemical_input_container">
            <div className="test">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="Name"
                      bckColor="color_black "
                      name="name"
                      value={chemicalCredential.name}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="CAS RN"
                      bckColor="color_black "
                      name="CAS_RN"
                      value={chemicalCredential.CAS_RN}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="Moliqular Formula"
                      bckColor="color_black "
                      name="molecular_formula"
                      value={chemicalCredential.molecular_formula}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="Moliqular Weight"
                      bckColor="color_black "
                      name="molecular_weight"
                      value={chemicalCredential.molecular_weight}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="Purity"
                      bckColor="color_black "
                      name="purity"
                      value={chemicalCredential.purity}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="Manufacturer"
                      bckColor="color_black "
                      name="manufacturer"
                      value={chemicalCredential.manufacturer}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                  <div className="col">
                    <ShipmentInput
                      labelShow
                      type="text"
                      placeholder="Supplier"
                      bckColor="color_black "
                      name="supplier"
                      value={chemicalCredential.supplier}
                      handler={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                    />
                  </div>
                  <div className="col">
                    <label>Chemical Type</label>
                    <select
                      className="issue_content_container_top_input"
                      name="state"
                      value={chemicalCredential.state}
                      onChange={inputHandler}
                      readOnly={!chemicalCredential.isNew}
                      disabled={!chemicalCredential.isNew}
                      // required
                    >
                      <option value="" disabled selected>
                        Please Choose...
                      </option>
                      <option value="SOLID">Solid</option>
                      <option value="LIQUID">Liquid</option>
                      <option value="GAS">Gas</option>
                    </select>
                  </div>
                  <div className="col">
                    <label>{`Quantity :  ${chemicalCredential.quantity}`}</label>
                    <ShipmentInput
                      type="number"
                      labelShow={false}
                      placeholder={`Quantity`}
                      bckColor="color_black "
                      name="newQuantity"
                      value={chemicalCredential.newQuantity}
                      handler={inputHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    onClick={addTemporaryHandler}
                    variant="primary"
                    style={{ fontSize: "1.6rem" }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border mt-5"></div>
      <div className="container mt-5" style={{ overflowX: "scroll" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={{ paddingLeft: "2rem" }}>#</th>
              <th>Name</th>
              <th>Molecular Formula</th>
              <th>Purity</th>
              <th>Quantity</th>
              <th>State</th>
              <th>Manufacturer</th>
              <th>Supplier</th>
              <th>New Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempShipment.flag &&
              tempShipment.data.map((el, i) => (
                <tr key={el.id}>
                  <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                  <td>{el.chemical.name}</td>
                  <td>{el.chemical.molecular_formula}</td>
                  <td>{el.chemical.purity}</td>
                  <td>{el.chemical.quantity}</td>
                  <td>{el.chemical.state}</td>
                  <td>{el.chemical.manufacturer}</td>
                  <td>{el.chemical.supplier}</td>
                  <td>{el.quantity}</td>
                  <td>
                    <div>
                      <Button
                        onClick={() => editChemicalHandler(el)}
                        variant="primary"
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteFromTempShipmentHandler(el.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="clearfix">
        <button className="btn btn-primary mt-4 px-4 float-end fontSize1_6">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddChemicalTest;
