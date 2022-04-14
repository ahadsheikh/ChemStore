import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import UtilsModal from "./UtilsModal";
import axios from "../../axios/axios";
import { config } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faDownload,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import SubstanceModal from "./SubstanceModal";
import AddLinkModal from "./AddLinkModal";
import { useSelector } from 'react-redux'

const FileManagment = () => {
  const {flag} = useSelector(state => state.file)
  const [show, setShow] = useState(false);
  const [substanceShow, setSubstanceShow] = useState(false);
  const [addLinkModal, setAddLinkModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [modalChemical, setModalChemical] = useState({});
  const [chemical, setChemical] = useState([]);
  const [fuzzyResult, setFuzzyResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onHideHandler = () => setSubstanceShow(false);
  const showAddLinkModalHandler = () => {
    setAddLinkModal(true);
  };

  const closeAddLinkModalHandler = () => setAddLinkModal(false);

  const showSubstanceModalHandler = (chemical) => {
    setSubstanceShow(true);
    setModalChemical(chemical);
    setChemical(chemical.chemicals);
  };

  const getFileHandler = () => {
    setLoading(true)
    axios
      .get(`/api/filemanager/files/`)
      .then((res) => {
        setFiles(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false)
      });
  };

  useEffect(() => {
    setLoading(true)
    getFileHandler();
  }, [flag]);

  const deleteHandler = (id) => {
    axios
      .delete(`/api/filemanager/files/${id}/`)
      .then((res) => {
        console.log(res.data)
        getFileHandler();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const inputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };

  const fuzzySearchHandler = (value) => {
    axios
      .get(`/api/management/fuzzysearch/?type=chemical&query=${value}`)
      .then((res) => {
        setFuzzyResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSubstanceChemicalHandler = (item, id) => {
    const ids = []
    chemical.forEach(el => ids.push(el.id))
    ids.push(item.id)
    const uniqueArray = Array.from(new Set(ids));
    
    if(chemical.length !== uniqueArray.length) {
      axios
      .patch(`/api/filemanager/files/${id}/`, { chemicals: uniqueArray })
      .then((res) => {
        setChemical([...chemical, item])
        getFileHandler()
        console.log(res.data);
        setAddLinkModal(false)
      })
      .catch((err) => {
        console.log(err.response);
      });
    } 
  }

  const deleteSubstanceChemical = (index, chemicals, id) => {
    const copyChemicals = [...chemicals];
    copyChemicals.splice(index, 1);
    let ids = [];
    for (let i = 0; i < copyChemicals.length; i++) {
      ids.push(copyChemicals[i].id);
    }
    axios
      .patch(`/api/filemanager/files/${id}/`, { chemicals: ids })
      .then((res) => {
        setChemical(copyChemicals)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <AddLinkModal
        onHide={closeAddLinkModalHandler}
        show={addLinkModal}
        fuzzyResult={fuzzyResult}
        inputHandler={inputHandler}
        value={searchInput}
        data={modalChemical}
        handler={addSubstanceChemicalHandler}
      />
      <SubstanceModal
        show={substanceShow}
        onHideHandler={onHideHandler}
        chemicals={chemical}
        data={modalChemical}
        showAddLinkModal={showAddLinkModalHandler}
        deleteChemicalHandler={deleteSubstanceChemical}
      />
      <UtilsModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <div className="conatiner mt-5 mb-4">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            onClick={handleShow}
            class="btn btn-primary me-md-2 btn-lg"
            type="button"
          >
            Upload File
          </button>
        </div>
      </div>
      {loading && (
        <div style={{ width: "100%" }}>
          <div
            className="spinner-border text-light"
            style={{
              width: "5rem",
              height: "5rem",
              margin: "auto",
              marginLeft: "48%",
              display: "inline-block",
            }}
            role="status"
          >
            <span className="visually-hidden text-center">Loading...</span>
          </div>
        </div>
      )}
      <div style={{ width: "80%", margin: "auto" }}>
        {!loading && files.length > 0 && <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="ps-3">File Name</th>
              <th>Category</th>
              <th>Substance Link</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {files.map((el) => (
              <tr>
                <td className="ps-3">
                  <div>
                    <p className="mb-0">
                      <small>{el.file.path.split("/").pop()}</small>
                    </p>
                    <p className="mb-0">
                      <small>
                        <span>{el.file.size.toFixed(1)} KB</span>
                        <span className="ms-2">
                          Uploaded:
                          <span className="ms-2">
                            {new Date(el.created_at).toLocaleString("en-us", {
                              month: "long",
                              year: "numeric",
                              day: "numeric",
                            })}
                          </span>
                        </span>
                      </small>
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div class="dropdown">
                    {el.categories.length > 0 && (
                      <span>{el.categories[0].name}</span>
                    )}

                    <div class="p-1 dropdown-content">
                      {el.categories.map((el) => (
                        <p className="mb-0">{el.name}</p>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  {el.chemicals.length} Substance{" "}
                  <FontAwesomeIcon
                    onClick={() => showSubstanceModalHandler(el)}
                    role="button"
                    icon={faInfoCircle}
                  />{" "}
                </td>
                <td className="align-middle">
                  <div>
                    <a href={`${config.url}${el.file.path}`} target="_blank">
                      <button className="user_managment_action_btn detail">
                        <FontAwesomeIcon
                          style={{ fontSize: "1.1rem" }}
                          icon={faDownload}
                        />
                      </button>
                    </a>
                    <button
                      onClick={() => deleteHandler(el.id)}
                      className="bg-danger user_managment_action_btn detail"
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTrash}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>}
      </div>
    </>
  );
};

export default FileManagment;
