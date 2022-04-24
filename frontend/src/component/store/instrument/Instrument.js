import React, { useState, useEffect } from "react";
import Header from "../../add/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Spinner, Modal } from "react-bootstrap";
import axios from "../../../axios/axios";
import InstrumentModal from "./InstrumentModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyInstrument = {
  name: "",
  manufacturer: "",
  supplier: "",
  quantity: "",
  newQuantity: "",
};

const Instrument = () => {
  const [instrumentCredential, setInstrumentCredential] =
    useState(dummyInstrument);
  const [error, setError] = useState({ loading: false, message: "" });
  const [instrument, setInstrument] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({
    id: null,
    loading: false,
  });
  const [show, setShow] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const getInstrument = () => {
    setInstrument([]);
    setError({ loading: true, message: "" });
    // setTable({ chemical: false, instrument: true, glassware: false });

    axios
      .get(`/api/management/instruments/`)
      .then((res) => {
        setInstrument(res.data);
        setError({ loading: false, message: "" });
        setFlag(true);
      })
      .catch((err) => {
        setError({ loading: false, message: "Something Went Wrong" });
      });
  };

  useEffect(() => {
    setError({ loading: true, message: "" });
    getInstrument();
  }, []);

  const showHandler = (name) => {
    setInstrumentCredential(dummyInstrument);
    setShow({ ...show, [name]: true });
  };

  const onHideHandler = () => {
    setShow({ create: false, edit: false, delete: false });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInstrumentCredential({ ...instrumentCredential, [name]: value });
  };
  const submitHandler = () => {
    setSubmitLoading(true);
    axios
      .post(`/api/management/instruments/`, {
        ...instrumentCredential,
        quantity: instrumentCredential.newQuantity,
      })
      .then((res) => {
        setSubmitLoading(false);
        getInstrument();
        onHideHandler();
      })
      .catch((err) => {
        setIsError(true);
        const key = Object.keys(err.response.data);
        if (key.length > 0) {
          (() => {
            toast(`${key[0]} ${err.response.data[key[0]][0]}`);
          })();
        } else {
          (() => {
            toast(`Something Went Wrong`);
          })();
        }
        setSubmitLoading(false);
      });
  };

  const editHandler = (instrument) => {
    setInstrumentCredential({
      ...instrument,
      newQuantity: instrument.quantity,
    });
    setShow({ create: false, edit: true, delete: false });
  };

  const submitEditHandler = () => {
    setSubmitLoading(true);
    axios
      .put(`/api/management/instruments/${instrumentCredential.id}/`, {
        ...instrumentCredential,
        quantity: instrumentCredential.newQuantity,
      })
      .then((res) => {
        setSubmitLoading(false);
        onHideHandler();
        getInstrument();
      })
      .catch((err) => {
        setIsError(true);
        const key = Object.keys(err.response.data);
        if (key.length > 0) {
          (() => {
            toast(`${key[0]} ${err.response.data[key[0]][0]}`);
          })();
        } else {
          (() => {
            toast(`Something Went Wrong`);
          })();
        }
        setSubmitLoading(false);
      });
  };

  const deleteChemical = (id) => {
    setDeleteLoading({ id, loading: true });
    axios
      .delete(`/api/management/instruments/${id}/`)
      .then((res) => {
        getInstrument();
        setDeleteLoading({ id: null, loading: false });
      })
      .catch((err) => {
        setDeleteLoading({ id: null, loading: false });
        setIsError(true);
        const key = Object.keys(err.response.data);
        if (key.length > 0) {
          (() => {
            toast(`${key[0]} ${err.response.data[key[0]]}`);
          })();
        } else {
          (() => {
            toast(`Something Went Wrong`);
          })();
        }
      });
  };
  return (
    <>
      {isError && <ToastContainer />}
      <Modal
        size="xl"
        show={show.create}
        onHide={onHideHandler}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <InstrumentModal
          instrumentCredential={instrumentCredential}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          btnText="Create"
          submitLoading={submitLoading}
        />
      </Modal>
      <Modal
        size="xl"
        show={show.edit}
        onHide={onHideHandler}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <InstrumentModal
          instrumentCredential={instrumentCredential}
          inputHandler={inputHandler}
          submitHandler={submitEditHandler}
          btnText="Edit"
          submitLoading={submitLoading}
        />
      </Modal>
      <div className="container-md mt-3" style={{ overflowX: "scroll" }}>
        <div className="user_managment_table_wrapper">
          <div>
            <Header text="Instrument">
              <button
                className="central_header_remove_btn"
                onClick={() => showHandler("create")}
              >
                <FontAwesomeIcon icon={faPlus} /> <span> New Instrument</span>
              </button>
            </Header>
          </div>

          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th style={{ paddingLeft: "2rem" }}>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Manufacturer</th>
                  <th>Supplier</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {error.loading && (
                  <tr className="user_managment_table_loading_div">
                    <td colSpan="100%" className="text-center">
                      <Spinner
                        animation="border"
                        variant="light"
                        style={{
                          fontSize: "1rem",
                          height: "5rem",
                          width: "5rem",
                        }}
                      />
                    </td>
                  </tr>
                )}
                {!error.loading &&
                  instrument.map((el, i) => (
                    <tr key={el.id}>
                      <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.manufacturer}</td>
                      <td>{el.supplier}</td>
                      <td>
                        <>
                          <button
                            onClick={() => editHandler(el)}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteChemical(el.id)}
                            className="btn btn-danger btn-sm"
                            disabled={
                              // el.id === deleteLoading.id &&
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
                          </button>
                        </>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instrument;
