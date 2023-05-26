import React from "react";
import Navigation from "../../components/boxes/Navigation";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EditPassword from "./EditPassword";
import "./settings.scss";

function Settings() {
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Ayarlar", to: "/ayarlar", id: "02" },
  ];
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Navigation children={pathData} />
          <div className="editContainer">
            <EditPassword />
          </div>
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default Settings;
