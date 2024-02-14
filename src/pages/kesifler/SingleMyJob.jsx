import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import Navigation from "../../components/boxes/Navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import Logo from "./singleComponents/logo.svg";
import { Button, CircularProgress } from "@mui/material";
import Top from "./singleComponents/Top";
import Center from "./singleComponents/Center";
import Bottom from "./singleComponents/Bottom";
import "./singleComponents/individual.scss";
import PageNavbar from "../../components/pageNavbar/PageNavbar";
import { statues } from "../../components/data/statues";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactComponent as Dowland } from "./singleComponents/singleMyJobComponents/download.svg";
import { ReactComponent as Print } from "./singleComponents/singleMyJobComponents/print.svg";

const SingleMyJobNew = () => {
  const { jobDoc } = useParams();
  const [thisPageLoading, setThisPageLoading] = useState(true);
  const [thisPage, setThisPage] = useState(null);
  const [thisProducts, setThisProducts] = useState([]);
  const [thisProductsLoading, setThisProductsLoading] = useState(false);
  const [thisPageChanged, setThisPagechanged] = useState(false);

  useEffect(() => {
    var document = jobDoc;
    let controller = new AbortController();

    (async () => {
      var docreferance = doc(db, "Jobs", document);
      try {
        const response = await getDoc(docreferance, {
          signal: controller.signal,
        });
        if(response.exists()){
          const getData = response.data();
          setThisPage(getData);
          
        }
        setThisPageLoading(false);
        controller = null;
      } catch (e) {
        setThisPageLoading(false);
        alert("bir hata meydana geldi");
        console.log(e.message);
      }
      
    })();
    return () => controller?.abort();
  }, [jobDoc, thisPageChanged]);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      const q = query(collection(db, "Jobs", jobDoc, "RelatedProducts"));

      const querySnapshot = await getDocs(q);
      const fetchedProducts = !querySnapshot.empty?querySnapshot.docs?.map((doc) => doc.data().id):[]
      //setThisProducts(fetchedProducts)
      const q2 = query(doc(db, "Jobs", jobDoc, "Offers", auth.currentUser.uid));

      const querySnapshot2 = await getDoc(q2);
      var totalProducts = querySnapshot2.exists()?fetchedProducts?.map((i, idx) => ({
        ...querySnapshot2.data()[i],
      })):[]
      console.log("ups", totalProducts);
      setThisProducts(totalProducts);
    })();

    return () => controller?.abort();
  }, [thisPage, jobDoc, thisPageLoading]);

  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşifler", to: "/kesifler", id: "02" },
    { text: `${jobDoc}`, to: `/kesifler/${jobDoc}`, id: "03" },
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
  function handlePrint() {
    window.print()
}

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


          <div className="">
          <div className="talep-info">
            <h3>Keşif Talebi Bilgileri</h3>

            <div className="titles">
              <span>Teklif No</span>
              <span>Ana Talep</span>
              <span>Müşteri İsmi</span>
              <span>Müşteri Telefon</span>
              <span>Müşteri Adres</span>
              <span>Keşif Talebi</span>
              <span>Teklif Kalan Zaman</span>
            </div>
            <div className="infos">
              <span>{thisPage.id}</span>
              <span>{thisPage.mainWish}</span>
              <span>{thisPage.name}</span>
              <span>{thisPage.phone.substring(0, 4).concat("*******")}</span>
              <span>{`${thisPage.city}/${thisPage.region}`}</span>
              <span>
                {new Date(thisPage.createdAt.seconds * 1000).toLocaleDateString(
                  "tr-TR"
                )}
              </span>
              <span>{calculateRemainingTime(thisPage.termin)}</span>
            </div>
          </div>


            {/* <Navigation children={pathData} /> */}
          </div>
          <div className="one-job-container">
            {/* <Top job={thisPage} /> */}
            <Center job={thisPage} products={thisProducts} />
            <Bottom job={thisPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMyJobNew;
