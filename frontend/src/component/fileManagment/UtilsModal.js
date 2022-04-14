import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faTrashCan } from "@fortawesome/free-regular-svg-icons";

// const ca = [1, 2, 3, 4, 5, 6];
const UtilsModal = (props) => {
  const [ca, setCa] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [fuzzyResult, setFuzzyResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/filemanager/categories/`)
      .then((res) => {
        setCa(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
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
  const foundCredentialHandler = (item) => {
    const copyChemicals = [...chemicals];
    copyChemicals.push(item);
    // setFuzzyResult([]);
    setChemicals(copyChemicals);
    // setSearchInput(item.name);
  };
  const searchInputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };
  const [isShow, setIsShow] = useState(false);

  const addCategoriesHandler = (item) => {
    const copyCategories = [...categories];
    copyCategories.push(item);
    setCategories(copyCategories);
  };
  const openOption = () => {
    setIsShow((prevState) => !prevState);
  };

  const removeCategoriesHandler = (index) => {
    const copyCategories = [...categories];
    copyCategories.splice(index, 1);
    setCategories(copyCategories);
  };

  const removeChemicalHandler = (index) => {
    const copyChemicals = [...chemicals];
    copyChemicals.splice(index, 1);
    setChemicals(copyChemicals);
  };

  const fileUploadHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const submitHandler = () => {
    const fd = new FormData();
    for (let i = 0; i < categories.length; i++)
      fd.append(`categories`, categories[i].id);
    for (let i = 0; i < chemicals.length; i++)
      fd.append(`chemicals`, chemicals[i].id);
    fd.append("file", file, file.name);
    console.log(fd);
    axios
      .post(`/api/filemanager/files/`, fd)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div
              onClick={openOption}
              className="utils_modal_categories_container border p-2"
            >
              {categories.length === 0 && <p>Please Select Categories</p>}
              {categories.map((el, i) => (
                <p className="badge rounded-pill bg-light text-dark me-2 mb-0">
                  {el.name}
                  <span
                    className="ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeCategoriesHandler(i)}
                  >
                    {" "}
                    X
                  </span>
                </p>
              ))}
            </div>
            {isShow && (
              <ul className="utils_modal_categories_list">
                {ca.map((el) => (
                  <li key={el} onClick={() => addCategoriesHandler(el)}>
                    {el.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {chemicals.length > 0 && (
              <div className="border mt-3 py-2">
                {chemicals.map((el, i) => (
                  <p className="badge rounded-pill bg-light text-dark me-2 mb-0">
                    {el.name}
                    <span
                      onClick={() => removeChemicalHandler(i)}
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </span>
                  </p>
                ))}
              </div>
            )}
            <div className="issue_fuzzy_search_container">
              <input
                className="issue_content_container_top_input border"
                style={{ backgroundColor: "white", color: "black" }}
                type="text"
                placeholder="Name"
                name="carrier_name"
                value={searchInput}
                onChange={searchInputHandler}
              />
              <ul className="issue_fuzzy_result">
                {fuzzyResult.map((el, i) => (
                  <li key={i} onClick={() => foundCredentialHandler(el)}>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <input type="file" onChange={fileUploadHandler} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UtilsModal;
