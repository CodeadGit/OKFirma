import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RelatedProducts from './RelatedProducts'
import MyJobBottom from './MyJobBottom'
import { addDoc, arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../../firebase/firebase.config'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';
import OfferNotes from './OfferNotes'
import JobNotes from './JobNotes'
import { useOffer } from '../../../../context/offer.context'
import { useApis } from '../../../../context/api.context'


const MyJobCenter = ({job,products}) => {
  (function(){
    emailjs.init("az39-SQ3JNFE4N2sA");
 })();
 var wishDetailArray=Object.keys(job?.wishDetail).sort()
 const {handleOnloaded, noteList}=useOffer()
 const {doviz} = useApis()

  const [thisProducts,setThisProducts]=React.useState([...products])
  const [offerNotes,setOfferNotes]=useState([])
  const [uploading,setUploading]=useState(false)
  const [conditions,setConditions]=useState({
        KDVincluded:false,
        angaryaIsOur:false,
        deliveryTime:"",
        deliveryTimeUnit:"gün",
        recruitment:"",
        recruitmentUnit:"gün",
        expiration:"",
        expirationUnit:"gün"
      })
      

      const handleCondition=(e)=>{
          const {value,name}=e.target;
          console.log(value)
          setConditions(pre=>({...pre,[name]:value}))
      }
      const handleConditionBoolean=(selector,bool)=>{
          var oldObject=conditions[selector]
          setConditions(pre=>({...pre,[selector]:bool}))
      }

    //notes
   
    //
    const handleChange=(event,index)=>{
    const {value,name}=event.target;
      var oldList=[...thisProducts]
      oldList[index][name]=value
      setThisProducts(oldList)

  }

  let navigate=useNavigate()

  const sendEmailToUser = async() => {

    var params={
      subject:job?.mainWish+" Servis Talebiniz Hakkında",
      user_email:job?.email,  
      user_name:"bilgi@onlinekesif.com",
      message:`${job.mainWish} Servis Talebiniz için teklif geldi. Gözatın.`
    }
  
    await emailjs.send('onlinekesif_support', 'template_fd5d0vb', params)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
  };

  const updateProducts=async()=>{
    for(let p=0;p<thisProducts.length;p++){
      var productRef=doc(db,"Products",thisProducts[p].id);
      await updateDoc(productRef,{
        prices:arrayUnion({
          p:thisProducts[p].price,
          t:new Date()
        })
      })
    }
  }


  useEffect(()=>{
    
    handleOnloaded()
    

},[])

function checkPriceDefined(arr,key) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === '') {
      return false; // Price is undefined, return false
    }
  }
  return true; // All prices are defined
}

  const handleSubmit=async(event)=>{
    event.preventDefault();
    const allPricesDefined = checkPriceDefined(thisProducts,"price");
    const allNotesDefined = noteList.length>0?checkPriceDefined(noteList,"note"):true;
    if(allNotesDefined){
      if(allPricesDefined){
        if(!conditions.deliveryTime){
          alert("İş Teslim Süresini Girmediniz")
        }else{
          if(!conditions.expiration){
            alert("Teklif Geçerlilik Süresini Girmediniz")
          }else{
            if(!conditions.recruitment){
              alert("Ürün Temin Süresini Girmediniz")
            }else{
              setUploading(true);
              const jobDoc=job.doc;
              const wisher=job.userid;
              const who=auth.currentUser.uid;
              const when=new Date();
              var jobRef=doc(db,"Jobs",jobDoc,)
              var docRef=doc(db,"Jobs",jobDoc,"Offers",who)
              var notRef=collection(db,"Users",wisher,"Notifications")
              var logRef=collection(db,"Jobs",jobDoc,"Logs")
              var objected=thisProducts.reduce((a,v)=>({...a,[v.id]:v}),{})
              let a,b,c,d,e,f;
              try {
                  a=await setDoc(docRef,{
                      ...objected,
                      ...conditions,
                      firm:who,
                      active:true,
                      createdAt:when,
                      notRefused:true,
                      updatedAt:when,
                      id:when.valueOf().toString().substring(6),
                      notes:noteList,
                      
                  })
      
              } catch (error) {
                  setUploading(false)
                  alert("Bir hata meydana geldi")
              }
              try {
                  b=await addDoc(notRef,{
                      createdAt:when,
                      readen:false,
                      relatedCol:"Jobs",
                      relatedDoc:jobDoc,
                      what:`${job.mainWish}`,
                      who:who,
                      id:when.valueOf().toString().substring(6),
                      
                  })
      
              } catch (error) {
                  setUploading(false)
                  alert("Bir hata meydana geldi")
                  
              }
              try {
                  c=await addDoc(logRef,{
                      
                      what:"Teklif Yapıldı",
                      when:when,
                      who:who,
                      
                  })
      
              } catch (error) {
                  setUploading(false)
                  alert("Bir hata meydana geldi")
                  
              }
              try {
                  d=await updateDoc(jobRef,{
                      interestedFirms:arrayUnion(who),
                      statue:2,
                  })
                  
      
              } catch (error) {
                  setUploading(false)
                  alert("Bir hata meydana geldi")
                  
              }
              try {
                  e=await sendEmailToUser()
                  
      
              } catch (error) {
                  setUploading(false)
                  alert("Bir hata meydana geldi")
                  
              }
              try {
                  f=await updateProducts()
                  setUploading(false)
                  alert("Teklif başatıyla yapıldı")
                  navigate("/kesifler")
      
              } catch (error) {
                  setUploading(false)
                  alert("Bir hata meydana geldi")
                  
              }
              return a + b+ c+ d+e+f;
            }
          }
        }
      }else{
        alert("Bütün ürünlere fiyat girmelisiniz")
      }
    }else{
      alert("Not eklediyseniz bir değer yazmalısınız")
    }
    



        
  }

  return (
    <div className="one-job-center">
        <div className="one-job-center-top">
            <div className="one-job-center-top-left">
                <h4>Detaylar</h4>
                <Divider/>
                <span>{job.summary}</span>

                {wishDetailArray.map((i,idx)=>{
                        return(
                            <>
                            {Array.isArray(job.wishDetail[i])?
                            <div
                            key={idx}
                            className="section-individual">
                            <span className='row-title'>{i.substring(3)}</span>
                            <span className='dots'>:</span>
                            <div className='row-text listed'>
                            
                            {job.wishDetail[i].map((inner,idx)=>{
                            return(
                            <span 
                            className="sub-text"
                            key={idx}>{inner.label}</span>
                            )})}
                            </div>
                            </div>
                            :
                            <div
                            key={idx}
                            className="section-individual">

                            <span 
                            className="row-title sub"
                            key={idx}>{job.wishDetail[i].q}</span>
                            <span className='dots'>:</span>
                            <span 
                            className="row-text"
                            key={idx}>{job.wishDetail[i].a}</span>
                            </div>}
                            </>
                        )
                    
                })}
                    <Divider/>
                    <h4>Keşif Notları</h4>
                        <JobNotes
                          job={job}
                        /> 
            </div>
            <div className="one-job-center-top-right">
              <div className="one-job-center-top-right-top">
                <h4>Talep</h4>
                <Divider/>
                <div className="section-individual">
                  <span className="row-title">İstek No</span>
                  <span className="dots">:</span>
                  <span className="row-text">{job.id}</span>
                </div>
                <div className="section-individual">
                  <span className="row-title">Ana Talep</span>
                  <span className="dots">:</span>
                  <span className="row-text">{job.mainWish}</span>
                </div>
                
              </div>
              
            </div>
        </div>
        <div className="one-job-center-bottom">
            <h4>Parça Listesi</h4>
            <div className="this-products-table">
                <RelatedProducts 
                handleChange={handleChange}
                data={thisProducts}
                
                />
                <MyJobBottom
                  handleSubmit={handleSubmit}
                  data={thisProducts}
                  job={job}
                  uploading={uploading}
                  showButton={false}
              />
            </div>
        </div>
        <div className="one-job-center-bottom">
                {/* <h4>Keşif Notları (Müşteri Görmeyektir)</h4>
                <JobNotes

                  job={job}
                /> */}
            <h4>Teklif Notları</h4>
            <div className="this-notes-table">
                <OfferNotes
                  conditions={conditions}
                  job={job}
                  handleCondition={handleCondition}
                  handleConditionBoolean={handleConditionBoolean}
                />
            </div>
        </div>
              <MyJobBottom
                  handleSubmit={handleSubmit}
                  data={thisProducts}
                  job={job}
                  uploading={uploading}
                  showButton={true}
              
              />
    </div>
  )
}

export default MyJobCenter;