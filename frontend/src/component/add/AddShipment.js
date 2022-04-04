import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import ChemicalModal from "./ChemicalModal";
import AddChemical from "./AddChemical";
import AddInstrument from "./AddInstrument";
import AddGlassWare from "./AddGlassWare";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/Container";
import axios from "../../axios/axios";
import Textarea from "../input/Textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {} from "../..";
import AddChemicalTest from "../addShipment/AddChemicalTest";
import AddInstrumentTest from "../addShipment/AddInstrumentTest";

const dummyChemical = {
  CAS_RN: "",
  quantity: "",
  isNew: false,
  manufacturer: "",
  molecular_formula: "",
  molecular_weight: "",
  name: "",
  purity: "",
  state: "",
  supplier: "",
  type: "",
};

const dummyInstrument = {
  name: "",
  manufacturer: "",
  supplier: "",
  quantity: "",
};

const dummyGlassware = {
  name: "",
  manufacturer: "",
  supplier: "",
  size: "",
  material_type: "",
  quantity: "",
};

const AddShipment = (props) => {
  const dispatch = useDispatch();
  const {
    chemical: chemicalModal,
    instrument: instrumentModal,
    glassWare,
  } = useSelector((state) => state.container);

  const [fuzzySearch, setFuzzySearch] = useState({
    options: [],
    isProcessing: false,
  });
  const [credential, setCredential] = useState([]);
  const [chemicalCredential, setChemicalCredential] = useState({
    chemical: "",
    instrument: "",
    glassWare: "",
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [notes, setNotes] = useState("");
  const notesHandler = (e) => setNotes(e.target.value);
  const [gotError, setGotError] = useState(false);
  const [chemicals, setChemicals] = useState([])
  const [credentialChemical, setCredentialChemical] = useState(dummyChemical)
  const [credentialChemicalLoading, setSredentialChemicalLoading] = useState(false)

  useEffect(() => {
    axios
      .get("/api/management/chemicals/")
      .then((res) => {
        setChemicals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  ///// MAKE SERVER REQUEST
  const fuzzySearchHandler = (value, name) => {
    setFuzzySearch({ options: [], isProcessing: true });
    let url = ``;
    if (name === "chemical")
      url = `/api/management/fuzzysearch/?type=chemical&query=${value}`;
    else if (name === "instrument") {
      url = `/api/management/fuzzysearch/?type=instrument&query=${value}`;
    } else url = `/api/management/fuzzysearch/?type=glassware&query=${value}`;
    axios
      .get(url)
      .then((res) => {
        setFuzzySearch({ options: res.data, isProcessing: false });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  ////CLOSE MODEL
  const closeModalHandler = () => {
    dispatch(closeModal());
    setChemicalCredential({
      chemical: "",
      instrument: "",
      glassWare: "",
    });
    setFuzzySearch([]);
  };

  ///////HANDLE USER INPUT
  const inputHandler = (e) => {
    const { name, value } = e.target;
    fuzzySearchHandler(value, name);
    console.log(value)
    setChemicalCredential({ ...chemicalCredential, [name]: value });
  };
  const chemicalInputHandler = e => {
      const {name, value} = e.target
      setCredentialChemical({...credentialChemical, [name]: value})
  }

  //////IF ELEMENT EAIST THEN THEN CONSITIONALLY ADD THAT TYPE OF CREDENTIAL
  const foundChemicalHandler = (name, type, isNew, el = dummyChemical) => {
    console.log(el, isNew, type);
    const copyCredential = [...credential];
    
    if (type === "chemical" && isNew) {
      copyCredential.push({ ...el, type: "chemical", isNew });
    } else if (type === "chemical" && !isNew) {
      copyCredential.push({
        ...dummyChemical,
        name: name,
        type: "chemical",
        isNew,
      });
    } else if (type === "instrument" && isNew) {
      copyCredential.push({ ...el, type: "instrument", isNew });
    } else if (type === "instrument" && !isNew) {
      copyCredential.push({
        ...dummyInstrument,
        name: name,
        type: "instrument",
        isNew,
      });
    } else if (type === "glassWare" && isNew) {
      copyCredential.push({ ...el, type: "glassware", isNew });
    } else if (type === "glassWare" && !isNew) {
      copyCredential.push({
        ...dummyGlassware,
        name: name,
        type: "glassware",
        isNew,
      });
    }
    console.log(copyCredential);
    setFuzzySearch([]);
    setCredential(copyCredential);
    closeModalHandler();
  };

  ////////Remove Credential Handler
  const removeCredentialHandler = (index) => {
    const copyCredential = [...credential];
    copyCredential.splice(index, 1);
    setCredential(copyCredential);
  };

  //INPUT
  const inputDataHandler = (e, index) => {
    let copyCredential = [...credential];
    let editCredential = copyCredential[index];
    const { name, value } = e.target;
    editCredential[name] = value;
    copyCredential[index] = editCredential;
    setCredential(copyCredential);
  };

  //// SUBMIT SHIPMENT
  const submitShipmentHandler = () => {
    setLoading(true);
    const date = new Date();
    let finalObj = {
      shipment_date: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      note: notes,
      chemical: {
        old: [],
        new: [],
      },
      glassware: {
        old: [],
        new: [],
      },
      instrument: {
        old: [],
        new: [],
      },
    };
    let copyCredential = [...credential];

    for (let item of copyCredential) {
      if (item.type === "chemical" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.chemical,
          new: finalObj.chemical.new.push({
            ...item,
            store: process.env.REACT_APP_STORE_ID,
          }),
        };
      } else if (item.type === "chemical" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.chemical,
          old: finalObj.chemical.old.push({
            id: item.id,
            quantity: item.quantity,
          }),
        };
      } else if (item.type === "instrument" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.instrument,
          new: finalObj.instrument.new.push({
            ...item,
            store: process.env.REACT_APP_STORE_ID,
          }),
        };
      } else if (item.type === "instrument" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.instrument,
          old: finalObj.instrument.old.push({
            id: item.id,
            quantity: item.quantity,
          }),
        };
      } else if (item.type === "glassware" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.glassware,
          new: finalObj.glassware.new.push({
            ...item,
            store: process.env.REACT_APP_STORE_ID,
          }),
        };
      } else if (item.type === "glassware" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.glassware,
          old: finalObj.glassware.old.push({
            id: item.id,
            quantity: item.quantity,
          }),
        };
      }
    }
    try {
      delete finalObj.new;
      delete finalObj.old;
    } catch {}

    setTimeout(() => {
      axios
        .post(`/api/management/add-shipment/`, finalObj)
        .then((res) => {
          setIsError({ error: true, message: `Successfully Added Shipment` });
          if (res.data?.errors.length === 0)
            (() => toast(`Successfully Added Shipment`))();
          setCredential([]);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data?.errors.length > 0)
            (() => toast(`Please provide Valid Data.`))();
          setLoading(false);
          setIsError({ error: true, message: "Please provide Valid Data." });
        });
    }, 1000);
  };
  const checkHandler = () => {
      console.log(credentialChemical)
  }

  ////////SHOW UI TO USER

  return (
    <>
      {isError.error && <ToastContainer />}
      <div className="add_credential_container">
        <div className="add_credential_element_container">
          {chemicalModal && (
            <AddChemicalTest
              searchInputvalue={chemicalCredential.chemical}
              value={credentialChemical}
              inputHandler={inputHandler}
              handler={chemicalInputHandler}
              foundChemicalHandler={foundChemicalHandler}
              checkHandler = {checkHandler}
              options={fuzzySearch.options}
              isProcessing={fuzzySearch.isProcessing}
              chemicals={chemicals}
            />
          )}
          {instrumentModal && <AddInstrumentTest />}
          {glassWare && <div>Glass Ware</div>}

          {/* CONDITIONALLY RENDERING  */}
          <div className="">

            {credential.length > 0 && (
              <button
                onClick={submitShipmentHandler}
                className="add_credential_submit_btn"
                disabled={loading}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddShipment;
