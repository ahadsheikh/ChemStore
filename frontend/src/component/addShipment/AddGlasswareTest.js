import React, {useState, useEffect} from "react";
import {Table, Button} from "react-bootstrap";
import Input from "../input/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Header from "../add/Header";
import ShipmentInput from "./ShipmentInput";
import axios from "../../axios/axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {msgFormater} from "../../utils/utils";

const dummyGlassware = {
  name: "",
  manufacturer: "",
  supplier: "",
  size: "",
  material_type: "",
  quantity: "",
};

const AddGlasswareTest = (props) => {
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
      .get(`/api/management/glassware-temp-shipment/`)
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
      .get(`/api/management/fuzzysearch/?type=glassware&query=${value}`)
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

  const foundChemicalHandler = (chemical, isNew) => {
    if (isNew) {
      chemical = {...chemical, name: searchInput, quantity: 0};
    } else {
      chemical = {...chemical, newQuantity: ""};
    }
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
        .post(`/api/management/glasswares/`, copyCredential)
        .then((res) => {
          const newData = {
            glassware: res.data.id,
            quantity: chemicalCredential.newQuantity,
          };

          axios
            .post(`/api/management/glassware-temp-shipment/`, newData)
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
          setAddLoading(false);
          setIsError(true);
          (() => {
            toast(msgFormater(err));
          })();
        });
    } else if (!chemicalCredential.isNew && type.create) {
      axios
        .post(`/api/management/glassware-temp-shipment/`, {
          glassware: chemicalCredential.id,
          quantity: chemicalCredential.newQuantity,
        })
        .then((res) => {
          getTempShipmentHandler();
          setShowChemicalElement(false);
          setAddLoading(false);
        })
        .catch((err) => {
          setAddLoading(false);
          setIsError(true);
          (() => {
            toast(msgFormater(err));
          })();
        });
    } else if (type.edit) {
      axios
        .patch(
          `/api/management/glassware-temp-shipment/${chemicalCredential.id}/`,
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
          setAddLoading(false);
          setIsError(true);
          (() => {
            toast(msgFormater(err));
          })();
        });
    }
  };

  ///// FOR DELETE A INSTRUMENT
  const deleteFromTempShipmentHandler = (id) => {
    setDeleteLoading({id, loading: true});
    axios
      .delete(`/api/management/glassware-temp-shipment/${id}/`)
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
    const dummyGlassware = {
      ...el.glassware,
      id: el.id,
      secId: el.glassware.id,
      newQuantity: el.quantity,
    };
    setShowChemicalElement(true);
    setChemicalCredential(dummyGlassware);
    setType({create: false, edit: true});
  };

  const submitHandler = () => {
    setSubmitLoading(true);
    axios
      .post(`/api/management/glassware-temp-shipment/merge/`, {})
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
                  name="chemical"
                  placeholder="Glassware..."
                  value={searchInput}
                  onChange={searchInputHandler}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-light"
                  style={{fontSize: "1.6rem"}}
                  // onClick={() => foundChemicalHandler(dummyGlassware, true)}
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
                      {el.size} - {el.glassware.name} - {el.quantity} pieces - {el.manufacturer.name} - {el.supplier.name}
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
                        value={chemicalCredential.glassware.name}
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
                        placeholder="Size"
                        bckColor="color_black "
                        name="size"
                        value={chemicalCredential.size}
                        handler={inputHandler}
                        readOnly={!chemicalCredential.isNew}
                      />
                    </div>
                    <div className="col">
                      <ShipmentInput
                        labelShow
                        type="text"
                        placeholder="Material Type"
                        bckColor="color_black "
                        name="material_type"
                        value={chemicalCredential.material_type}
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
                  <th>Size</th>
                  <th>Material Type</th>
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
                      <td>{el.glassware.glassware.name}</td>
                      <td>{el.glassware.size}</td>
                      <td>{el.glassware.material_type}</td>
                      <td>{el.glassware.quantity}</td>
                      <td>{el.glassware.manufacturer.name}</td>
                      <td>{el.glassware.supplier.name}</td>
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

export default AddGlasswareTest;
