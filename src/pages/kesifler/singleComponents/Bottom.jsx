import { Button, CircularProgress, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useApis } from '../../../context/api.context'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase/firebase.config'
import { useNavigate } from 'react-router-dom'
import { CloudContext } from '../../../context/cloud.context'

const Bottom = ({job}) => {

  const [thisInfo,setThisInfo]=useState(0)
  const {doviz} = useApis()
  const [thisOffer,setThisOffer]=useState({})
  const [loading,setLoading]=useState(true)
  const [updating,setUpdating]=useState(false)
  var docRef=job.doc
const {deleteFirmFromJob,updatingJob}=useContext(CloudContext)
  useEffect(()=>{
      var document=docRef
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

  },[docRef,updating])


  useEffect(()=>{
          let controller = new AbortController();
          (async () => {
              const q = query(collection(db,"Jobs",docRef,"RelatedProducts"))
  
              const querySnapshot = await getDocs(q);
              const fetchedProducts = !querySnapshot.empty? querySnapshot.docs.map((doc) => doc.data().id):[]
              //setThisProducts(fetchedProducts)
              const q2 = query(doc(db,"Jobs",docRef,"Offers",auth.currentUser.uid))
  
              const querySnapshot2 = await getDoc(q2);
              var totalProducts=querySnapshot2.exists()? fetchedProducts?.map(i=>({...querySnapshot2?.data()[i]})):[]
              const initialValue = 0;
              const sumWithInitial = totalProducts?.reduce(
                  (accumulator, currentValue) => accumulator + 
              (Number(currentValue.price)*Number(currentValue.adet)*Number(doviz[currentValue?.curr]?.satis)),
              initialValue
              );
              setThisInfo(sumWithInitial)
  
              

          })();
          
            return () => controller?.abort();
  },[])


let TLLocale = Intl.NumberFormat('tr-TR');

let navigate=useNavigate();


const handleCancelOffer=async(event)=>{
  event.preventDefault();
  setUpdating(true)
  var referance=doc(db,"Jobs",docRef,"Offers",auth.currentUser.uid);
  var logreferance=collection(db,"Jobs",docRef,"Logs");
  let a,b;
  const who=auth.currentUser.uid;
  const when=new Date();
              
  try {
    a=await addDoc(logreferance,{
        
        what:"Teklif İptal Edildi",
        when:when,
        who:who,
        
    })

} catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
    
}
  try {
    b=await updateDoc(referance,{
      active:false,
    })
    setUpdating(false)
    alert("Teklif iptal edilmiştir.")
  } catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
  }

  return a+b
}
const handleRepeatOffer=async(event)=>{
  event.preventDefault();
  setUpdating(true)
  var referance=doc(db,"Jobs",docRef,"Offers",auth.currentUser.uid);
  var logreferance=collection(db,"Jobs",docRef,"Logs");
  let a,b;
  const who=auth.currentUser.uid;
  const when=new Date();
              
  try {
    a=await addDoc(logreferance,{
  
        what:"Teklif tekrar edildi.",
        when:when,
        who:who,
        
    })

} catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
    
}
  try {
    b=await updateDoc(referance,{
      active:true,
    })
    setUpdating(false)
    alert("Tekrar teklif edildi")
  } catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
  }
  return a+b;
}

const handleCancelJob=async(event)=>{
  event.preventDefault();
  setUpdating(true)
  var referance=doc(db,"Jobs",docRef);
  var logreferance=collection(db,"Jobs",docRef,"Logs");
  let a,b;
  const who=auth.currentUser.uid;
  const when=new Date();
              
  try {
    a=await addDoc(logreferance,{
  
        what:"Firma işi iptal etti.",
        when:when,
        who:who,
        
    })

} catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
    
}
  try {
    b=await updateDoc(referance,{
      statue:10,
      cancelledByFirm:true,
    })
    setUpdating(false)
    alert("İş iptal edildi")
  } catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
  }
  return a+b;  
}

const handleStart=async(event)=>{
  event.preventDefault();
  setUpdating(true)
  var referance=doc(db,"Jobs",docRef);
  var logreferance=collection(db,"Jobs",docRef,"Logs");
  let a,b;
  const who=auth.currentUser.uid;
  const when=new Date();
              
  try {
    a=await addDoc(logreferance,{
  
        what:"Firma işi başlattı.",
        when:when,
        who:who,
        
    })

} catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
    
}
  try {
    b=await updateDoc(referance,{
      statue:9,
      started:true,
    })
    setUpdating(false)
    alert("İş, başladı olarak güncellendi.")
  } catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
  }
  return a+b;
}

