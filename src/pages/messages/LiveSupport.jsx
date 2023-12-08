import React from "react";
// import Navigation from "../../components/boxes/Navigation";
import LiveChat from "../../components/livechat/LiveChat";
// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./liveSupport.scss";
import LiveChatTablo from "../../components/tablolar/liveChatTablo/LiveChatTablo";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import { NavLink, useNavigate } from "react-router-dom";
import LiveIcon from "./svg/liveIcon.svg";
import HelpRequest from "./svg/helpRequest.svg";
import Mesajlar from "../../components/sidebar/svg/messages.svg";

function LiveSupport() {
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Canlı Destek", to: "/mesajlarim/Canli-Destek", id: "03" },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          {/* <Navbar /> */}
          {/* <Navigation children={pathData} /> */}
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

          <div className="chatArea">
            <div className="liveChat">
              <LiveChat />
            </div>
            <div className="liveChatStatus">
              <div className="innerChatStatus">
                <div className="liveChatHeader">

                 <img className="mesaj-icon" src={Mesajlar} alt="" />

                  <p>
                    Destek Talepleriniz
                  </p>

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
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default LiveSupport;
