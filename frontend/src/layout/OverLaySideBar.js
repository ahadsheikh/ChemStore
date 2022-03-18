import React from "react";
import Sidebar from "./Sidebar";

function OverLaySideBar(props) {
  return (
    <>
      <div
        style={{ display: props.isShow ? "block" : "none" }}
        onClick={props.hanlder}
        className="backModal"
      ></div>
      <div
        style={{
          visibility: props.isShow ? "visible" : "hidden",
          transform: props.isShow ? "translateX(0)" : "translateX(-100%)",
        }}
        className="ghghgh"
      >
        <p className="overlay_title">Chem Store</p>
        {props.children}
      </div>
    </>
  );
}

export default OverLaySideBar;
