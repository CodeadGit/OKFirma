import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { db } from "../../firebase/firebase.config";
import DatatableNew from "./DatatableNew";
import "./support.scss";
import MessageIcon from "../../components/sidebar/svg/messages.svg";
import Navigation from "../../components/boxes/Navigation";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/authentication.context";
import DestekTalepTablo from "../../components/tablolar/destekTalepTablo/DestekTalepTablo";

function SupportRequest() {
  const [myRequests, setMyRequests] = useState([]);
  const { user } = useContext(AuthenticationContext);
  const getMessages = () => {
    const msgRef = collection(db, "FirmRequests");
    const q = query(msgRef, where("from", "==", user?.uid || "bekleniyor"));

    onSnapshot(q, orderBy("createdAt", "asc"), (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });

      setMyRequests(msgs);
    });
  };
  useEffect(() => {
    getMessages();
  }, []);

  // const myRequests=[
  //   {id:new Date().valueOf(),createdAt:new Date(),statue:0,lastResponse:"Faruk Yılmaz",subject:"Kazan",priority:0,file:"",summary:"Kazan takamadım",body:[{text:"Böle işverenlik olur mu hemşerim kimse cevap vermiyor",from:auth.currentUser.displayName,createdAt:new Date(),media:""}],},
  //   {id:new Date().valueOf(),createdAt:new Date(),statue:0,lastResponse:"Faruk Yılmaz",subject:"Kazan",priority:0,file:"",summary:"Kazan takamadım",body:[{text:"Böle işverenlik olur mu hemşerim kimse cevap vermiyor",from:auth.currentUser.displayName,createdAt:new Date(),media:""}],},
  //   {id:new Date().valueOf(),createdAt:new Date(),statue:0,lastResponse:"Faruk Yılmaz",subject:"Kazan",priority:0,file:"",summary:"Kazan takamadım",body:[{text:"Böle işverenlik olur mu hemşerim kimse cevap vermiyor",from:auth.currentUser.displayName,createdAt:new Date(),media:""}],},
  // ]
  const statues = ["Cevap Bekliyor", "Cevaplandı", "Kapandı"];
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Destek Taleplerim", to: "/mesajlarim/Destek-Talebi", id: "03" },
  ];

  myRequests.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="supportContainer">
          <Navbar />
          <Navigation children={pathData} />
          <div className="request-header-bar">
            <div className="left">
              <img src={MessageIcon} alt="" />
              <h4>Destek Talepleriniz</h4>
            </div>
            <div className="right">
              {myRequests.length > 0 ? (
                <NavLink
                  className="add-button"
                  to="/mesajlarim/Yeni-Destek-Talebi"
                >
                  Yeni Talep Oluştur
                </NavLink>
              ) : null}
            </div>
          </div>
          <DestekTalepTablo data={myRequests} statues={statues} />
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default SupportRequest;
