import React from "react";
// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../kesifler/kesifler.scss";
import { NavLink, useLocation } from "react-router-dom";
import Empty from "../home/svg/empty.svg";
import TeklifTablosu from "../../components/tablolar/teklifTablosu/TeklifTablosu";
// import Navigation from "../../components/boxes/Navigation";
import PageNavbar from "../../components/pageNavbar/PageNavbar";

function Kesiflerim({ data }) {

  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşiflerim", to: "/kesiflerim", id: "02" },
  ];

  const location = useLocation();

  const kesiflerimPage = location.pathname === "/kesiflerim";

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className={`homeContainer ${kesiflerimPage ? "kesiflerim" : ""}`}>
          {/* <Navbar />     
          <Navigation children={pathData} /> */}
          <PageNavbar />
          {data?.length > 0 ? (
            <TeklifTablosu data={data} kesiflerimPage />
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
