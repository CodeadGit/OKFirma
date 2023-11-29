import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";


const UsefulApisContext=createContext();

const UsefulApiProvider=({children})=>{
    const [pullDoviz,setPullDoviz]=useState(false)
    const [refreshingDoviz,setRefreshingDoviz]=useState(true)
    const [doviz,setDoviz]=useState({})

    useEffect(()=>{
            
        setRefreshingDoviz(true)
        var redunduncyRef=doc(db,"Currency","Currs")

        var config = {
        method: 'get',
        
        headers: { }
        };

        axios("https://payment.onlinekesif.com/money",config)
        .then(function (response) {
        setRefreshingDoviz(false)
        console.log(JSON.stringify(response.data));
        setDoviz({...response.data.result,TL:{satis:"1",
        alis:"1",
        degisim:"0.00",
        d_oran:"0.0000",
        d_yon:"minus",}});
        })
        .catch(function (error) {
        getDoc(redunduncyRef)
        .then(data=>setDoviz({...data.data(),TL:{satis:"1",
        alis:"1",
        degisim:"0.00",
        d_oran:"0.0000",
        d_yon:"minus",}}))
        .then(()=>setRefreshingDoviz(false))
        .catch(err=>{
            setRefreshingDoviz(false)
            console.log("api",error);
            console.log("db",err);

        })
        ;

        
        });

},[pullDoviz])

const refreshDoviz=()=>{
    setPullDoviz(pre=>!pre)
}

    return(
        <UsefulApisContext.Provider
            value={{doviz}}
        >
            {children}
        </UsefulApisContext.Provider>
    )
}

const useApis=()=>{
    const context=useContext(UsefulApisContext)
    return context
}
export { UsefulApiProvider, useApis }