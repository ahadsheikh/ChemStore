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

const FileManagment = () => {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getFileHandler = () => {
    axios
      .get(`/api/filemanager/files/`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getFileHandler();
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`/api/filemanager/files/${id}`)
      .then((res) => {
        getFileHandler();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
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
      <div style={{ width: "80%", margin: "auto" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {/* <th style={{ paddingLeft: "1rem" }}>First Name</th> */}
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
                    <span>Mouse over me</span>
                    <div class="p-1 dropdown-content">
                      <p className="mb-0">Hello World!</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  {el.chemicals.length} Substance{" "}
                  <FontAwesomeIcon role="button" icon={faInfoCircle} />{" "}
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
        </Table>
      </div>
    </>
  );
};

export default FileManagment;