const handleComplete=async(event)=>{
  event.preventDefault();
  setUpdating(true)
  var referance=doc(db,"Jobs",docRef);
  var logreferance=collection(db,"Jobs",docRef,"Logs");
  let a,b;
  const who=auth.currentUser.uid;
  const when=new Date();
              
  try {
    a=await addDoc(logreferance,{
  
        what:"Firma işi tamamladı",
        when:when,
        who:who,
        
    })

} catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
    
}
  try {
    b=await updateDoc(referance,{
      statue:6,
      doneByFirm:true,
    })
    setUpdating(false)
    alert("İş, tamamlandı olarak güncellendi")
  } catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
  }
  return a+b;
}

const handleDelete=async(event)=>{
  event.preventDefault();
  setUpdating(true)
  var referance=doc(db,"Jobs",docRef,"Offers",auth.currentUser.uid);
  var logreferance=collection(db,"Jobs",docRef,"Logs");
  let a,b;
  const who=auth.currentUser.uid;
  const when=new Date();
              
  try {
    a=await addDoc(logreferance,{
        
        what:"Teklif Silindi",
        when:when,
        who:who,
        
    })

} catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
    
}
  try {
    b=await deleteDoc(referance)
    setUpdating(false)
    alert("Teklif silindi")
    navigate("/kesiflerim")
  } catch (error) {
    setUpdating(false)
    alert("Bir hata meydana geldi")
  }
  return a+b;
  
}

var jobButtons=[
  {id:"01",label:"İşi İptal Et",conditions:[0,1,2,4,5,6,7,8,10],variant:"outlined",className:"cancel",onClick:handleCancelJob},
  {id:"02",label:"İşe Başladım",conditions:[2,4,5,6,7,8,9,10,11],variant:"contained",className:"start",onClick:handleStart},
  {id:"03",label:"İşi Tamamladım",conditions:[2,3,4,5,6,7,8,10,11],variant:"contained",className:"done",onClick:handleComplete},
]
var offerButtons=[
  {id:"01",label:"Teklifi İptal Et",conditions:[],variant:"outlined",className:"cancel",onClick:handleCancelOffer,active:true},
  {id:"02",label:"Teklifi Sil",conditions:[],variant:"outlined",className:"delete",onClick:handleDelete,active:false},
  {id:"03",label:"Tekrar Teklif Yap",conditions:[],variant:"outlined",className:"again",onClick:handleRepeatOffer,active:false},
]
var canceledButtons=[
  {id:"01",label:"Teklifi Kaldır",conditions:[],variant:"outlined",className:"cancel",onClick:handleCancelOffer,active:true},
  {id:"02",label:"Teklifi Sil",conditions:[],variant:"outlined",className:"delete",onClick:handleDelete,active:false},
  {id:"03",label:"Tekrar Teklif Yap",conditions:[],variant:"outlined",className:"again",onClick:handleRepeatOffer,active:false},
]

if(loading){
  return(
      <CircularProgress/>
  )
}
  return (
    <div className="one-job-bottom">
    <div className="total-grand">Toplam: {TLLocale.format(thisInfo)} ₺</div>
    <div className="one-job-buttons">
        {
          jobButtons.map((i,idx)=>{
            return(
              <>
              {!i.conditions.includes(job.statue)
              &&
              <Button
                disabled={updating?true:false}
                className={`button ${i.className}`}
                variant={i.variant}
                key={idx}
                onClick={i.onClick}
              >
                {i.label}
              </Button>
              }
              
              </>
            )
          })
        }
        {
          offerButtons.map((i,idx)=>{
            return(
              <>
              {thisOffer&&thisOffer?.active===i?.active
              &&thisOffer.notRefused&&
              <Button
                disabled={updating?true:false}
                className={`button ${i.className}`}
                variant={i.variant}
                key={idx}
                onClick={i.onClick}

              >
                {i.label}
              </Button>
              

              }
              
              
              </>
            )
          })
        }
            <Tooltip
              title={`teklifinizi ${job?.id||""} no.lu işin teklif listesinden kaldırır ve teklifinizi diğer klasöre alır.`}
            >
              <Button
                className={`button delete`}
                variant={"contained"}
                onClick={()=>deleteFirmFromJob(job)}
                disabled={updatingJob?true:false}
              >
                Teklifi Kaldır
              </Button>
            </Tooltip>
    </div>
</div>
  )
}

export default Bottom