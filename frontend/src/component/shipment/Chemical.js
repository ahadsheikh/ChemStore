import React, {useEffect, useState} from "react";
import ChemicalTable from "./ChemicalTable";
import axios from "../../axios/axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chemical = () => {
  const [chemical, setChemical] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/management/shipments/?type=chemical`)
      .then((res) => {
        setLoading(false);
        setFlag(true);
        setChemical(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        (() => {
          toast(`Something Went Wrong.`);
        })();
      });
  }, []);
  return (
    <div>
      {error && <ToastContainer/>}
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div
            className="spinner-border"
            style={{width: "5rem", height: "5rem"}}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {chemical.length === 0 ? (
            <p className="h1 text-center mt-5">Nothing Found</p>
          ) : (
            <>
              {chemical.map((el) => (
                <ChemicalTable key={el.id} item={el} flag={flag}/>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Chemical;
