import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebase.config';
import { useApis } from '../../../context/api.context';

const PriceOfOneRow = ({job}) => {
  
    const [thisInfo,setThisInfo]=useState(0)
    const {doviz} = useApis()

    // console.log(job)

    var docRef=job.doc
    useEffect(()=>{
            let controller = new AbortController();
            (async () => {
                
                const q = query(collection(db,"Jobs",docRef,"RelatedProducts"))
    
                const querySnapshot = await getDocs(q);
                const fetchedProducts = !querySnapshot.empty?querySnapshot.docs.map((doc) => doc.data().id):[]
                //setThisProducts(fetchedProducts)
                const q2 = query(doc(db,"Jobs",docRef,"Offers",auth.currentUser.uid))
    
                const querySnapshot2 = await getDoc(q2);
                var totalProducts= querySnapshot2.exists()?fetchedProducts.map(i=>({...querySnapshot2.data()[i]})):[]
                const initialValue = 0;
                if(doviz){
                    
                
                    const sumWithInitial = totalProducts.reduce(
                        (accumulator, currentValue) => accumulator + 
                    (Number(currentValue.price)*Number(currentValue.adet)*Number(doviz[currentValue?.curr]?.satis)),
                    initialValue
                    );
                    setThisInfo(sumWithInitial)    
                }else{
                    const sumWithInitial = totalProducts.reduce(
                        (accumulator, currentValue) => accumulator + 
                    (Number(currentValue?.price)*Number(currentValue?.adet)),
                    initialValue
                    );

                    setThisInfo(sumWithInitial)
                }
                
    
                

            })();
            
              return () => controller?.abort();
        

              
    },[doviz,docRef])

 
let TLLocale = Intl.NumberFormat('tr-TR');
return (
    <div>
        {isNaN(thisInfo)?"-":TLLocale.format(thisInfo)} ₺

    </div>
  )
}

export default PriceOfOneRow