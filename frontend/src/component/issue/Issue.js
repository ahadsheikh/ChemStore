import React, { useState, useLayoutEffect, useEffect } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Chemical from "./Chemical";
import Instrument from "./Instrument";
import GlassWare from "./GlassWare";
import Location from "../location/Location";
import axios from "../../axios/axios";
import { withRouter } from "react-router";
import Header from "../add/Header";
import { issueLabHandler } from "../../redux/StoreManagment";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../component/error/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChemicalTable from "./ChemicalTable";
import InstrumentTable from "./InstrumentTable";
import GlasswareTable from "./GlasswareTable";

const Issue = (props) => {
  const dispatch = useDispatch();
  const { issueLab } = useSelector((state) => state.StoreManagment);
  const [issueList, setIssueList] = useState([]);
  const [fuzzySearchResult, setFuzzySearchResult] = useState({
    index: -1,
    type: "",
    options: [],
    isloading: true,
  });
  const [searchInput, setSearchInput] = useState("");

  const [isError, setIssError] = useState({ message: "", error: false });
  const [loading, setLoading] = useState(false);
  const [issueCredential, setIssueCredential] = useState({
    carrier_name: "",
    note: "",
    issue_date: "",
  });
  const [fuzzyResult, setFuzzyResult] = useState([]);
  const [Credential, setCredential] = useState({});
  const [listChemical, setListChemical] = useState([]);
  const [listInstrument, setListInstrument] = useState([]);
  const [listGlassware, setListGlassware] = useState([]);
  const [issuedQuantity, setIssuedQuantity] = useState("");
  const [mode, setMode] = useState(true);

  useLayoutEffect(() => {
    dispatch(issueLabHandler(""));
  }, []);

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
        console.log(err.response)
      });
  }

  useEffect(() => {
    getListHandler()
  }, []);

  const issueHandler = (name) => {
    const issueListCopy = [...issueList];
    issueListCopy.push({ material_type: name, quantity: "", id: "" });
    setIssueList(issueListCopy);
  };

  // const fuzzySearchHandler = (value, name, i) => {
  //   setFuzzySearchResult({
  //     index: i,
  //     type: name,
  //     options: [],
  //     isloading: true,
  //   });
  //   let url = ``;
  //   if (name === "chemical") {
  //     url = `/api/management/fuzzysearch/?type=chemical&query=${value}`;
  //   } else if (name === "instrument") {
  //     url = `/api/management/fuzzysearch/?type=instrument&query=${value}`;
  //   } else url = `/api/management/fuzzysearch/?type=glassware&query=${value}`;
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setFuzzySearchResult({
  //         index: i,
  //         type: name,
  //         options: res.data,
  //         isloading: false,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  const inputHandler = (e, i) => {
    const { name, value } = e.target;
    if (name === "chemical" || name === "instrument" || name === "glassware") {
      fuzzySearchHandler(value, name, i);
    }

    let issueListCopy = [...issueList];
    let issueElement = issueListCopy[i];
    issueElement = {
      ...issueElement,
      [name]: value,
    };
    issueListCopy[i] = issueElement;
    setIssueList(issueListCopy);
  };

  const submitIssueHandler = () => {
    setIssError({ message: "", error: false });
    const issueCredentialCopy = { ...issueCredential, consumer_id: issueLab };
    console.log(issueCredentialCopy);

    if (issueCredentialCopy.carrier_name === "") {
      (() => toast(`Carrier Name is Required`))();
      setIssError({ message: "Carrier Name is Required", error: true });
      return;
    } else if (issueCredentialCopy.issue_date === "") {
      (() => {
        toast(`Issue Date is Required`);
      })();
      setIssError({ message: "Issue Date is Required", error: true });
      return;
    } else if (issueCredentialCopy.consumer_id === "") {
      (() => toast(`Please Select a Loaction`))();
      setIssError({ message: "Please Select a Loaction", error: true });
      return;
    } else if (issueList.length === 0) {
      (() => toast(`Nothing to Issue`))();
      setIssError({ message: "Nothing to Issue", error: true });
      return;
    }

    const issueListCopy = [...issueList];
    issueListCopy.forEach((issue) => {
      if (issue.material_type === "CHEMICAL") delete issue.chemical;
      else if (issue.material_type === "INSTRUMENT") delete issue.instrument;
      else if (issue.material_type === "GLASSWARE") delete issue.glassware;
    });
    console.log(issueList);
    issueCredentialCopy.objects = issueListCopy;

    setLoading(true);

    axios
      .post(`/api/management/make-issue/`, issueCredentialCopy)
      .then((res) => {
        if (res.data.errors.length === 0) (() => toast(`Shipment Added.`))();
        setIssueList([]);
        setIssueCredential({
          carrier_name: "",
          note: "",
          issue_date: "",
        });
        setIssError({ message: "Shipment Added", error: true });
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        if (err.response.data?.errors.length > 0)
          (() => toast(err.response.data?.errors[0]))();
        setLoading(false);

        console.log(err.response);
        setIssError({ message: "Something Went Wrong", error: true });
      });

    console.log(issueCredentialCopy);
  };

  // const foundCredentialHandler = (value, id, index, name) => {
  //   let issueListCopy = [...issueList];
  //   let element = issueListCopy[index];
  //   element[name] = value;
  //   element.id = id;
  //   issueListCopy[index] = element;
  //   setFuzzySearchResult({
  //     index: -1,
  //     type: "",
  //     options: [],
  //     isloading: true,
  //   });
  //   setIssueList(issueListCopy);
  // };

  const removeIssueHandler = (index) => {
    let issueListCopy = [...issueList];
    issueListCopy.splice(index, 1);
    setIssueList(issueListCopy);
  };

  const issueInputHandler = (e) => {
    const { name, value } = e.target;
    setIssueCredential({ ...issueCredential, [name]: value });
  };

  const searchInputHandler = (e) => {
    fuzzySearchHandler(e.target.value);
    setSearchInput(e.target.value);
  };

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

  const foundCredentialHandler = (item) => {
    setCredential(item);
    setFuzzyResult([]);
    setSearchInput(item.name);
    setIssuedQuantity("");
    setMode(true);
  };
  const removeHandler = () => {
    setCredential({});
  };

  ////// SUBMIT HANDLER
  const addChemicalHandler = () => {
    if (mode) {
      const data = {
        object_id: Credential.id,
        object_type: Credential.type,
        quantity: issuedQuantity,
      };
      axios
        .post(`/api/management/issue-cart/`, data)
        .then((res) => {
          console.log(res);
          getListHandler()
        })
        .catch((err) => {
          console.log(err.data);
        });
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
          console.log(res.data);
          getListHandler()
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const quantityHandler = (e) => {
    setIssuedQuantity(e.target.value);
  };

  const editHandler = (item) => {
    console.log(item);
    setIssuedQuantity(item.quantity);
    setMode(false);
    const newObj = {
      secId: item.id,
      ...item.object,
      type: item.object_type,
    };
    setCredential(newObj);
    // console.log("CLICKED")
  };

  const deleteHandler = (id) => {
    axios
      .delete(`/api/management/issue-cart/${id}/`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
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

            <button
              onClick={submitIssueHandler}
              className="issue_button"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="container-sm mb-5">
        {Object.keys(Credential).length !== 0 &&
          Credential.type === "CHEMICAL" && (
            <Chemical
              data={Credential}
              removeHandler={removeHandler}
              value={issuedQuantity}
              quantityHandler={quantityHandler}
              submitHandler={addChemicalHandler}
              mode={mode}
            />
          )}
        {Object.keys(Credential).length !== 0 &&
          Credential.type === "INSTRUMENT" && (
            <Instrument
              data={Credential}
              removeHandler={removeHandler}
              quantityHandler={quantityHandler}
            />
          )}
        {Object.keys(Credential).length !== 0 &&
          Credential.type === "GLASSWARE" && (
            <GlassWare
              data={Credential}
              removeHandler={removeHandler}
              quantityHandler={quantityHandler}
            />
          )}
      </div>

      <div>
        {listChemical.length > 0 && (
          <ChemicalTable
            item={listChemical}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        )}
        {listInstrument.length > 0 && <InstrumentTable item={listInstrument} />}
        {listGlassware.length > 0 && <GlasswareTable item={listGlassware} />}
      </div>
    </>
  );
};

export default Issue;
