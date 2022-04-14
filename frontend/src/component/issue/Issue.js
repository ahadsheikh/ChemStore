import React, { useState, useLayoutEffect, useEffect } from "react";
import Chemical from "./Chemical";
import Instrument from "./Instrument";
import GlassWare from "./GlassWare";
import Location from "../location/Location";
import axios from "../../axios/axios";
import Header from "../add/Header";
import { issueLabHandler } from "../../redux/StoreManagment";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChemicalTable from "./ChemicalTable";
import InstrumentTable from "./InstrumentTable";
import GlasswareTable from "./GlasswareTable";

const Issue = (props) => {
  const dispatch = useDispatch();
  const { issueLab } = useSelector((state) => state.StoreManagment);
  // const [issueList, setIssueList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [isError, setIssError] = useState({ message: "", error: false });
  // const [loading, setLoading] = useState(false);
  // const [issueCredential, setIssueCredential] = useState({
  //   carrier_name: "",
  //   note: "",
  //   issue_date: "",
  // });
  const [fuzzyResult, setFuzzyResult] = useState([]);
  const [Credential, setCredential] = useState({});
  const [listChemical, setListChemical] = useState([]);
  const [listInstrument, setListInstrument] = useState([]);
  const [listGlassware, setListGlassware] = useState([]);
  const [issuedQuantity, setIssuedQuantity] = useState("");
  const [mode, setMode] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [mergeLoading, setMergeLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState({
    id: null,
    loading: false,
  });

  useLayoutEffect(() => {
    dispatch(issueLabHandler(""));
  }, []);


  //// GET TEMP ISSUE LIST AND DIFFERENTIATE BASED ON TYPE
  const getListHandler = () => {
    axios
      .get(`/api/management/issue-cart/`)
      .then((res) => {
        let chemical = [],
          instrument = [],
          glassware = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].object_type === "CHEMICAL")
            chemical.push(res.data[i]);
          else if (res.data[i].object_type === "INSTRUMENT") {
            instrument.push(res.data[i]);
          } else if (res.data[i].object_type === "GLASSWARE") {
            glassware.push(res.data[i]);
          }
        }
        setListChemical(chemical);
        setListInstrument(instrument);
        setListGlassware(glassware);
      })
      .catch((err) => {
        console.log(err.response);
        setDeleteLoading({ id: null, loading: false });
        (() => {
          toast(`Something Went Wrong.`);
        })();
        setIssError({ message: "Something Went Wrong.", error: true });
      });
  };

  useEffect(() => {
    getListHandler();
  }, []);


  //// INPUT HANDLER FOR SEARCHING CHEMICAL, INSTRUMENT OR GLASSWARE BY NAME
  const searchInputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };


  // FOR FRUZZY SEARCH
  const fuzzySearchHandler = (value) => {
    axios
      .get(`/api/management/fuzzysearch/?query=${value}`)
      .then((res) => {
        setFuzzyResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //// IF FOUND FROM FUZZY SEARCH
  const foundCredentialHandler = (item) => {
    setCredential(item);
    setFuzzyResult([]);
    setSearchInput(item.name);
    setIssuedQuantity("");
    setMode(true);
  };

  /// FOR REMOVEING FORM UI
  const removeHandler = () => {
    setCredential({});
    setSearchInput("")
  };

  ////// SUBMIT HANDLER FOR NEW ISSUE OR EDIT TEMP SHIPMENT BASED ON THE MODE STATE 
  const addChemicalHandler = () => {
    setSubmitLoading(true);
    //// IF MOOD IS TRUE THEN ITS NEWLY ADDED ISSUE
    if (mode) {
      const data = {
        object_id: Credential.id,
        object_type: Credential.type,
        quantity: issuedQuantity,
      };
      axios
        .post(`/api/management/issue-cart/`, data)
        .then((res) => {
          setSubmitLoading(false);
          setCredential({});
          getListHandler();
          setSearchInput("");
        })
        .catch((err) => {
          setSubmitLoading(false);
          (() => {
            toast(err.response.data[Object.keys(err.response.data)[0]]);
          })();
          setIssError({ message: "Issue Date is Required", error: true });
        });

        //// FOR EDIT
    } else {
      const updateData = {
        id: Credential.secId,
        object_id: Credential.id,
        object_type: Credential.type,
        quantity: issuedQuantity,
      };
      axios
        .put(`/api/management/issue-cart/${Credential.secId}/`, updateData)
        .then((res) => {
          setSubmitLoading(false);
          setCredential({});
          getListHandler();
        })
        .catch((err) => {
          (() => {
            toast(err.response.data[Object.keys(err.response.data)[0]]);
          })();
          setIssError({ message: "Issue Date is Required", error: true });
          setSubmitLoading(false);
        });
    }
  };

  //// FOR SET THE QUATITY
  const quantityHandler = (e) => {
    setIssuedQuantity(e.target.value);
  };

  //// FOR EDITING
  const editHandler = (item) => {
    setIssuedQuantity(item.quantity);
    setMode(false);
    const newObj = {
      secId: item.id,
      ...item.object,
      type: item.object_type,
    };
    setCredential(newObj);
  };


  //// FOR DELETING A CHEMICAL, INSTRUMENT OR GLASS WARE FROM TEMP ISSUE
  const deleteHandler = (id) => {
    setDeleteLoading({ id, loading: true });
    axios
      .delete(`/api/management/issue-cart/${id}/`)
      .then((res) => {
        getListHandler();
        setDeleteLoading({ id: null, loading: false });
      })
      .catch((err) => {
        setDeleteLoading({ id: null, loading: false });
        (() => {
          toast(err.response.data[Object.keys(err.response.data)[0]]);
        })();
        setIssError({ message: "Issue Date is Required", error: true });
      });
  };

  //// FOR MERGING ALL ISSUE
  const mergeHandlerHandler = () => {
    if (issueLab === null || issueLab === "") {
      (() => toast(`Please Select a Location.`))();
      setIssError({ message: "Please Select a Location.", error: true });
      return;
    }
    setMergeLoading(true)
    axios
      .post(`/api/management/issue-cart/${issueLab}/merge/`, {})
      .then((res) => {
        setListChemical([]);
        setListInstrument([]);
        setListGlassware([]);
        setMergeLoading(false)
      })
      .catch((err) => {
        (() => {
          toast(err.response.data[Object.keys(err.response.data)[0]]);
        })();
        setIssError({ message: "Issue Date is Required", error: true });
        setMergeLoading(false)
      });
  };

  return (
    <>
      {isError.error && <ToastContainer />}
      <div className="issue_container">
        <Header text="Create An Issue" />
        <div className="issue_content_container">
          <div className="issue_content_container_top">
            <div className="issue_fuzzy_search_container">
              <input
                className="issue_content_container_top_input"
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
            <p>Location : </p>
            <div
              style={{
                height: "20rem",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <Location isShow={false} />
            </div>

            {/* <button
              onClick={submitIssueHandler}
              className="issue_button"
              disabled={loading}
            >
              Submit
            </button> */}
          </div>
        </div>
      </div>
      <div className="container-md mb-5">
        {Object.keys(Credential).length !== 0 &&
          Credential.type === "CHEMICAL" && (
            <Chemical
              data={Credential}
              removeHandler={removeHandler}
              value={issuedQuantity}
              quantityHandler={quantityHandler}
              submitHandler={addChemicalHandler}
              mode={mode}
              submitLoading={submitLoading}
            />
          )}
        {Object.keys(Credential).length !== 0 &&
          Credential.type === "INSTRUMENT" && (
            <Instrument
              data={Credential}
              removeHandler={removeHandler}
              value={issuedQuantity}
              quantityHandler={quantityHandler}
              submitHandler={addChemicalHandler}
              mode={mode}
              submitLoading={submitLoading}
            />
          )}
        {Object.keys(Credential).length !== 0 &&
          Credential.type === "GLASSWARE" && (
            <GlassWare
              data={Credential}
              removeHandler={removeHandler}
              value={issuedQuantity}
              quantityHandler={quantityHandler}
              submitHandler={addChemicalHandler}
              mode={mode}
              submitLoading={submitLoading}
            />
          )}
      </div>

      <div className="container">
        {listChemical.length > 0 && (
          <ChemicalTable
            item={listChemical}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            deleteLoading={deleteLoading}
          />
        )}
        {listInstrument.length > 0 && (
          <InstrumentTable
            item={listInstrument}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            deleteLoading={deleteLoading}
          />
        )}
        {listGlassware.length > 0 && (
          <GlasswareTable
            item={listGlassware}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            deleteLoading={deleteLoading}
          />
        )}

        {listChemical.length > 0 ||
          listInstrument.length > 0 ||
          listGlassware.length > 0 ? (
            <div className="clearfix">
              <button
                onClick={mergeHandlerHandler}
                className="btn btn-primary mt-2 mb-5 px-4 float-end fontSize1_6"
                disabled={mergeLoading}
              >
                {mergeLoading && (
                  <div className="spinner-border me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Submit
              </button>
            </div>
          ): null}
      </div>
    </>
  );
};

export default Issue;
