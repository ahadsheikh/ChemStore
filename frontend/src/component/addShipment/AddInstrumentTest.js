import React, {useState, useEffect} from "react";
import {Table, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Header from "../add/Header";
import ShipmentInput from "./ShipmentInput";
import axios from "../../axios/axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {msgFormater} from "../../utils/utils";

const dummyInstrument = {
  name: "",
  manufacturer: "",
  supplier: "",
  quantity: "",
};

const AddInstrumentTest = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [tempShipment, setTempShipment] = useState({data: [], flag: false});
  const [fuzzySearchResult, setFuzzySearchResult] = useState([]);
  const [chemicalCredential, setChemicalCredential] = useState({});
  const [showChemicalElement, setShowChemicalElement] = useState(false);
  const [type, setType] = useState({create: false, edit: false});
  const [tempShipmentLoading, setTempShipmentLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({
    id: null,
    loading: true,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const getTempShipmentHandler = () => {
    axios
      .get(`/api/management/instrument-temp-shipment/`)
      .then((res) => {
        setTempShipment({data: res.data, flag: true});
        setTempShipmentLoading(false);
      })
      .catch((err) => {
        setTempShipmentLoading(false);
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
      });
  };

  useEffect(() => {
    setTempShipmentLoading(true);
    getTempShipmentHandler();
  }, []);

  const fuzzySearchHandler = (value) => {
    axios
      .get(`/api/management/fuzzysearch/?type=instrument&query=${value}`)
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

  const foundInstrumentHandler = (chemical, isNew) => {
    if (isNew) {
      chemical = {...chemical, name: searchInput, quantity: 0};
    } else {
      chemical = {...chemical, newQuantity: ""};
    }
    console.log(chemical, isNew);
    setChemicalCredential({...chemical, isNew});
    setSearchInput("");
    setShowChemicalElement(true);
    setType({create: true, edit: false});
  };

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setChemicalCredential({...chemicalCredential, [name]: value});
  };

  const addTemporaryHandler = () => {
    setAddLoading(true);
    let copyCredential = {...chemicalCredential};
    copyCredential.quantity = 0;
    delete copyCredential.newQuantity;
    delete copyCredential.type;
    delete copyCredential.isNew;

    copyCredential = {
      ...copyCredential,
      store: 1,
    };

    if (chemicalCredential.isNew && type.create) {
      axios
        .post(`/api/management/instruments/`, copyCredential)
        .then((res) => {
          console.log(res.data);
          const newData = {
            instrument: res.data.id,
            quantity: chemicalCredential.newQuantity,
          };

          axios
            .post(`/api/management/instrument-temp-shipment/`, newData)
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
    } else if (!chemicalCredential.isNew && type.create) {
      axios
        .post(`/api/management/instrument-temp-shipment/`, {
          instrument: chemicalCredential.id,
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
    } else if (type.edit) {
      axios
        .patch(
          `/api/management/instrument-temp-shipment/${chemicalCredential.id}/`,
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

  ///// FOR DELETE A INSTRUMENT
  const deleteFromTempShipmentHandler = (id) => {
    setDeleteLoading({id, loading: true});
    axios
      .delete(`/api/management/instrument-temp-shipment/${id}/`)
      .then((res) => {
        getTempShipmentHandler();
        setDeleteLoading({id: null, loading: false});
      })
      .catch((err) => {
        setDeleteLoading({id: null, loading: false});
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
      });
  };

  /// FOR EDIT A CHEMICAL
  const editInstrumentHandler = (el) => {
    const dummyInstrument = {
      ...el.instrument,
      id: el.id,
      secId: el.instrument.id,
      newQuantity: el.quantity,
    };
    setShowChemicalElement(true);
    setChemicalCredential(dummyInstrument);
    setType({create: false, edit: true});
  };

  const submitHandler = () => {
    setSubmitLoading(true);
    axios
      .post(`/api/management/instrument-temp-shipment/merge/`, {})
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
  const removeHandler = () => {
    setShowChemicalElement(false);
  };

  return (
    <>
      {isError && <ToastContainer/>}

      <div className="chemical_add_wrapper">
        <div className="chemical_add_container">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  style={{fontSize: "1.6rem"}}
                  name="instrument"
                  placeholder="Instrument"
                  value={searchInput}
                  onChange={searchInputHandler}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-light"
                  style={{fontSize: "1.6rem"}}
                  // onClick={() => foundInstrumentHandler(dummyInstrument, true)}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="fuzzy_search_div_chemical mt-2">
            {searchInput.length > 0 && (
              <ul className="model_suggestion_ul">
                {props.isProcessing ? (
                  <p>loading..........</p>
                ) : (
                  fuzzySearchResult.map((el) => (
                    <li
                      key={el.id}
                      onClick={() => foundInstrumentHandler(el, false)}
                    >
                      {el.size} - {el.instrument.name} - {el.quantity} pieces - {el.manufacturer.name} - {el.supplier.name}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
        {showChemicalElement && (
          <div className="add_chemical_container">
            <Header text="Add Instrument">
              <button
                className="central_header_remove_btn"
                onClick={removeHandler}
              >
                <FontAwesomeIcon icon={faTrashAlt}/> <span>Remove</span>
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
                        value={chemicalCredential.instrument.name}
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
                        placeholder="Manufacturer"
                        bckColor="color_black "
                        name="manufacturer"
                        value={chemicalCredential.manufacturer.name}
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
                    <div className="col">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3.5rem",
                        }}
                      >
                        <Button
                          onClick={addTemporaryHandler}
                          variant="primary"
                          style={{fontSize: "1.6rem"}}
                          disabled={addLoading}
                        >
                          {addLoading && (
                            <div
                              className="spinner-border me-2"
                              role="status"
                              style={{width: "1.4rem", height: "1.4rem"}}
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          )}
                          {type.create ? `Add` : "Edit"}
                        </Button>
                      </div>
                    </div>
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
              style={{width: "5rem", height: "5rem"}}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!tempShipmentLoading && tempShipment.data.length > 0 && (
          <>
            <div className="border mt-5"></div>
            <div className="container mt-5" style={{overflowX: "scroll"}}>
              <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                  <th style={{paddingLeft: "2rem"}}>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
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
                      <td style={{paddingLeft: "2rem"}}>{i + 1}</td>
                      <td>{el.instrument.instrument.name}</td>
                      <td>{el.instrument.quantity}</td>
                      <td>{el.instrument.manufacturer.name}</td>
                      <td>{el.instrument.supplier.name}</td>
                      <td>{el.quantity}</td>
                      <td>
                        <div>
                          <Button
                            onClick={() => editInstrumentHandler(el)}
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

export default AddInstrumentTest;
