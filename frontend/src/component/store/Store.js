import React, { useState } from "react";
import Chemical from "./chemical/Chemical";
import Instrument from "./instrument/Instrument";
import Glassware from "./glassware/Glassware";

const   Store = () => {
  const [table, setTable] = useState({
    chemical: true,
    instrument: false,
    glassware: false,
  });

  const tabHandler = (name) => {
    let dummy = {
      chemical: false,
      instrument: false,
      glassware: false,
    };
    setTable({ ...dummy, [name]: true });
  };

  return (
    <div>
      <div className="container-md mt-5">
        <div className="show_shipment_container">
          <p
            style={{ backgroundColor: table.chemical && "#2d3133" }}
            onClick={() => tabHandler("chemical")}
          >
            Chemical
          </p>
          <p
            style={{ backgroundColor: table.instrument && "#2d3133" }}
            onClick={() => tabHandler("instrument")}
          >
            Instrument
          </p>
          <p
            style={{ backgroundColor: table.glassware && "#2d3133" }}
            onClick={() => tabHandler("glassware")}
          >
            Glassware
          </p>
        </div>
      </div>
      {table.chemical && <Chemical />}
      {table.instrument && <Instrument />}
      {table.glassware && <Glassware />}
    </div>
  );
};

export default Store;
