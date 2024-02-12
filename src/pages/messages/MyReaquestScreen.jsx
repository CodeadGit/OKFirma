import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../components/boxes/Navigation";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SupportChat from "./SupportChat";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { CircularProgress } from "@mui/material";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import { NavLink, useNavigate } from "react-router-dom";
import LiveIcon from "./svg/liveIcon.svg";
import HelpRequest from "./svg/helpRequest.svg";
import SidebarBottom from "../../components/sidebar/SidebarBottom";

function MyReaquestScreen() {
  const { talepId } = useParams();
  const [thisPage, setThisPage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var document = talepId;
    let controller = new AbortController();
    (async () => {
      var docreferance = doc(db, "FirmRequests", document);
      try {
        const response = await getDoc(docreferance, {
          signal: controller.signal,
        });
        const getData = response.data();
        setThisPage(getData);
        setLoading(false);
        controller = null;
      } catch (e) {
        setLoading(false);
        alert("bir hata meydana geldi");
        console.log(e.message);
      }
    })();
    return () => controller?.abort();
  }, [talepId]);

  const pathData = [
    { text: "Panelim", to: "/", id: "02" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Destek Taleplerim", to: "/mesajlarim/Destek-Talebi", id: "03" },
    { text: talepId, to: `/mesajlarim/Destek-Talebi`, id: "04" },
  ];

  if (loading) {
    return (
      <>
        <div className="home">
          <Sidebar />
          <SidebarBottom></SidebarBottom>

          <div className="homeContainer">
            <Navbar/>
            <div className="navigation">
              <Navigation children={pathData} />
            </div>
            <CircularProgress className="centered-loading" />
          </div>
        </div>
      </>
    );
  }
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
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








        {/* <Navigation children={pathData} /> */}
        <div className="wrapper">
          <SupportChat item={thisPage} />
        </div>
      </div>
      {/* <RightSideBar/> */}
    </div>
  );
}

export default MyReaquestScreen;
