import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";
import Box from "@mui/material/Box";
import { AuthenticationContext } from "../../context/authentication.context";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import Loading from "../../components/Loading/Loading";
import emailjs from "@emailjs/browser";
import ParcaKesifTablosu from "../../components/tablolar/parcaKesifTablo/ParcaKesifTablosu";
import Navigation from "../../components/boxes/Navigation";

function Single() {
  const { user, userData } = useContext(AuthenticationContext);
  const { state } = useLocation();
  const [indexes, setIndexes] = useState({});
  const [rows, setRows] = useState(state.relatedProducts);

  const [uploading, setUploading] = useState(false);

  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşifler", to: "/kesifler", id: "02" },
    { text: `${state.id}`, to: "/kesifler/`${state.id}`", id: "03" },
  ];

  var navigate = useNavigate();

  const sendEmailToUser = () => {
    var params = {
      subject: state?.mainWish + " Servis Talebiniz Hakkında",
      user_email: state?.email,
      user_name: "bilgi@onlinekesif.com",
      message: `${state.mainWish} Servis Talebiniz için bir firma teklif yaptı.`,
    };

    emailjs
      .send(
        "onlinekesif_support",
        "template_fd5d0vb",
        params,
        "az39-SQ3JNFE4N2sA"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  //   const addOffer=async (item) => {
  //    var row={
  //       firm:user.uid,
  //       job:item.postId,
  //       jobTitle:item.MainWish,
  //       jobCreatedAt:item.createdAt,
  //       createdAt:new Date(),
  //       relatedProducts:rows,
  //       statue:0,
  //       id:Math.random().toString(16).substring(2,9),
  //     }
  //     setUploading(true)
  //     const docRef = collection(db, "Offers");
  //       await addDoc(docRef, row)
  //     const willbeUpdated=doc(db,"Jobs",item.postId);
  //     await updateDoc(willbeUpdated,{
  //         interestedFirms:arrayUnion(user.uid)
  //     })
  //     .then(()=>setUploading(false))
  //     .finally(()=>alert("Tebrikler!! Teklif Gönderildi."))
  //       .catch(err=>alert(err+"Bir hata meydana geldi."))

  //   }

  var newValue = Object.values(indexes).reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  const wishDetail = Object.values(state.wishDetail);

  if (uploading) {
    return <Loading title="Gönderiliyor" />;
  }
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="navigation">
            <Navigation children={pathData} />
          </div>
          <div className="contentArea">
            <div className="singleContainer">
              <div className="teklifBilgiContainer">
                <div className="teklifDetails">
                  <p>Detaylar</p>
                  <hr />
                  <table>
                    {wishDetail.map((i) => {
                      return (
                        <tr key={i.id}>
                          <th>{i.q}</th>
                          <td>{i.a}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div className="teklifRequest">
                  <div className="requestHeader">
                    <p>Teklif</p>
                  </div>
                  <hr />
                  <div className="requestBody">
                    <table>
                      <tr>
                        <th>Teklif No </th>
                        <td>{state.id}</td>
                      </tr>
                      <tr>
                        <th>Ana Talep </th>
                        <td>{state.mainWish}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className="partList">
                <p>Parça Listesi</p>
              </div>
              <div className="teklifBilgiContainer">
                <ParcaKesifTablosu data={state} />
              </div>
              <div className="teklifContainerBottom"></div>
              {/*<div className="teklifAcceptArea">
                  {amIaccepted(state) && !state.completed ? (
                    <button
                      onClick={(e) =>
                        setAlertMessage({
                          ...alertMessage,
                          visible: true,
                          isInfo: false,
                          title: "Dikkat",
                          infoText: "İşi Tamamlamak Üzeresiniz",
                          handleFunction: () => handleFinish(e, state),
                          functionText: "Yine de tamamla",
                          route: "/",
                        })
                      }
                    >
                      İşi Tamamla
                    </button>
                  ) : (
                    <button
                      onClick={(e) =>
                        setAlertMessage({
                          ...alertMessage,
                          visible: true,
                          isInfo: false,
                          title: "Dikkat",
                          infoText: "İşi İptal Etmek Üzeresiniz",
                          handleFunction: () => handleCancel(e),
                          functionText: "Yine de iptal et",
                          route: "/",
                        })
                      }
                    >
                      İşi İptal Et
                    </button>
                  )}
                </div>
              </div> */}
            </div>
          </div>
          {/* <p className="title">Talep</p>
          <div className="wish-header">
            <p className="row-title">Teklif No</p>
            <p className="row-text">{state.id}</p>
          </div>
          <div className="wish-header">
            <p className="row-title">Ana Talep</p>
            <p className="row-text">{state.mainWish}</p>
          </div>
          <p className="title">Detaylar</p>
          <div className="wishes">
            {wishDetail.map((i) => {
              return (
                <div className="singleMain" key={i.id}>
                  <span className="row-title">{i.q}</span>
                  <span className="row-text">{i.a}</span>
                </div>
              );
            })}
          </div>
          <div className="tableContainer">
            <div className="title">Parça Listesi</div>

            <Box
              sx={{
                height: (state.relatedProducts?.length + 3) * 60,
                width: "100%",
              }}
            >
              <div className="priceInfoDiv">
                <span className={`numberWithStatus`}>
                  Toplam :
                  {Object.values(indexes).reduce(
                    (partialSum, a) => partialSum + a,
                    0
                  )}{" "}
                  ₺
                </span>

                <div onClick={() => addOffer(state)} className="submit">
                  <span>Teklifi Oluştur</span>
                </div>
              </div>
            </Box>
          </div> */}
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default Single;
