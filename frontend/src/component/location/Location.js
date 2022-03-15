import React, { useState, useEffect } from "react";
import { storeTypes, storeStructure } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";

import SecondModal from "../modal/SecondModal";
import Input from "../input/Input";
import axios from "../../axios/axios";
import LocationHeader from "./LocationHeader";
import Error from "../error/Error";
import SpecficIssue from "./SpecficIssue";

const Location = ({ isShow = true }) => {
  const [open, setOpen] = useState({
    PhysicalLab: false,
    OrganicLab: false,
    InorganicLab: false,
    Personal: false,
  });
  const [storeType, setStoreType] = useState({});
  const [storeTypeFlag, setStoreTypeFlag] = useState(false);
  const [show, setShow] = useState({ create: false });
  const [credential, setCredential] = useState(storeStructure);
  const [error, setError] = useState({ isError: false, message: "" });
  const [specficLabContent, setSpecficLabContent] = useState({
    content: [],
    loading: false,
  });

  //////GET STORE TYPES
  useEffect(() => {
    axios
      .get(`/api/management/consumers-tree/`)
      .then((res) => {
        setStoreType(res.data);
        setStoreTypeFlag(true);
      })
      .catch((err) => {
        alert(`Something Went Wrong`);
      });
  }, [show.create]);

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

  ///// FOR CREATING NEW LAB OR PERSON
  const submitHandler = () => {
    if (
      credential.name !== "" &&
      credential.building_name !== "" &&
      credential.consumer_type !== "" &&
      credential.room_number !== ""
    ) {
      axios
        .post("/api/management/store-consumers/", credential)
        .then((res) => {
          setCredential(storeStructure);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError({ isError: true, message: "Please fill all Field!!" });
    }
  };

  const specficLabHandler = (id) => {
    setSpecficLabContent({ content: [], loading: true });
    axios
      .get(`/api/userview/issues/consumer/${id}/`)
      .then((res) => {
        setSpecficLabContent({ content: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err.response);
        setSpecficLabContent({ content: [], loading: false });
      });
  };

  return (
    <>
      {/* FOR RENDERING MODAL */}
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
            {storeTypes.map((el) => (
              <option key={el.name} value={el.value}>
                {el.name}
              </option>
            ))}
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

      {/* HEADER  */}

      <div className="location_container_div">
        <div
          className="location_container"
          style={{
            width: isShow ? "30%" : "100%",
            margin: isShow ? "4rem 1rem" : "1rem .5rem",
          }}
        >
          <LocationHeader showModalHandler={showModalHandler} isShow={isShow} />

          {/* FOR RENDERING LAB CATEGORY */}

          <div className="location_content_div">
            <div>
              <p
                className="location_title"
                onClick={() => handleCollapse("PhysicalLab")}
              >
                {" "}
                <FontAwesomeIcon icon={faFolderOpen} /> Physical Lab
              </p>
              <Collapse in={open.PhysicalLab}>
                <div className="location_title_item">
                  {storeTypeFlag &&
                    storeType.PhysicalLab.map((el) => (
                      <p key={el.id} onClick={() => specficLabHandler(el.id)}>
                        <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                      </p>
                    ))}
                </div>
              </Collapse>
            </div>
            <div>
              <p
                className="location_title"
                onClick={() => handleCollapse("OrganicLab")}
              >
                {" "}
                <FontAwesomeIcon icon={faFolderOpen} /> Organic Lab
              </p>
              <Collapse in={open.OrganicLab}>
                <div className="location_title_item">
                  {storeTypeFlag &&
                    storeType.OrganicLab.map((el) => (
                      <p key={el.id} onClick={() => specficLabHandler(el.id)}>
                        <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                      </p>
                    ))}
                </div>
              </Collapse>
            </div>
            <div>
              <p
                className="location_title"
                onClick={() => handleCollapse("InorganicLab")}
              >
                {" "}
                <FontAwesomeIcon icon={faFolderOpen} /> Inorganic Lab
              </p>
              <Collapse in={open.InorganicLab}>
                <div className="location_title_item">
                  {storeTypeFlag &&
                    storeType.InorganicLab.map((el) => (
                      <p key={el.id} onClick={() => specficLabHandler(el.id)}>
                        <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                      </p>
                    ))}
                </div>
              </Collapse>
            </div>
            <div>
              <p
                className="location_title"
                onClick={() => handleCollapse("Personal")}
              >
                <FontAwesomeIcon icon={faFolderOpen} /> Personal
              </p>
              <Collapse in={open.Personal}>
                <div className="location_title_item">
                  {storeTypeFlag &&
                    storeType.Personal.map((el) => (
                      <p key={el.id} onClick={() => specficLabHandler(el.id)}>
                        <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                      </p>
                    ))}
                </div>
              </Collapse>
            </div>
          </div>
        </div>
        <div className="location_specfic_container">
          <div>
            {specficLabContent.content.map((el, i) => (
              <SpecficIssue key={i} item={el} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
