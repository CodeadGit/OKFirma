import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";

export const SupportContext=createContext();

export const SupportContextProvider=({children})=>{
    
    const [myRequests,setMyRequests]=useState([])

    const getMessages = async() => {
        const msgRef = collection(db, "FirmRequests");
        const q = query(msgRef, where("from", "==", auth.currentUser?.uid || "bekleniyor"));
        onSnapshot(q, orderBy("createdAt", "asc"), (querySnapshot) => {
          let msgs = [];
          querySnapshot.forEach((doc) => {
            msgs.push(doc.data());
          });
    
          setMyRequests(msgs);
          console.log(msgs)
        });
      };
      useEffect(() => {
        getMessages();
      }, []);
    return(
    <SupportContext.Provider
        value={{myRequests}}
    >
        {children}
    </SupportContext.Provider>   
    )
}