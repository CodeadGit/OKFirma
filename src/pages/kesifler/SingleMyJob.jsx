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
        const getData = response.data();
        setThisPage(getData);
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
      const fetchedProducts = querySnapshot.docs.map((doc) => doc.data().id);
      //setThisProducts(fetchedProducts)
      const q2 = query(doc(db, "Jobs", jobDoc, "Offers", auth.currentUser.uid));

      const querySnapshot2 = await getDoc(q2);
      var totalProducts = fetchedProducts.map((i, idx) => ({
        ...querySnapshot2.data()[i],
      }));
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
            <Top job={thisPage} />
            <Center job={thisPage} products={thisProducts} />
            <Bottom job={thisPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMyJobNew;
