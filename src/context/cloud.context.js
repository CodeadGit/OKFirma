import { addDoc, arrayRemove, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
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
  const [updatingJob, setUpdating] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  //get jobs

  useEffect(() => {
    if (user) {
      var fields = userData?.fields;
      var simple=["Klima","Kombi","Doğalgaz"]
      let userid = user.uid;
      var q = query(collection(db, "Jobs"), 
      orderBy("createdAt","asc"),
      where("adminned", "==", true)
      );
      onSnapshot(q, (doc) => {
        var jobs = [];
        doc.forEach((data) => {
          if (data.data().statue !== 3&&!data.data().interestedFirms.includes(auth.currentUser.uid)) {
            jobs.unshift(data.data());
          }
          
        });
        // if (jobs.length > 0) {
        //   // var first = jobs.filter(
        //   //   (i) =>
        //   //     new Date().getTime() <
        //   //     new Date(i.publishRemaining.seconds * 1000).getTime()
        //   // );
        //   var second = jobs.filter(
        //     (i) => !i.interestedFirms.includes(auth?.currentUser.uid)
        //   );
        //   // var third = second.filter(
        //   //   (i) => i.statue === 0 || i.statue === 1 || i.statue === 2
        //   // );
        //   setMyPossibleJobs(second);
        //   console.log("işler",second)
        // } else {
        //   setMyPossibleJobs(jobs);
        // }
        setMyPossibleJobs(jobs);
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
  }, [user,updatingJob]);
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

  useEffect(() => {
    if (user) {
      let controller = new AbortController();
      (async () => {
        const q = query(collection(db, "FirmRequests"));
        const jobgetting = onSnapshot(q, (snap) => {
          var jobs = [];
          if (!snap.empty) {
            snap.forEach((doc) => {
              jobs.push({ ...doc.data(), id: doc.id });
            });
            setMyRequests(jobs);
          }
        });
        return () => jobgetting();
      })();
      return () => {
        controller?.abort();
      };
    }
  }, [user]);

  const deleteFirmFromJob=async(job)=>{
    setUpdating(true);
    var me=auth.currentUser.uid;
    var referance=doc(db,"Jobs",job.doc);
    var offerRef=doc(db,"Jobs",job.doc,"Offer",me);
    var savedOfferRef=collection(db,"Users",me,"SavedOffers");
    var logRef=collection(db,"Jobs",job.doc,"Logs");
    let a,b,c,d;
    try {
      a=await updateDoc(referance,{
        interestedFirms:arrayRemove(me),
      })
      } catch (error) {
      setUpdating(false)
      console.log(error.message)
    }
    try {
      b=await addDoc(logRef,{
        what:``,
        when:new Date(),
        who:me
      })
      } catch (error) {
      setUpdating(false)
      console.log(error.message)
    }
    try {
      c=await getDoc(offerRef)
      .then(data=>{
        try {
          addDoc(savedOfferRef,{
            ...data.data()
          })
        } catch (error) {
          setUpdating(false)
        }
      })
      } catch (error) {
      setUpdating(false)
      console.log(error.message)
    }
    try {
      d=deleteDoc(offerRef)
      setUpdating(false)
      alert(`${job.id} no'lu ${job.kategori} işi listenizden çıkarıldı`)
    
    } catch (error) {
      
      setUpdating(false)
      console.log(error.message)
      
    }
    
return a+b+c+d;
  }
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
        deleteFirmFromJob,
        updatingJob,
        myRequests,
      }}
    >
      {children}
    </CloudContext.Provider>
  );
};
