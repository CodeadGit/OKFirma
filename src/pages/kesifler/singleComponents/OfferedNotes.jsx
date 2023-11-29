import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebase.config'
import { CircularProgress } from '@mui/material'

const OfferedNotes = ({jobDoc}) => {
    const [thisOffer,setThisOffer]=useState({})
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        var document=jobDoc
        let controller = new AbortController();

        (async () => {
            var docreferance=doc(db,"Jobs",document,"Offers",auth.currentUser.uid)
            try {
              const response = await getDoc(docreferance,{
                signal: controller.signal

              });
              const getData=response.data()
              setThisOffer(getData);
              setLoading(false)
              controller = null;


            } catch (e) {
                setLoading(false)
                alert("bir hata meydana geldi")
                console.log(e.message)
            }
        })();
          return () => controller?.abort();

    },[jobDoc])

    if(loading){
        return(
            <CircularProgress/>
        )
    }
  return (
    <div
        className='offet-notes'
    >
        <div className='note-row'>
            <span>1.</span>
            <span className='row-text'>FİYATLARIMIZ TL OLARAK VERİLMİŞTİR. FİYATLARIMIZA %20 KDV {thisOffer?.KDVincluded?"DAHİLDİR":"İLAVE EDİLECEKTİR"}</span>
        </div>
        <div className='note-row'>
            <span>2.</span>
            <span>ELEKTRİK, İNŞAİİ VE VİNÇ İŞLEMLERİ {thisOffer?.angaryaIsOur?"İŞ YAPANA AİTTİR":"MÜSTERİYE AİTTİR"}</span>
        </div>
        <div className='note-row'>
            <span>3.</span>
            <span>ÜRÜN TEMİN SÜRESİ {thisOffer?.recruitment} {String(thisOffer?.recruitmentUnit).toUpperCase()} İÇERİSİNDE</span>
        </div>
        <div className='note-row'>
            <span>4.</span>
            <span>ÖDEME ŞEKLİ : İŞ BİTİMİNDE</span>
        </div>
        <div className='note-row'>
            <span>5.</span>
            <span>İŞ TESLİM SÜRESİ : {thisOffer?.deliveryTime} {String(thisOffer?.deliveryTimeUnit).toUpperCase()} İÇERİSİNDE</span>
        </div>
        <div className='note-row'>
            <span>6.</span>
            <span>TEKLİFİN GEÇERLİLİK SÜRESİ: {thisOffer?.expiration} {String(thisOffer?.expirationUnit).toUpperCase()}</span>
        </div>
        {
            thisOffer?.notes?.map((i,idx)=>{
                return(
                    <div 
                        key={idx}
                        className='note-row'
                    >
                        <span>{idx+7}.</span>
                        <span>{i.note}</span>
                    </div>
                )
            })
        }


    </div>
  )
}

export default OfferedNotes