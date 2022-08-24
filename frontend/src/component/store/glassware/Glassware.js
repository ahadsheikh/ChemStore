import React, { useState, useEffect } from "react";
import Header from "../../add/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Table, Spinner, Modal } from "react-bootstrap";
import axios from "../../../axios/axios";
import axiosNoAuth from "../../../axios/axios_noauth";
import GlasswareModal from "./GlasswareModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyGlassware = {
  name: "",
  manufacturer: "",
  supplier: "",
  size: "",
  material_type: "",
  quantity: "",
  newQuantity: "",
};

const Glassware = () => {
  const [glasswareCredential, setGlasswareCredential] =
    useState(dummyGlassware);
  const [error, setError] = useState({ loading: false, message: "" });
  const [flag, setFlag] = useState(false);
  const [glassware, setGlassware] = useState([]);
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
  const getGlassware = () => {
    setGlassware([]);
    setError({ loading: true, message: "" });
    // setTable({ chemical: false, instrument: false, glassware: true });
    axiosNoAuth
      .get(`/api/management/glasswares/`)
      .then((res) => {
        setGlassware(res.data);
        setError({ loading: false, message: "" });
        setFlag(true);
      })
      .catch((err) => {
        setIsError(true);
        (() => {
          toast(`Something Went Wrong`);
        })();
        setError({ loading: false, message: "Something Went Wrong" });
      });
  };
  useEffect(() => {
    setError({ loading: true, message: "" });
    getGlassware();
  }, []);

  const showHandler = (name) => {
    setGlasswareCredential(dummyGlassware);
    setShow({ ...show, [name]: true });
  };

  const onHideHandler = () => {
    setShow({ create: false, edit: false, delete: false });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setGlasswareCredential({ ...glasswareCredential, [name]: value });
  };

  const submitHandler = () => {
    setSubmitLoading(true);
    axios
      .post(`/api/management/glasswares/`, {
        ...glasswareCredential,
        quantity: glasswareCredential.newQuantity,
      })
      .then((res) => {
        setSubmitLoading(false);
        getGlassware();
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

  const submitEditHandler = () => {
    setSubmitLoading(true);
    axios
      .put(`/api/management/glasswares/${glasswareCredential.id}/`, {
        ...glasswareCredential,
        quantity: glasswareCredential.newQuantity,
      })
      .then((res) => {
        setSubmitLoading(false);
        onHideHandler();
        getGlassware();
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

  const editHandler = (glassware) => {
    setGlasswareCredential({ ...glassware, newQuantity: glassware.quantity });
    setShow({ create: false, edit: true, delete: false });
  };

  const deleteChemical = (id) => {
    setDeleteLoading({ id, loading: true });
    axios
      .delete(`/api/management/glasswares/${id}/`)
      .then((res) => {
        getGlassware();
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
        <GlasswareModal
          glasswareCredential={glasswareCredential}
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
        <GlasswareModal
          glasswareCredential={glasswareCredential}
          inputHandler={inputHandler}
          submitHandler={submitEditHandler}
          btnText="Edit"
          submitLoading={submitLoading}
        />
      </Modal>
      {flag && glassware.length === 0 ? (
        <p>Nothig Found</p>
      ) : (
        <div className="container-md mt-3" style={{ overflowX: "scroll" }}>
          <div className="user_managment_table_wrapper">
            <div>
              <Header text="Glassware">
                <button
                  className="central_header_remove_btn"
                  onClick={() => showHandler("create")}
                >
                  <FontAwesomeIcon icon={faPlus} /> <span> New Glassware</span>
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
                    <th>Size</th>
                    <th>Type</th>
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
                    glassware.map((el, i) => (
                      <tr key={el.id}>
                        <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                        <td>{el.name}</td>
                        <td>{el.quantity}</td>
                        <td>{el.size}</td>
                        <td>{el.material_type}</td>
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
      )}
    </>
  );
};

export default Glassware;
