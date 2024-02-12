import React from "react";
import { NavLink } from "react-router-dom";
// import Navigation from "../../components/boxes/Navigation";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import LiveIcon from "./svg/liveIcon.svg";
import HelpRequest from "./svg/helpRequest.svg";
import "./messages.scss";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import SidebarBottom from "../../components/sidebar/SidebarBottom";

function Messages() {

  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
  ];

  return (
    <>
      <div className="home">
        <Sidebar />
        <SidebarBottom></SidebarBottom>
        <div className="homeContainer">
          <PageNavbar />
          <Navbar />
          {/* <Navigation children={pathData} /> */}
          <div className="messagesArea">
            
            <div className="left innerArea">
              <NavLink to="/mesajlarim/Canli-Destek">
                <img src={LiveIcon} alt="" />
                Canlı Destek
              </NavLink>
            </div>
            <div className="right innerArea">
              <NavLink to="/mesajlarim/Destek-Talebi">
                <img src={HelpRequest} alt="" />
                Destek Talebi
              </NavLink>
            </div>
          </div>
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default Messages;
