import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import Navigation from "../../components/boxes/Navigation";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import Logo from "./singleComponents/logo.svg";
import { Button, CircularProgress } from "@mui/material";
import Top from "./singleComponents/Top";
import Center from "./singleComponents/Center";
import Bottom from "./singleComponents/Bottom";
import "./singleComponents/individual.scss";
import MyJobTop from "./singleComponents/singleMyJobComponents/MyJobTop";
import MyJobCenter from "./singleComponents/singleMyJobComponents/MyJobCenter";
import MyJobBottom from "./singleComponents/singleMyJobComponents/MyJobBottom";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { ReactComponent as Dowland } from "./singleComponents/singleMyJobComponents/download.svg";
import { ReactComponent as Print } from "./singleComponents/singleMyJobComponents/print.svg";
import { statues } from "../../components/data/statues";
import Link from "@mui/material";

const SingleOpportunity = () => {
  const { docRef } = useParams();
  const [thisPageLoading, setThisPageLoading] = useState(true);
  const [thisPage, setThisPage] = useState(null);
  const [thisProducts, setThisProducts] = useState([]);
  const [thisProductsLoading, setThisProductsLoading] = useState(false);
  const [thisPageChanged, setThisPagechanged] = useState(false);


  
  useEffect(() => {
    var document = docRef;
    let controller = new AbortController();

    (async () => {
      var docreferance = doc(db, "Jobs", document);
      const productsReferance = query(
        collection(db, "Jobs", document, "RelatedProducts"),
        orderBy("index","asc")
      );

      try {
        const response = await getDoc(docreferance, {
          signal: controller.signal,
        });
        const getData = response.data();
        setThisPage(getData);
        //setThisPageLoading(false)
        controller = null;
      } catch (e) {
        setThisPageLoading(false);
        alert("bir hata meydana geldi");
        console.log(e.message);
      }
      const jobgetting = onSnapshot(productsReferance, (snap) => {
        var jobs = [];

        snap.forEach((doc) => {
          jobs.push({
            ...doc.data(),
            doc: doc.id,
            sira: jobs.length,
            price: "",
            curr: "TL",
          });
        });
        setThisProducts(jobs);
        setThisPageLoading(false);
        //setThisProductsLoading(false)
      });
      return () => jobgetting();
    })();
    return () => controller?.abort();
  }, [docRef, thisPageChanged]);
  // useEffect(()=>{
  //     let controller = new AbortController();

  //     (async () => {
  //         const q = query(collection(db, "Jobs",docRef,"RelatedProducts")
  //         //, orderBy("order","asc")
  //         )
  //         const jobgetting=onSnapshot(q,(snap)=>{
  //         var jobs=[];

  //             snap.forEach(doc=>{
  //                     jobs.push({...doc.data(),doc:doc.id,sira:jobs.length,price:"",curr:"TL"})
  //                     })
  //                 setThisProducts(jobs)
  //                 setThisProductsLoading(false)
  //             })
  //         return ()=>jobgetting()
  //     })();
  //       return () => controller?.abort();

  // },[thisPage,docRef,thisPageLoading])

  const onButtonClick = () => {
     
    fetch("SamplePDF.pdf").then((response) => {
        response.blob().then((blob) => {
         
            const fileURL =
                window.URL.createObjectURL(blob);
                 
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "Keşif.pdf";
            alink.click();
        });
    });
};

  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşifler", to: "/kesifler", id: "02" },
    { text: `${docRef}`, to: `/kesifler/${docRef}`, id: "03" },
  ];

  const calculateRemainingTime = (time) => {
    const targetTime = time.seconds * 1000 + Math.floor(time.nanoseconds / 1e6);
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;
    const remainingSeconds = Math.floor(remainingTime / 1000);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingHours = Math.floor(remainingMinutes / 60);

    if (remainingHours < 0) return "Süre Bitti";
    return `${remainingHours} SAAT`;
  };

  console.log(thisPage)

  function handlePrint() {
    window.print()
}

  if (thisPageLoading) {
    return (
      <>
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
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
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          {/* <Navbar /> */}
          {/* <div className="navigation">
            <Navigation children={pathData} />
          </div> */}
          <PageNavbar />

          <div className="keşif-top-router">
            <div className="keşif-top-router-left">
             <a href="/kesifler"><ArrowBackIosIcon fontSize="small" color="action"/></a>
              {/* <Brightness1Icon color="primary" /> */}
              <div className={`status ${statues[thisPage.statue].class}`}></div>
              <div>{`${statues[thisPage.statue].label}`}</div>
            </div>

            <div className="keşif-top-router-right">
              {/* <button className="keşif-top-router-right-text">
                Teklifi İptal Et
              </button> */}
              <button className="keşif-top-router-right-button" onClick={handlePrint}>
                <Print /> Çıktı Al
              </button>

              <button className="keşif-top-router-right-button" onClick={onButtonClick}>
                <Dowland /> PDF İndir
              </button>
              {/* <button className="keşif-top-router-right-buttontwo">
                Güncelle
              </button> */}
            </div>
          </div>

          <div className="talep-info">
            <h3>Keşif Talebi Bilgileri</h3>
            <div className="titles">
              <span>Teklif No</span>
              <span>Ana Talep</span>
              <span>Müşteri İsmi</span>
              <span>Müşteri Telefon</span>
              <span>Müşteri Adres</span>
              <span className="title-mobile">Keşif Talebi</span>
              <span className="title-mobile">Teklif Kalan Zaman</span>
            </div>
            <div className="infos">
              <span>{thisPage.id}</span>
              <span>{thisPage.mainWish}</span>
              <span>{thisPage.name}</span>
              <span>{thisPage.phone.substring(0, 4).concat("*******")}</span>
              <span>{`${thisPage.city}/${thisPage.region}`}</span>
              <span  className="title-mobile">
                {new Date(thisPage.createdAt.seconds * 1000).toLocaleDateString(
                  "tr-TR"
                )}
              </span>
              <span  className="title-mobile">{calculateRemainingTime(thisPage.termin)}</span>
            </div>
          </div>

          <div className="one-job-container">
            <MyJobCenter products={thisProducts} job={thisPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOpportunity;
