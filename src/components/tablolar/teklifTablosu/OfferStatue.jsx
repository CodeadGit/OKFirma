import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebase.config';

const OfferStatue = ({job}) => {
const [thisStatue,setThisStatue]=useState("")
const [statueLoading,setStatueLoading]=useState(false)

useEffect(()=>{
    if(auth.currentUser){
        let controller = new AbortController();

        (async () => {
            var docreferance=doc(db,"Jobs",job,"Offers",auth?.currentUser.uid)
    
              const response = await getDoc(docreferance);
              const getData=response.data().notRefused
              setThisStatue(getData);
              setStatueLoading(false)
              controller = null;
    
    
            
        })();
          return () => controller?.abort();
    }
    

},[job])



// console.log("stat",thisStatue)
  return (
    <>
    {thisStatue?
    null
    :<div className='statue refused'>
        Reddedildi
    </div>
    }
    
    </>
  )
}

export default OfferStatue