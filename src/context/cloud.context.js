import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AuthenticationContext } from "./authentication.context";

export const CloudContext = createContext();

export const CloudContextProvider = ({ children }) => {
  const { user, userData } = useContext(AuthenticationContext);
  const [myJobs, setMyJobs] = useState([]);
  const [myJobsData, setMyJobsData] = useState([]);
  const [myPossibleJobs, setMyPossibleJobs] = useState([]);
  const [myFirms, setMyFirms] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [favoriArea, setFavoriArea] = useState([]);
  const [fetching, setFetching] = useState(false);

  //get jobs

  useEffect(() => {
    if (user && userData.firm && !userData.client) {
      var fields = userData?.fields;
      let userid = user.uid;
      var q = query(collection(db, "Jobs"), where("mainWish", "in", fields));
      q = query(q, where("adminned", "==", true));
      onSnapshot(q, (doc) => {
        var jobs = [];
        doc.forEach((data) => {
          if (data.data().statue !== 3) {
            jobs.unshift(data.data());
          }
        });
        if (jobs.length > 0) {
          var first = jobs.filter(
            (i) =>
              new Date().getTime() <
              new Date(i.publishRemaining.seconds * 1000).getTime()
          );
          var second = first.filter(
            (i) => !i.interestedFirms.includes(auth?.currentUser.uid)
          );
          var third = second.filter(
            (i) => i.statue === 0 || i.statue === 1 || i.statue === 2
          );
          setMyPossibleJobs(third);
        } else {
          setMyPossibleJobs(jobs);
        }
      });
    }
  }, [user, userData]);

  useEffect(() => {
    if (user) {
      const ref = collection(db, "Jobs");
      onSnapshot(ref, (snap) => {
        let data = snap.docs.map((doc) => doc.data().mainWish);
        setFavoriArea(data);
      });
    }
  }, [user]);
  //get my jobs que
  useEffect(() => {
    if (user) {
      let userid = user.uid;
      const q = query(
        collection(db, "Jobs"),
        where("interestedFirms", "array-contains", auth.currentUser.uid)
      );
      onSnapshot(q, (snap) =>
        setMyJobsData(snap.docs.map((doc) => doc.data()))
      );
    }
  }, [user]);
  //get myjobs

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "Offers"),
        where("firm", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (snap) => setMyJobs(snap.docs.map((doc) => doc.data())));
    } else {
      setFetching((pre) => !pre);
    }
  }, [user]);

  //get news
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "News"), where("toFirm", "==", true));
      onSnapshot(q, (snap) => setNews(snap.docs.map((doc) => doc.data())));
    } else {
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "ClientsOfFirms"),
        where("holder", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (snap) => setMyFirms(snap.docs.map((doc) => doc.data())));
    } else {
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "ProductsOfFirms"),
        where("holder", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (snap) => setMyFirms(snap.docs.map((doc) => doc.data())));
    } else {
    }
  }, [user]);

  return (
    <CloudContext.Provider
      value={{
        myJobs,
        myPossibleJobs,
        myJobsData,
        myFirms,
        myProducts,
        news,
        favoriArea,
      }}
    >
      {children}
    </CloudContext.Provider>
  );
};
