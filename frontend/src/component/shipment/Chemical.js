import React, { useEffect, useState } from "react";
import ChemicalTable from "./ChemicalTable";
import axios from "../../axios/axios";

const Chemical = () => {
  const [chemical, setChemical] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/management/shipments/?type=chemical`)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setFlag(true);
        setChemical(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div
            className="spinner-border"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {chemical.map((el) => (
            <ChemicalTable key={el.id} item={el} flag={flag} />
          ))}
        </>
      )}
    </div>
  );
};

export default Chemical;
