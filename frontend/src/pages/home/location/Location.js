import React, { useState, useEffect } from "react";
import { storeTypes, storeStructure } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import { issueLabHandler } from "../../../redux/StoreManagment";
import { useDispatch } from "react-redux";

import SecondModal from "../../../component/modal/SecondModal";
import Input from "../../../component/input/Input";
import axios from "../../../axios/axios";
import LocationHeader from "./LocationHeader";
// import Error from "../error/Error";
import SpecficIssue from "./SpecficIssue";

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
    setFlag(false);
    setLoading(true);
    dispatch(issueLabHandler(id));
    setSelectedLab(id);
    setLoading(true);
    setSpecficLabContent({ content: [], loading: true });
    axios
      .get(`/api/userview/issues/consumer/${id}/`)
      .then((res) => {
        setLoading(false);
        setFlag(true);
        setSpecficLabContent({ content: res.data, loading: false });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
        setSpecficLabContent({ content: [], loading: false });
      });
  };

  return (
    <>
      {/* HEADER  */}

      <div className="location_container_div">
        <div
          className={
            isShow
              ? "location_container "
              : "location_container location_container-issue"
          }
          style={{
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
          <div className="location_specfic_container background_color_black">
            <div>
              {specficLabContent.content.map((el, i) => (
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
