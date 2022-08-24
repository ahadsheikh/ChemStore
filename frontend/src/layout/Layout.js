import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import Store from "../component/store/Store";
import UserManagment from "../component/userManagment/UserManagment";

import Add from "../pages/add/Add";
import Issue from "../component/issue/Issue";
import Location from "../component/location/Location";
import Search from "../component/search/Search";
import axios from "../axios/axios";
import OverLaySideBar from "./OverLaySideBar";
import AddShipment from "../component/add/AddShipment";
import Main from "../component/shipment/Main";
import FileManagment from "../component/fileManagment/FileManagment";
import CategoryMain from "../component/category/Main";

const Layout = () => {
  const [showBackModal, setShowBlockModal] = useState(false);
  const [id, setId] = useState(0);
  const [storeList, setStoreList] = useState([]);
  let arr = [
    <Search />,
    <AddShipment />,
    <Store />,
    <Location />,
    <Issue />,
    <UserManagment />,
    <Main />,
    <FileManagment />,
    <CategoryMain />,
  ];

  const sideDrawerHandler = () => {
    setShowBlockModal((preState) => !preState);
  };

  // useEffect(() => {
  //   axios
  //     .get(`/api/management/stores/`)
  //     .then((res) => {
  //       setStoreList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // }, []);

  let pages = arr[id];
  const handlePage = (id) => {
    setId(id);
  };

  return (
    <>
      <OverLaySideBar isShow={showBackModal} hanlder={sideDrawerHandler}>
        <Sidebar
          name="overLay_sidebar"
          handlePage={handlePage}
          storeList={storeList}
        />
      </OverLaySideBar>
      <Navigation handler={sideDrawerHandler} />
      <div className="layout">
        <Sidebar
          isShow={showBackModal}
          name="sidebar_container"
          handlePage={handlePage}
          storeList={storeList}
        />

        <div
          style={{
            width: "100%",
            // height: "50rem",
          }}
        >
          {pages}
        </div>
      </div>
    </>
  );
};

export default Layout;
