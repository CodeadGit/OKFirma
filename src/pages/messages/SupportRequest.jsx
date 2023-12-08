import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { auth, db } from "../../firebase/firebase.config";
import DatatableNew from "./DatatableNew";
import "./support.scss";
import MessageIcon from "../../components/sidebar/svg/messages.svg";
import Navigation from "../../components/boxes/Navigation";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/authentication.context";
import DestekTalepTablo from "../../components/tablolar/destekTalepTablo/DestekTalepTablo";
import { CircularProgress } from "@mui/material";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import LiveIcon from "./svg/liveIcon.svg";
import HelpRequest from "./svg/helpRequest.svg";
import LiveChatTablo from "../../components/tablolar/liveChatTablo/LiveChatTablo";
import LiveChat from "../../components/livechat/LiveChat";

function SupportRequest() {

  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext);

  const navigate = useNavigate();


  useEffect(()=>{

    if(user){
        let controller = new AbortController();
        (async () => {
            const q = query(collection(db,"FirmRequests"));       
            const jobgetting=onSnapshot(q,(snap)=>{
            var jobs=[];
            if(!snap.empty){
                snap.forEach(doc=>{
                    jobs.push({...doc.data(),id:doc.id})
                    })
                setMyRequests(jobs)
                setLoading(false)
            }                                      
            })
            return ()=>jobgetting()
        })();
          return () => {
            controller?.abort();           
        };
    }
},[user]); 

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

  //myRequests.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  if(loading){
    return(
      <CircularProgress/>
    )
  }

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="supportContainer">
                  <div className="homeContainer">
            <PageNavbar />
            {/* <Navbar /> */}
          {/* <Navigation children={pathData} /> */}
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

          <div className="request-components">


<div className="request-tabel">
          <div className="request-header-bar">
            <div className="left">
              <img src={MessageIcon} alt="" />
              <h4>Destek Talepleriniz</h4>
            </div>
            <div className="right">

                <div className="right-text">Filtreler</div>
                <div className="right-text">Tarihe Göre Sırala</div>
                <div className="right-text">Dışarı Aktar</div>

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
       

       <div className="small-chatArea">
            <div className="small-liveChat">
              <LiveChat />
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

export default SupportRequest;
