import React, {useState, useEffect} from "react";
import Header from "../add/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import SecondModal from "../modal/SecondModal";
import Input from "../input/Input";
import axios from "../../axios/axios";
import {Table, Spinner} from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {msgFormater} from "../../utils/utils";

const Main = () => {
  const [show, setShow] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [credential, setCredential] = useState({id: null, name: ""});

  const handleShow = (name) => {
    setShow({...show, [name]: true});
  };

  const deleteHandleShow = (name, id, cateName) => {
    setCredential({id, name: cateName});
    setShow({...show, [name]: true});
  };

  const handleClose = () =>
    setShow({create: false, update: false, delete: false});

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  const editInputHandler = (e) => {
    setCredential({id: credential.id, name: e.target.value});
  };

  const getCategoriesHandler = () => {
    setFirstLoading(true);
    axios
      .get(`/api/filemanager/categories/`)
      .then((res) => {
        setCategories(res.data);
        setFirstLoading(false);
      })
      .catch((err) => {
        setFirstLoading(false);
        setIsError(true)(() => {
          toast(`Something Went Wrong`);
        })();
      });
  };
  useEffect(() => {
    getCategoriesHandler();
  }, []);

  const createHandler = () => {
    // setIsError(false);

    if (name.length === 0) {
      setIsError(true);
      (() => {
        toast(`Please Provide Category Name`);
      })();
      return;
    }
    setLoading(true);
    axios
      .post(`/api/filemanager/categories/`, {name})
      .then((res) => {
        setLoading(false);
        handleClose();
        getCategoriesHandler();
      })
      .catch((err) => {
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
        setLoading(false);
      });
  };
  const deleteCategoryHandler = () => {
    setLoading(true);
    axios
      .delete(`/api/filemanager/categories/${credential.id}/`)
      .then((res) => {
        setLoading(false);
        getCategoriesHandler();
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
      });
  };

  const updateCategoryHandler = () => {
    setLoading(true);
    axios
      .patch(`/api/filemanager/categories/${credential.id}/`, {
        name: credential.name,
      })
      .then((res) => {
        setLoading(false);
        getCategoriesHandler();
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
        (() => {
          toast(msgFormater(err));
        })();
      });
  };

  return (
    <>
      {isError && <ToastContainer/>}
      <SecondModal
        show={show.create}
        handleClose={handleClose}
        handleShow={handleShow}
        info="Enter a name for the new Category."
        title="Create Category"
        btn_text="Create"
        submitHandler={createHandler}
        loading={loading}
      >
        <div className="second_modal_main_container">
          <Input
            type="text"
            placeholder="Category Name"
            bckColor="color_black "
            handler={inputHandler}
            value={name}
          />
        </div>
      </SecondModal>

      <SecondModal
        show={show.edit}
        handleClose={handleClose}
        info="The Category's details are shown below."
        title="Edit Category"
        btn_text="Edit"
        submitHandler={updateCategoryHandler}
        loading={loading}
      >
        <div className="second_modal_main_container">
          <Input
            type="text"
            placeholder="Category Name"
            bckColor="color_black "
            handler={editInputHandler}
            value={credential.name}
          />
        </div>
      </SecondModal>

      <SecondModal
        show={show.delete}
        handleClose={handleClose}
        info="Are you sure you want to delete this Category?"
        title="Delete Category"
        btn_text="Delete"
        submitHandler={deleteCategoryHandler}
        loading={loading}
      >
        <div className="second_modal_main_container">
          <p style={{marginBottom: "0", textAlign: "center"}}>
            {credential.name}
          </p>
        </div>
      </SecondModal>
      <div style={{overflowX: "scroll"}}>
        <div className="user_managment_table_wrapper">
          <div>
            <Header text="Categories">
              <button
                className="central_header_remove_btn"
                onClick={() => handleShow("create")}
              >
                <FontAwesomeIcon icon={faPlus}/> <span> New Category</span>
              </button>
            </Header>
          </div>

          <div>
            <Table striped bordered hover variant="dark">
              <thead>
              <tr>
                <th style={{paddingLeft: "1rem"}}>Serial NO.</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
              </thead>

              <tbody>
              {firstLoading && (
                <tr className="user_managment_table_loading_div">
                  <td colSpan={4} className="text-center">
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
              {!firstLoading &&
                categories.map((el, i) => (
                  <tr className="user_managment_table_body_row" key={el.id}>
                    <td
                      className="user_managment_table_body_row_data"
                      style={{paddingLeft: "1rem"}}
                    >
                      {i + 1}
                    </td>
                    <td className="user_managment_table_body_row_data">
                      {el.name}
                    </td>
                    <td className="user_managment_table_body_row_data">
                      <div className="user_managment_btn_container">
                        <button
                          className="user_managment_action_btn detail"
                          onClick={() =>
                            deleteHandleShow("edit", el.id, el.name)
                          }
                        >
                          <FontAwesomeIcon
                            style={{fontSize: "1.1rem"}}
                            icon={faPencilAlt}
                          />
                        </button>
                        <button
                          className="user_managment_action_btn delete"
                          onClick={() =>
                            deleteHandleShow("delete", el.id, el.name)
                          }
                        >
                          <FontAwesomeIcon
                            style={{fontSize: "1.1rem"}}
                            icon={faTimes}
                          />
                        </button>
                      </div>
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

export default Main;
