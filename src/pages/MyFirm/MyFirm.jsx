import React from "react";
import Navigation from "../../components/boxes/Navigation";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EditForm from "./EditForm";
import "./myFirm.scss";

function MyFirm() {
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Firma Bilgilerim", to: "/firma-bilgilerim", id: "02" },
  ];

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Navigation children={pathData} />
          <div className="editContainer">
            <EditForm />
          </div>
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default MyFirm;
