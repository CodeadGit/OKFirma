import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../kesifler/kesifler.scss";
import { NavLink } from "react-router-dom";
import Empty from "../home/svg/empty.svg";

import TeklifTablosu from "../../components/tablolar/teklifTablosu/TeklifTablosu";
import Navigation from "../../components/boxes/Navigation";

function Kesiflerim({ data }) {
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşiflerim", to: "/kesiflerim", id: "02" },
  ];

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Navigation children={pathData} />
          {data?.length > 0 ? (
            <TeklifTablosu data={data} />
          ) : (
            <div className="empty">
              <img src={Empty} alt="" />

              <NavLink to="/kesifler" className="button">
                Keşiflere Git
              </NavLink>
            </div>
          )}
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default Kesiflerim;
