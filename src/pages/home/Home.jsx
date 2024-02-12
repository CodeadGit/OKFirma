import React, { useContext } from "react";
import { CloudContext } from "../../context/cloud.context";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TeklifTablosu from "../../components/tablolar/teklifTablosu/TeklifTablosu";
import { AuthenticationContext } from "../../context/authentication.context";
// import Navigation from "../../components/boxes/Navigation";
import Empty from "./svg/empty.svg";
import { Navigate, NavLink } from "react-router-dom";  
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import { Margin } from "@mui/icons-material";
// import { addDoc, collection } from "firebase/firestore";
// import { auth, db } from "../../firebase/firebase.config";
import SidebarBottom from "../../components/sidebar/SidebarBottom";

function Home({ setLoading }) {
  const { myJobsData } = useContext(CloudContext);
  const { userData, user } = useContext(AuthenticationContext);

  // if(Object.keys(userData).length<1)
  // return <LoadingGeneral title="ayarlar yükleniyor"/>

  // const pathData = [{ text: "Panelim", to: "/", id: "01" }];
  // window.history.pushState({}, "", `/`);

  if (!user | !userData?.firm) {
    return <Navigate to="giris-yap" />;
  }

  if (!!user && userData && !userData.confirmed) {
    return <Navigate to="onay" />;
  }

  // const sendNotification = async () => {
  //   try {
  //     await addDoc(
  //       collection(db, "Users", auth.currentUser.uid, "Notifications"),
  //       {
  //         createdAt: new Date(),
  //         readen: false,
  //         relatedCol: "Jobs",
  //         relatedDoc: "5VLOoKPBpjnorEQgl7ud",
  //         what: `yeni bildirim 4`,
  //         who: "ben",
  //         id: new Date().valueOf().toString().substring(6),
  //       }
  //     );
  //     alert("gönderildi");
  //   } catch (error) {
  //     alert(`${error.message}`);
  //   }
  // };

  return (
    <div className="home">
     <SidebarBottom></SidebarBottom>

      <Sidebar setLoading={setLoading} />
      <div className="homeContainer">

        <PageNavbar />
        <Navbar />
        {/* <Button onClick={sendNotification}>
            bildirim gönder
          </Button> */}
        {/* <Navigation children={pathData} /> */}
       
        <div className="contentArea">
          {myJobsData?.length > 0 ? (
            <TeklifTablosu data={myJobsData} />
          ) : (
            <div className="empty">
              <img src={Empty} alt="" />
              <NavLink to="/kesiflerim" className="button">
                Keşiflere Git
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {/* <RightSideBar/> */}
    </div>
  );
}

export default Home;
