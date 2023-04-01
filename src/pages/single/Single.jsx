import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./single.scss"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PriceInput from './PriceInput'
import { AuthenticationContext } from '../../context/authentication.context'
import { addDoc, arrayRemove, arrayUnion, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase.config'
import Footer from '../../components/footer/Footer'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Loading from '../../components/Loading/Loading'
import emailjs from '@emailjs/browser';

function Single() {

    const {user,userData}=useContext(AuthenticationContext)
    const {state}=useLocation()  
    const [indexes,setIndexes]=useState({})
    const [rows,setRows]=useState(state.relatedProducts)
    
    const [uploading,setUploading]=useState(false)
  
    var oldSum=state.relatedProducts.map(item=>item.price).reduce((partialSum, a) => partialSum + a, 0)

    var navigate=useNavigate()

    const sendEmailToUser = () => {

        var params={
          subject:state?.mainWish+" Servis Talebiniz Hakkında",
          user_email:state?.email,
          user_name:"bilgi@onlinekesif.com",
          message:`${state.mainWish} Servis Talebiniz için bir firma teklif yaptı.`
          
      
        }
      
        emailjs.send('onlinekesif_support', 'template_fd5d0vb', params,"az39-SQ3JNFE4N2sA")
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          
      };
  const addOffer=async (item) => {
   var row={
      firm:user.uid,
      firmName:user.displayName,
      logo:user.photoURL,
      //job:item.postId,
      //jobTitle:item.MainWish,
      //jobCreatedAt:item.createdAt,
      createdAt:new Date(),
      relatedProducts:rows,
      totalPrice:newValue,
      KPU:userData.KPU,
      refused:false,
      email:auth.currentUser.email,
      
      id:Math.random().toString(16).substring(2,9),
    }
    setUploading(true)
    const docRef = doc(db, "Jobs",item.doc);   
    const userRef = doc(db, "Users",auth?.currentUser.uid);  
    await updateDoc(docRef,{
        Offers:arrayUnion(row),
        statue:2,
        statueMap:{id:new Date().valueOf(),createdAt:new Date(),what:2,for:item?.userid,who:auth?.currentUser?.uid},
        interestedFirms:arrayUnion(user.uid),
    })  
    .then(()=>setUploading(false))
    .then(()=>alert("Tebrikler!! Teklif Gönderildi."))
    .finally(()=>navigate("/"))
      .catch(err=>alert(err+"Bir hata meydana geldi."))

      await updateDoc(userRef,{
        point:arrayUnion({
            id:new Date().valueOf(),
            score:10,
            time:new Date(),
            type:"made Offer as firm"
        })
    }) 
    sendEmailToUser()
    
  }
//   const addOffer=async (item) => {
//    var row={
//       firm:user.uid,
//       job:item.postId,
//       jobTitle:item.MainWish,
//       jobCreatedAt:item.createdAt,
//       createdAt:new Date(),
//       relatedProducts:rows,
//       statue:0,
//       id:Math.random().toString(16).substring(2,9),
//     }
//     setUploading(true)
//     const docRef = collection(db, "Offers");   
//       await addDoc(docRef, row)
//     const willbeUpdated=doc(db,"Jobs",item.postId);
//     await updateDoc(willbeUpdated,{
//         interestedFirms:arrayUnion(user.uid)
//     })  
//     .then(()=>setUploading(false))
//     .finally(()=>alert("Tebrikler!! Teklif Gönderildi."))
//       .catch(err=>alert(err+"Bir hata meydana geldi."))
    
//   }

var newValue=Object.values(indexes).reduce((partialSum, a) => partialSum + a, 0)
  
  
    const columns = [
    { field: "sNo", headerName: "Sıra No", flex: 1,
    renderCell:(params)=>{
        return(
            <span>{state.relatedProducts.indexOf(params.row)+1}</span>
        )
    }
},
    { field: "id",     headerName: "Parça Kodu",  flex: 1,},
    { field: "amount", headerName: "Adet",        flex: 1, },
    { field: "fiyat",  headerName: "Birim Fiyat (₺)",   flex:2.5,
    renderCell:(params)=>{
        return (
          <>
          {params.row.price!==""&&
          <div className='inputInnerOldPrice'>
          <span>{params.row.price} ₺</span></div>}
           <PriceInput 
           state={state} 
           params={params} 
           setIndexes={setIndexes}
           
           indexes={indexes}
           rows={rows}
           setRows={setRows}
           />
          </>
        )
    }
},

    { field: "label", headerName: "Malzeme / Servis Adı", flex: 8,

    renderCell:(params)=>{
        return(
            <div>
                {params.row.label}
            </div>
        )
    }
},
   
//     { field: "statue", headerName: "Durum", flex:1,
//     renderCell: (params) => {
//       return (
//         <div className={`cellWithStatus ${statues[params.row.statue]}`}>
//           {statues[params.row.statue]}
//         </div>
//       );
//     },
//    },
    // { field: "createdAt", headerName: "Oluşturma Zamanı", flex:1,renderCell: (params) => {
    //   var date=new Date(params.row.createdAt.seconds*1000).toLocaleString("tr-TR","string")
    //   return (
    //     <div>
    //       {date}
    //     </div>
    //   );
    // }, },
  ]


  const wishDetail=Object.values(state.wishDetail)

  if(uploading){
    return(<Loading title="Gönderiliyor" />)
  }
    return (
        <>
        <div className='single'>
        <Sidebar/>
        <div className="singleContainer">
            <Navbar/>
            <p className='title'>Talep</p>
            <div className="wish-header">
                <p className='row-title'>Teklif No</p>
                <p className='row-text'>{state.id}</p>
            </div>
            <div className="wish-header">
            <p className='row-title'>Ana Talep</p>
                <p className='row-text'>{state.mainWish}</p>
            </div>
            <p className='title'>Detaylar</p>
            <div className='wishes'>{
                wishDetail.map(i=>{
                    return(
                        <div
                        className="singleMain"
                        key={i.id}>
                        <span className='row-title'>{i.q}</span>
                        <span className='row-text'>{i.a}</span>
                        </div>
                        
                    )
                })
            }</div>
            <div className='tableContainer'>
                <div className='title'>Parça Listesi</div>
                
                <Box sx={{ height:(state.relatedProducts?.length+3)*60, width: '100%' }}>
                    <DataGrid
                    className='data-grid'
                        rows={state.relatedProducts}
                        columns={columns}
                        rowHeight={50}
                        hideFooterPagination
                        
                    />
                    
                    <div className='priceInfoDiv'>
                        
                        <span className={`numberWithStatus`}>Toplam :{Object.values(indexes).reduce((partialSum, a) => partialSum + a, 0)} ₺</span>
                        
                        <div 
                              onClick={()=>addOffer(state)}
                              className="submit">
                          
                            <span>Teklifi Oluştur</span>
                            
                        </div>
                    </div>
            
                </Box>

            </div>
            
        </div>
        {/* <RightSideBar/> */}
        </div>
      
        </>
        
  )
}

export default Single