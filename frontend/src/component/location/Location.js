import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import Header from "../add/Header";
import SecondModal from "../modal/SecondModal";
import Input from "../input/Input";
import axios from "../../axios/axios";

const Location = () => {
  const [open, setOpen] = useState({
    store: false,
    person: false,
  });
  const [store, setStore] = useState([]);
  const [person, setPerson] = useState([]);
  const [show, setShow] = useState({
    create: false,
  });
  const [credential, setCredential] = useState({
    name: "",
    consumer_type: "LAB",
    room_number: "",
    building_name: "",
  });
  useEffect(() => {
    axios
      .get("/api/management/stores/")
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/api/management/store-consumers/`)
      .then((res) => {
        setPerson(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCollapse = (name) => {
    setOpen({ ...open, [name]: !open[name] });
  };
  const showModalHandler = (name) => {
    setShow({ ...show, [name]: !show[name] });
  };
  const handleClose = () => {
    setShow({ create: false });
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };
  const submitHandler = () => {
    axios
      .post("/api/management/store-consumers/", credential)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(credential);
  };
  return (
    <>
      <SecondModal
        show={show.create}
        handleClose={handleClose}
        handleShow={showModalHandler}
        info="Please enter details for the New Location."
        title="Create Location"
        btn_text="Create"
        submitHandler={submitHandler}
      >
        <div className="second_modal_main_container">
          <Input
            type="text"
            placeholder="Name"
            bckColor="color_black"
            value={credential.name}
            handler={inputHandler}
            name="name"
          />
          <select
            className="issue_content_container_top_input"
            name="consumer_type"
            value={credential.consumer_type}
            onChange={inputHandler}
            id="cars"
            style={{ backgroundColor: "black" }}
          >
            <option value="LAB">LAB</option>
            <option value="RESEARCHER">RESEARCHER</option>
          </select>
          <Input
            type="text"
            placeholder="Room Number"
            name="room_number"
            value={credential.room_number}
            handler={inputHandler}
            bckColor="color_black "
          />
          <Input
            type="text"
            placeholder="Building Name"
            name="building_name"
            value={credential.building_name}
            handler={inputHandler}
            bckColor="color_black "
          />
        </div>
      </SecondModal>

      <div>
        <div className="location_container">
          <Header text="Add Location">
            <button
              className="add_chemical_header_container_remove_btn"
              onClick={() => showModalHandler("create")}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Edit
            </button>
          </Header>
          <div>
            <p onClick={() => handleCollapse("store")}>Store</p>
            <Collapse in={open.store}>
              <div>
                {store.map((el) => (
                  <p key={el.id}>
                    <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                  </p>
                ))}
              </div>
            </Collapse>
          </div>
          <div>
            <p onClick={() => handleCollapse("person")}>Person</p>
            <Collapse in={open.person}>
              <div>
                {person.map((el) => (
                  <p key={el.id}>
                    <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                  </p>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
