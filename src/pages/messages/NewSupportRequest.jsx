import { Alert } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import NewSupport from "./NewSupport";
import "./newSupport.scss";
import Navigation from "../../components/boxes/Navigation";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import HelpRequest from "./svg/helpRequest.svg";
import LiveIcon from "./svg/liveIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Mesajlar from "../../components/sidebar/svg/messages.svg";
import LiveChatTablo from "../../components/tablolar/liveChatTablo/LiveChatTablo";
import SidebarBottom from "../../components/sidebar/SidebarBottom";

function NewSupportRequest() {
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const pathData = [
    { text: "Panelim", to: "/", id: "02" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    {
      text: "Yeni Destek Talebi",
      to: "/mesajlarim/Yeni-Destek-Talebi",
      id: "03",
    },
  ];

  return (
    <>
      <div className="home">
        <Sidebar />
        <SidebarBottom></SidebarBottom>

        <div className="homeContainer">
          {alert ? (
            <Alert
              onClick={() => setAlert("")}
              className="alert"
              severity="success"
            >
              {alert}
              <button className="alert-button">Tamam</button>
            </Alert>
          ) : null}
          {error ? (
            <Alert
              className="alert"
              onClick={() => setError("")}
              severity="error"
            >
              {error}
              <button className="alert-button">Tamam</button>
            </Alert>
          ) : null}

          <PageNavbar />

          <div className="messagesButtons">
            <NavLink
              className={({ isActive }) =>
                isActive ? "leftButton active" : "leftButton"
              }
              to="/mesajlarim/Canli-Destek"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to="/mesajlarim/Canli-Destek"
              >
                <img src={LiveIcon} alt="" />
                Canlı Destek
              </NavLink>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "rightButton active" : "rightButton"
              }
              to="/mesajlarim/Destek-Talebi"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link2 active" : "link2"
                }
                to="/mesajlarim/Destek-Talebi"
              >
                <img src={HelpRequest} alt="" />
                Destek Talebi
              </NavLink>
            </NavLink>
          </div>

          <div className="newrequest-duble">
            {/* <Navbar /> */}
            {/* <Navigation children={pathData} /> */}
            <NewSupport setAlert={setAlert} setError={setError} />

            <div className="liveChatStatus">
              <div className="innerChatStatus">
                <div className="liveChatHeader">
                  <img className="mesaj-icon" src={Mesajlar} alt="" />

                  <p>Destek Talepleriniz</p>
                </div>
                <hr />
                <LiveChatTablo />
                <hr />
                <div className="liveChatFooter">
                  <button
                    onClick={() => navigate("/mesajlarim/Yeni-Destek-Talebi")}
                  >
                    Yeni Talep Oluştur
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <RightSideBar/> */}
        </div>
      </div>
    </>
  );
}

export default NewSupportRequest;
