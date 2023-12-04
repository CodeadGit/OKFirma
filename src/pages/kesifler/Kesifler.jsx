import React from "react";
import Navigation from "../../components/boxes/Navigation";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./kesifler.scss";
import KesifFirsatiTablo from "../../components/tablolar/kesifFirsatiTablo/KesifFirsatiTablo.jsx";

function Kesifler({ data }) {
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşif Fırsatları", to: "/kesifler", id: "02" },
  ];

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          {/* <Navigation children={pathData} /> */}
          <KesifFirsatiTablo data={data} />
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default Kesifler;
