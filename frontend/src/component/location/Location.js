import React, { useState, useEffect } from "react";
import { storeTypes, storeStructure } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import { issueLabHandler } from "../../redux/StoreManagment";
import { useDispatch } from "react-redux";
import SecondModal from "../modal/SecondModal";
import Input from "../input/Input";
import axios from "../../axios/axios";
import LocationHeader from "./LocationHeader";
import SpecficIssue from "./SpecficIssue";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { msgFormater } from "../../utils/utils";

const Location = ({ isShow = true }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    PhysicalLab: false,
    OrganicLab: false,
    InorganicLab: false,
    Personal: false,
  });
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [seletedLab, setSelectedLab] = useState(-1);
  const [storeType, setStoreType] = useState({});
  const [storeTypeFlag, setStoreTypeFlag] = useState(false);
  const [show, setShow] = useState({ create: false });
  const [credential, setCredential] = useState(storeStructure);
  const [error, setError] = useState({ isError: false, message: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isError, setIssError] = useState(false);
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
        setIssError(true);
        (() => toast(`Something went Wrong.`))();
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
    setSubmitLoading(true);
    setIssError(false);
    if (
      credential.name !== "" &&
      credential.building_name !== "" &&
      credential.consumer_type !== "" &&
      credential.room_number !== ""
    ) {
      axios
        .post("/api/management/store-consumers/", credential)
        .then((res) => {
          setSubmitLoading(false);
          setCredential(storeStructure);
          handleClose();
        })
        .catch((err) => {
          setSubmitLoading(false);
          setIssError(true);
          (() => toast(msgFormater(err)))();
        });
    } else {
      setIssError(true);
      (() => toast(`All Field are required.`))();
      setError({ isError: true, message: "Please fill all Field!!" });
      setSubmitLoading(false);
    }
  };

  const specficLabHandler = (id) => {
    setFlag(false);
    setLoading(true);
    dispatch(issueLabHandler(id));
    setSelectedLab(id);
    setLoading(true);
    setSpecficLabContent({ content: [], loading: true });
    axios
      .get(`/api/management/issues/${id}/`)
      .then((res) => {
        setLoading(false);
        setFlag(true);
        setSpecficLabContent({ content: res.data, loading: false });
      })
      .catch((err) => {
        setLoading(false);
        setSpecficLabContent({ content: [], loading: false });
        setIssError(true);
        (() => toast(`Something went Wrong.`))();
      });
  };

  return (
    <>
      {isError && <ToastContainer />}
      {/* FOR RENDERING MODAL */}
      <SecondModal
        show={show.create}
        handleClose={handleClose}
        handleShow={showModalHandler}
        info="Please enter details for the New Location."
        title="Create Location"
        btn_text="Create"
        submitHandler={submitHandler}
        loading={submitLoading}
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
          className={
            isShow
              ? "location_container "
              : "location_container location_container-issue"
          }
          style={{
            // width: isShow ? "30%" : "100%",
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
                      <p
                        className={
                          el.id === seletedLab ? "seleted_location" : ""
                        }
                        key={el.id}
                        onClick={() => specficLabHandler(el.id)}
                      >
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
                      <p
                        className={
                          el.id === seletedLab ? "seleted_location" : ""
                        }
                        key={el.id}
                        onClick={() => specficLabHandler(el.id)}
                      >
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
                      <p
                        className={
                          el.id === seletedLab ? "seleted_location" : ""
                        }
                        key={el.id}
                        onClick={() => specficLabHandler(el.id)}
                      >
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
                      <p
                        className={
                          el.id === seletedLab ? "seleted_location" : ""
                        }
                        key={el.id}
                        onClick={() => specficLabHandler(el.id)}
                      >
                        <FontAwesomeIcon icon={faChevronRight} /> {el.name}
                      </p>
                    ))}
                </div>
              </Collapse>
            </div>
          </div>
        </div>
        {isShow && loading && (
          <div className="location_specfic_message">
            <div
              className="spinner-border text-light"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="visually-hidden text-center">Loading...</span>
            </div>
          </div>
        )}
        {isShow && flag && specficLabContent.content.length === 0 && (
          <div className="location_specfic_message">
            <h1 style={{ textAlign: "center" }}>Nothing Found</h1>
          </div>
        )}
        {isShow && (
          <div className="location_specfic_container">
            <div>
              {specficLabContent.content.length > 0 &&
                specficLabContent.content.map((el, i) => (
                  <SpecficIssue key={i} item={el} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Location;
