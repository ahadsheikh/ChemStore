import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "../add/Header";
import ShipmentInput from "./ShipmentInput";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { msgFormater } from "../../utils/utils";

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
  const [tempShipmentLoading, setTempShipmentLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({
    id: null,
    loading: true,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  //// GET TEMPORAY SHIPMENT
  const getTempShipmentHandler = () => {
    axios
      .get(`/api/management/chemical-temp-shipment/`)
      .then((res) => {
        setTempShipment({ data: res.data, flag: true });
        setTempShipmentLoading(false);
      })
      .catch((err) => {
        setTempShipmentLoading(false);
        setIsError(true);
        (() => {
          toast(msgFormater(err));
          console.log("Has Something")
        })();
      });
  };

  ///// FUZZY SEARCH
  const fuzzySearchHandler = (value) => {
    axios
      .get(`/api/management/fuzzysearch/?type=chemical&query=${value}`)
      .then((res) => {
        setFuzzySearchResult(res.data);
      })
      .catch((err) => {
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
      });
  };

  const searchInputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };

  //// IF CHEMICAL IS EXIST
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

  ///// FOR GETTING INPUT FROM USER
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setChemicalCredential({ ...chemicalCredential, [name]: value });
  };

  ////// FOR ADDING TO TEMPORARY SHIPMENT
  const addTemporaryHandler = () => {
    setAddLoading(true);
    ///// FORMING OBJECT
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

    //// IF THE CHEMICAL IS NOT EXIST(IF NEW) TO DB
    if (chemicalCredential.isNew && type.create) {
      //// FIRST CREATE THE CHEMICAL IF SUCCESS THEN ADD TO TEMPORARY SHIPMENT
      axios
        .post(`/api/management/chemicals/`, copyCredential)
        .then((res) => {
          const newData = {
            chemical: res.data.id,
            quantity: chemicalCredential.newQuantity,
          };

          /// IF SUCCESS THEN ADD TO TEMP SHIPMENT
          axios
            .post(`/api/management/chemical-temp-shipment/`, newData)
            .then((res) => {
              getTempShipmentHandler();
              setShowChemicalElement(false);
              setAddLoading(false);
            })
            .catch((err) => {
              setIsError(true);
              (() => {
                toast(msgFormater(err));
              })();
              setAddLoading(false);
            });
        })
        .catch((err) => {
          setIsError(true);
          (() => {
            toast(msgFormater(err));
          })();
          setAddLoading(false);
        });

      //// IF CHEMICAL IS EXIST IN DB THEN THIS PORTION WILL EXECUTE
    } else if (!chemicalCredential.isNew && type.create) {
      axios
        .post(`/api/management/chemical-temp-shipment/`, {
          chemical: chemicalCredential.id,
          quantity: chemicalCredential.newQuantity,
        })
        .then((res) => {
          getTempShipmentHandler();
          setShowChemicalElement(false);
          setAddLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          (() => {
            toast(msgFormater(err));
          })();
          setAddLoading(false);
        });
      //// IF TEMPORARY ADDED SHIPMENT IS EDIT
    } else if (type.edit) {
      axios
        .patch(
          `/api/management/chemical-temp-shipment/${chemicalCredential.id}/`,
          {
            quantity: chemicalCredential.newQuantity,
          }
        )
        .then((res) => {
          getTempShipmentHandler();
          setShowChemicalElement(false);
          setAddLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          (() => {
            toast(msgFormater(err));
          })();
          setAddLoading(false);
        });
    }
  };

  ///// FOR DELETE A CHEMICAL
  const deleteFromTempShipmentHandler = (id) => {
    setDeleteLoading({ id, loading: true });
    axios
      .delete(`/api/management/chemical-temp-shipment/${id}/`)
      .then((res) => {
        getTempShipmentHandler();
        setDeleteLoading({ id: null, loading: false });
      })
      .catch((err) => {
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
        setDeleteLoading({ id: null, loading: false });
      });
  };

  /// FOR EDIT A CHEMICAL
  const editChemicalHandler = (el) => {
    const dummyChemical = {
      ...el.chemical,
      id: el.id,
      secId: el.chemical.id,
      newQuantity: el.quantity,
    };
    setShowChemicalElement(true);
    setChemicalCredential(dummyChemical);
    setType({ create: false, edit: true });
  };

  ///// MERGE TO FINAL SHIPMENT
  const submitHandler = () => {
    setSubmitLoading(true);
    axios
      .post(`/api/management/chemical-temp-shipment/merge/`, {})
      .then((res) => {
        getTempShipmentHandler();
        setSubmitLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
        setSubmitLoading(false);
      });
  };

  ////// REMOVE CHEMICAL FORM FROM UI
  const removeHandler = () => {
    setShowChemicalElement(false);
  };

  useEffect(() => {
    setTempShipmentLoading(true);
    getTempShipmentHandler();
  }, []);

  //// RENDER TO UI
  return (
    <>
      {isError && <ToastContainer />}
      <div className="chemical_add_wrapper">
        <div className="chemical_add_container">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  style={{ fontSize: "1.6rem" }}
                  name="chemical"
                  placeholder="Chemical"
                  value={searchInput}
                  onChange={searchInputHandler}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-light"
                  style={{ fontSize: "1.6rem" }}
                  // onClick={() => foundChemicalHandler(dummyChemical, true)}
                >
                  Create
                </button>
              </div>
            </div>
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
                      {el.purity}% - {el.chemical.name} - {el.quantity}ml - {el.manufacturer.name} - {el.supplier.name}
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
                onClick={removeHandler}
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
                        value={chemicalCredential.chemical.name}
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
                        value={chemicalCredential.chemical.CAS_RN}
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
                        value={chemicalCredential.chemical.molecular_formula}
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
                        value={chemicalCredential.name}
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
                        value={chemicalCredential.supplier.name}
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
                        <option value="" disabled>
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
                      disabled={addLoading}
                    >
                      {addLoading && (
                        <div
                          className="spinner-border me-2"
                          role="status"
                          style={{ width: "1.4rem", height: "1.4rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {type.create ? `Add` : "Edit"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tempShipmentLoading && (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border mt-5"
              role="status"
              style={{ width: "5rem", height: "5rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!tempShipmentLoading && tempShipment.data.length > 0 && (
          <>
            <div className="border mt-5"></div>
            <div className="container mt-5" style={{ overflowX: "scroll" }}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: "2rem" }}>#</th>
                    <th>Name</th>
                    <th>Molecular Formula</th>
                    <th>Molecular Weight</th>
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
                        <td>{el.chemical.chemical.name}</td>
                        <td>{el.chemical.chemical.molecular_formula}</td>
                        <td>{el.chemical.chemical.molecular_weight}</td>
                        <td>{el.chemical.purity}</td>
                        <td>{el.chemical.quantity}</td>
                        <td>{el.chemical.state}</td>
                        <td>{el.chemical.manufacturer.name}</td>
                        <td>{el.chemical.supplier.name}</td>
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
                              onClick={() =>
                                deleteFromTempShipmentHandler(el.id)
                              }
                              disabled={
                                el.id === deleteLoading.id &&
                                deleteLoading.loading
                              }
                            >
                              {el.id === deleteLoading.id &&
                                deleteLoading.loading && (
                                  <div
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                )}
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
              <button
                onClick={submitHandler}
                className="btn btn-primary mt-4 px-4 float-end fontSize1_6"
                disabled={submitLoading}
              >
                {submitLoading && (
                  <div className="spinner-border me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddChemicalTest;
