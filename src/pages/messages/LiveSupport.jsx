import React from "react";
import Navigation from "../../components/boxes/Navigation";
import LiveChat from "../../components/livechat/LiveChat";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./liveSupport.scss";
import LiveChatTablo from "../../components/tablolar/liveChatTablo/LiveChatTablo";

function LiveSupport() {
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Canlı Destek", to: "/mesajlarim/Canli-Destek", id: "03" },
  ];

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Navigation children={pathData} />
          <div className="chatArea">
            <div className="liveChat">
              <LiveChat />
            </div>
            <div className="liveChatStatus">
              <div className="innerChatStatus">
                <div className="liveChatHeader">
                  <p>Destek Talepleriniz</p>
                </div>
                <hr />
                <div className="liveChatBody">
                  <LiveChatTablo />
                </div>
                <hr />
                <div className="liveChatFooter">
                  <button>Yeni Talep Oluştur</button>
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
