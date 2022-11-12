import {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "../../axios/axios";
import {setFlagHandler} from "../../redux/FileManagment";
import {useDispatch} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {msgFormater} from "../../utils/utils";

const UtilsModal = (props) => {
  const dispatch = useDispatch();
  const [ca, setCa] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [fuzzyResult, setFuzzyResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [file, setFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(false);

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
      })
      .catch((err) => {
        setError(true);
        (() => {
          toast(msgFormater(err));
        })();
      });
  };

  const foundCredentialHandler = (item) => {
    let copyChemicals = [...chemicals];
    if (copyChemicals.findIndex((el) => el.id === item.id) === -1)
      copyChemicals.push(item);
    setChemicals(copyChemicals);
  };
  const searchInputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };
  const [isShow, setIsShow] = useState(false);

  const addCategoriesHandler = (item) => {
    let copyCategories = [...categories];
    if (copyCategories.findIndex((el) => el.id === item.id) === -1)
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
    setFile(e.target.files[0]);
  };

  const submitHandler = () => {
    const fd = new FormData();
    for (let i = 0; i < categories.length; i++)
      fd.append(`categories`, categories[i].id);
    for (let i = 0; i < chemicals.length; i++)
      fd.append(`chemicals`, chemicals[i].id);
    if (file === null) {
      setError(true);
      (() => {
        toast(`Please Upload a File.`);
      })();
      return;
    }
    fd.append("file", file, file.name);
    setSubmitLoading(true);
    axios
      .post(`/api/filemanager/files/`, fd)
      .then((res) => {
        dispatch(setFlagHandler());
        props.handleClose();
        setSubmitLoading(false);
      })
      .catch((err) => {
        (() => {
          toast(msgFormater(err));
        })();
        setSubmitLoading(false);
      });
  };
  return (
    <>
      {error && <ToastContainer/>}
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div
              onClick={openOption}
              className="utils_modal_categories_container  border p-2"
            >
              {categories.length === 0 && <p>Please Select Categories</p>}

              {categories.map((el, i) => (
                <p
                  key={el.id}
                  className="badge rounded-pill bg-light text-dark me-2 mb-0"
                >
                  {el.name}
                  <span
                    className="ms-3"
                    style={{cursor: "pointer"}}
                    onClick={() => removeCategoriesHandler(i)}
                  >
                    {" "}
                    X
                  </span>
                </p>
              ))}
            </div>
            {isShow && (
              <ul className="utils_modal_categories_list util_modal_chemical">
                {ca.map((el) => (
                  <li key={el.id} onClick={() => addCategoriesHandler(el)}>
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
                  <p
                    key={i}
                    className="badge rounded-pill bg-light text-dark me-2 mb-0"
                  >
                    {el.name}
                    <span
                      onClick={() => removeChemicalHandler(i)}
                      className="ms-3"
                      style={{cursor: "pointer"}}
                    >
                      X
                    </span>
                  </p>
                ))}
              </div>
            )}
            <div className="issue_fuzzy_search_container">
              <input
                className=" file_managment_chemical issue_content_container_top_input border"
                style={{backgroundColor: "white", color: "black"}}
                type="text"
                placeholder="Chemical Name"
                name="carrier_name"
                value={searchInput}
                onChange={searchInputHandler}
              />
              <ul
                className={
                  fuzzyResult.length > 0
                    ? "issue_fuzzy_result util_modal_chemical"
                    : "issue_fuzzy_result"
                }
              >
                {fuzzyResult.map((el, i) => (
                  <li key={i} onClick={() => foundCredentialHandler(el)}>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <input type="file" onChange={fileUploadHandler}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{fontSize: "1.6rem"}}
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <button
            onClick={submitHandler}
            className="btn btn-primary px-4 float-end fontSize1_6"
            disabled={submitLoading}
          >
            {submitLoading && (
              <div className="spinner-border me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UtilsModal;
