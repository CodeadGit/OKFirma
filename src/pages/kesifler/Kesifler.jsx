import React from "react";
// import Navigation from "../../components/boxes/Navigation";
// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./kesifler.scss";
import KesifFirsatiTablo from "../../components/tablolar/kesifFirsatiTablo/KesifFirsatiTablo.jsx";
import PageNavbar from "../../components/pageNavbar/PageNavbar.js";
import { useLocation } from "react-router-dom";
import SidebarBottom from "../../components/sidebar/SidebarBottom";

function Kesifler({ data }) {

  // const pathData = [
  //   { text: "Panelim", to: "/", id: "01" },
  //   { text: "Keşif Fırsatları", to: "/kesifler", id: "02" },
  // ];

  const location = useLocation();

  const kesiflerPage = location.pathname === "/kesifler";
  
  return (
    <>
      <div className="home">
        <Sidebar />
        <SidebarBottom></SidebarBottom>
        <div className={`homeContainer ${kesiflerPage ? "kesiflerim" : ""}`}>
          {/* <Navbar /> */}
          {/* <Navigation children={pathData} /> */}
          <PageNavbar />
          <KesifFirsatiTablo data={data} kesiflerPage />
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default Kesifler;
