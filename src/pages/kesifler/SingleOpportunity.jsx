import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import Navigation from "../../components/boxes/Navigation";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
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
        collection(db, "Jobs", document, "RelatedProducts")
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

  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Keşifler", to: "/kesifler", id: "02" },
    { text: `${docRef}`, to: `/kesifler/${docRef}`, id: "03" },
  ];

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
          <Navbar />
          <div className="navigation">
            <Navigation children={pathData} />
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
