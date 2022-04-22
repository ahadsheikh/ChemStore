import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "../../../axios/axios";
import { config } from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import SubstanceModal from "./SubstanceModal";
import { useSelector } from "react-redux";

const FileManagment = () => {
  const { flag } = useSelector((state) => state.file);
  const [substanceShow, setSubstanceShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [modalChemical, setModalChemical] = useState({});
  const [chemical, setChemical] = useState([]);
  const [loading, setLoading] = useState(false);

  const onHideHandler = () => setSubstanceShow(false);

  const showSubstanceModalHandler = (chemical) => {
    setSubstanceShow(true);
    setModalChemical(chemical);
    setChemical(chemical.chemicals);
  };

  const getFileHandler = () => {
    setLoading(true);
    axios
      .get(`/api/filemanager/files/`)
      .then((res) => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getFileHandler();
  }, [flag]);

  return (
    <>
      <SubstanceModal
        show={substanceShow}
        onHideHandler={onHideHandler}
        chemicals={chemical}
        data={modalChemical}
      />

      <div className="conatiner mt-5 mb-4"></div>
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
      <div style={{ width: "96%", margin: "auto" }}>
        {!loading && files.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className="ps-3">File Name</th>
                <th>Category</th>
                <th>Substance Link</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {files.map((el, i) => (
                <tr key={el.id}>
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
                    <div className="dropdown">
                      {el.categories.length > 0 && (
                        <span>{el.categories[0].name}</span>
                      )}

                      <div className="p-1 dropdown-content">
                        {el.categories.map((el) => (
                          <p key={el.id} className="mb-0">
                            {el.name}
                          </p>
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
                      <a
                        href={`${config.url}${el.file.path}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <button className="user_managment_action_btn detail">
                          <FontAwesomeIcon
                            style={{ fontSize: "1.1rem" }}
                            icon={faDownload}
                          />
                        </button>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default FileManagment;
