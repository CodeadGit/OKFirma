import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";
import { AuthenticationContext } from "../../context/authentication.context";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import html2pdf from "html2pdf.js";
import { AppModal } from "../../components/Modal/Modal";
import Notes from "./Notes";
import Navigation from "../../components/boxes/Navigation";
import ParcaTablosu from "../../components/tablolar/parcaTablo/ParcaTablosu";
import ExportPdf from "../../components/exportPdf/ExportPdf";

function SingleMyJob() {
  const { user } = useContext(AuthenticationContext);
  const { state } = useLocation();

  const [indexes, setIndexes] = useState({});
  const [rows, setRows] = useState(state.relatedProducts);

  const [uploading, setUploading] = useState(false);

  const [alertMessage, setAlertMessage] = useState({
    infoText: "",
    visible: false,
    isInfo: true,
    isError: false,
    title: "",
    route: "",
    handleFunction: "",
    functionText: "",
  });

  var index = state?.Offers.findIndex((i) => i.firm === user.uid);
  var oldSum =
    state && state.Offers.length > 0
      ? state.Offers?.[index].relatedProducts
          .map((item) => item.price)
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;
  //var oldSum=0
  //var oldSum="ha"
  var amIaccepted = (row) => {
    return (
      row.Offers.filter((i) => i.firm === user.uid).length > 0 &&
      (row.statue === 3 || row.statue === 6)
    );
  };

  const addOffer = async (item) => {
    var row = {
      firm: user.uid,
      job: item.doc,
      jobTitle: item.mainWish,
      jobCreatedAt: item.createdAt,
      createdAt: new Date(),
      relatedProducts: rows,
      statue: 0,
      id: Math.random().toString(16).substring(2, 9),
    };
    setUploading(true);
    const docRef = collection(db, "Offers");
    await addDoc(docRef, row);
    const willbeUpdated = doc(db, "Jobs", item.doc);
    await updateDoc(willbeUpdated, {
      interestedFirms: arrayUnion(user.uid),
      statue: 2,
      statueMap: {
        id: new Date().valueOf(),
        createdAt: new Date(),
        what: 2,
        for: state?.userid,
        who: auth?.currentUser?.uid,
      },
    })
      .then(() => setUploading(false))
      .finally(() => alert("Tebrikler!! Teklif Gönderildi."))
      .catch((err) => alert(err + "Bir hata meydana geldi."));
  };

  const isBigger = () => {
    var newValue = Object.values(indexes).reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    if ((oldSum > newValue) | (oldSum === newValue)) {
      return "positive";
    } else {
      return "negative";
    }
  };

  function savePdf() {
    var element = document.getElementById("section-to-print");
    var opt = {
      margin: 0.2,
      filename: `${state.id}_nolu_${state.mainWish}_keşfi.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      enableLinks: true,
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }
  const wishDetail = Object.values(state.wishDetail);

  window.history.pushState({}, "", `/kesiflerim`);

  const handleFinish = async (e) => {
    e.preventDefault();
    setUploading(true);
    await updateDoc(doc(db, "Jobs", state.doc), {
      completed: true,
      statue: 8,
      statueMap: {
        id: new Date().valueOf(),
        createdAt: new Date(),
        what: 8,
        for: state?.userid,
        who: auth?.currentUser?.uid,
      },
      //income:increment(oldSum)
    });

    await updateDoc(doc(db, "Users", auth?.currentUser?.uid), {
      //completed:true,
      income: increment(oldSum),
      point: arrayUnion({
        id: new Date().valueOf().toString().substring(8),
        type: "Complete Job",
        time: new Date(),
        score: 10,
      }),
    })
      .then(() => {
        setUploading(false);
        setAlertMessage({
          ...alertMessage,
          visible: true,
          isInfo: true,
          title: "Tamamdır",
          isError: false,
          infoText: "İşi Tamamladınız!",
          route: "/",
        });
      })
      .catch(() => {
        setUploading(false);
        setAlertMessage({
          ...alertMessage,
          visible: true,
          isInfo: true,
          title: "Uyarı",
          isError: true,
          infoText: "Bir hata meydana geldi",
        });
      });
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    setUploading(true);
    var myOffer =
      state.Offers[state.Offers.findIndex((i) => i.firm === user.uid)];
    var newArray = state.Offers.filter((i) => i.firm !== user?.uid);
    await updateDoc(doc(db, "Jobs", state.doc), {
      Offers: newArray,
      firmsWhoCancelled: arrayUnion(auth.currentUser.uid),
      interestedFirms: arrayRemove(auth.currentUser.uid),
    });

    await updateDoc(doc(db, "Users", auth?.currentUser?.uid), {
      //completed:true,
      point: arrayUnion({
        id: new Date().valueOf().toString().substring(8),
        type: "cancel",
        time: new Date(),
        score: -10,
      }),
    })
      .then(() => {
        setUploading(false);
        setAlertMessage({
          ...alertMessage,
          visible: true,
          isInfo: true,
          title: "Tamamdır",
          isError: false,
          infoText: "İşi İptal Ettiniz!",
          route: "/",
        });
      })
      .catch(() => {
        setUploading(false);
        setAlertMessage({
          ...alertMessage,
          visible: true,
          isInfo: true,
          title: "Uyarı",
          isError: true,
          infoText: "Bir hata meydana geldi",
        });
      });
  };

  let TLLocale = Intl.NumberFormat("tr-TR");
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşiflerim", to: "/kesiflerim", id: "02" },
    { text: `${state.id}`, to: "/kesiflerim/`${state.id}`", id: "03" },
  ];

  return (
    <>
      <div className="home">
        <AppModal
          open={alertMessage.visible}
          setOpen={setAlertMessage}
          isInfo={alertMessage.isInfo}
          isError={alertMessage.isError}
          title={alertMessage.title}
          route={alertMessage.route}
          infoText={alertMessage.infoText}
          handleFunction={alertMessage.handleFunction}
          functionText={alertMessage.functionText}
          state={state}
          alertstate={alertMessage}
        />
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="teklifExportArea">
            <div className="navigation">
              <Navigation children={pathData} />
            </div>
            <div className="teklifExportButtons">
              <div
                id="print"
                className="button"
                type="button"
                onClick={() => window.print()}
              >
                Çıktı Al
              </div>
              <div
                id="savePdf"
                className="button"
                type="button"
                onClick={savePdf}
                value="kaydet"
              >
                Pdf İndir
              </div>
            </div>
          </div>
          <div className="contentArea">
            <div className="singleContainer">
              <div className="teklifBilgiContainer">
                <div className="teklifDetails">
                  <p>Hizmet İçeriği</p>
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
                    <p>Hizmet Genel Bilgileri</p>
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
                      <tr>
                        <th>Talep Oluşturma Tarihi </th>
                        <td>
                          {new Date(
                            state?.createdAt.seconds * 1000
                          ).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th>Teklif Zamanı </th>
                        <td>
                          {new Date(
                            state?.Offers[
                              state?.Offers.findIndex(
                                (i) => i.firm === user.uid
                              )
                            ].createdAt.seconds * 1000
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </table>
                    <div className="talepNotesArea">
                      <p>Notlar</p>
                      {state.notes?.length > 0 ? (
                        <Notes state={state} />
                      ) : (
                        <span className="empty-text">Not yok</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="partList">
                <p>Parça Listesi</p>
              </div>
              <div className="teklifBilgiContainer">
                <ParcaTablosu data={state} />
              </div>
              <div className="teklifContainerBottom">
                <div className="priceInfoDiv">
                  Toplam :{TLLocale.format(oldSum)} ₺ (KDV DAHİL)
                </div>
                <div className="teklifAcceptArea">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pdfExport">
        <ExportPdf id="section-to-print" />
      </div>
    </>
  );
}

export default SingleMyJob;
