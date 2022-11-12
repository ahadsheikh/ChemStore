import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {currentTab} from "../../redux/Shipment";
import Chemical from "./Chemical";
import Instrument from "./Instrument";
import GlassWare from "./GlassWare";

const Main = () => {
  const dispatch = useDispatch();
  const {chemical, instrument, glassWare} = useSelector(
    (state) => state.shipment
  );

  return (
    <div className="container mt-5">
      <div className="show_shipment_container">
        <p
          style={{backgroundColor: chemical && "#2d3133"}}
          onClick={() => dispatch(currentTab("chemical"))}
        >
          Chemical
        </p>
        <p
          style={{backgroundColor: instrument && "#2d3133"}}
          onClick={() => dispatch(currentTab("instrument"))}
        >
          Instrument
        </p>
        <p
          style={{backgroundColor: glassWare && "#2d3133"}}
          onClick={() => dispatch(currentTab("glassWare"))}
        >
          Glassware
        </p>
      </div>
      <div>
        {chemical && <Chemical/>}
        {instrument && <Instrument/>}
        {glassWare && <GlassWare/>}
      </div>
    </div>
  );
};

export default Main;
