import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./single.scss"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PriceInput from './PriceInput'
import { AuthenticationContext } from '../../context/authentication.context'
import { addDoc, arrayRemove, arrayUnion, collection, doc, increment, Timestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase.config'
import { CloudContext } from '../../context/cloud.context'
import html2pdf from 'html2pdf.js'
import { RWebShare } from "react-web-share";
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Footer from '../../components/footer/Footer'
import { statues } from '../../components/data/statues'
import { useHistory, useNavigate } from 'react-router'
import Loading from "../../components/Loading/Loading"
import { useEffect } from 'react'
import { AppModal } from '../../components/Modal/Modal'
import Notes from './Notes'
function SingleMyJob() {
  
  
    const {myJobsData}=useState(CloudContext)
    
    const {user}=useContext(AuthenticationContext)
    const {state}=useLocation() 
     
    const [indexes,setIndexes]=useState({})
    const [rows,setRows]=useState(state.relatedProducts)
    
    const [uploading,setUploading]=useState(false)


    const [alertMessage,setAlertMessage]=useState({
      infoText:"",
      visible:false,
      isInfo:true,
      isError:false,
      title:"",
      route:"",
      handleFunction:"",
      functionText:""
    })

    var index=state?.Offers.findIndex(i=>i.firm===user.uid)
    var oldSum=state&&state.Offers.length>0?state.Offers?.[index].relatedProducts.map(item=>item.price).reduce((partialSum, a) => partialSum + a, 0):0
    //var oldSum=0
    //var oldSum="ha"
    var amIaccepted=(row)=>{
      return row.Offers.filter(i=>i.firm===user.uid).length>0&&(row.statue===3||row.statue===6)
    }
   

  const addOffer=async (item) => {
   var row={
      firm:user.uid,
      job:item.doc,
      jobTitle:item.mainWish,
      jobCreatedAt:item.createdAt,
      createdAt:new Date(),
      relatedProducts:rows,
      statue:0,
      id:Math.random().toString(16).substring(2,9),
    }
    setUploading(true)
    const docRef = collection(db, "Offers");   
      await addDoc(docRef, row)
    const willbeUpdated=doc(db,"Jobs",item.doc);
    await updateDoc(willbeUpdated,{
        interestedFirms:arrayUnion(user.uid),
        statue:2,
        statueMap:{id:new Date().valueOf(),createdAt:new Date(),what:2,for:state?.userid,who:auth?.currentUser?.uid},
    })  
    .then(()=>setUploading(false))
    .finally(()=>alert("Tebrikler!! Teklif Gönderildi."))
      .catch(err=>alert(err+"Bir hata meydana geldi."))
    
  }

  
  const isBigger=()=>{
          var newValue=Object.values(indexes).reduce((partialSum, a) => partialSum + a, 0)
          if(oldSum>newValue|oldSum===newValue){
            return "positive"
          }else{
            return "negative"
          }
    }
  
    const columns = [
    { field: "sNo", headerName: "Sıra No", flex: 0.05,
    renderCell:(params)=>{
        return(
            <span>{state.Offers[index].relatedProducts.indexOf(params.row)+1}</span>
        )
    }
},
    { field: "id",     headerName: "Parça Kodu",  flex: 0.1,},
    { field: "amount", headerName: "Adet",        flex: 0.05, align:"center",headerAlign:"center" },
    { field: "fiyat",  headerName: "Birim Fiyat (₺)",   flex:0.1,
    renderCell:(params)=>{
        return (
          <>
          {params.row.price!==""&&
          <div className='inputInnerOldPrice'>  
          <span>{TLLocale.format(params.row.unitPrice)} ₺</span></div>}
           
          </>
        )
    }
},
    { field: "price", headerName: "Malzeme Toplam Fiyat", flex: 0.1,
    renderCell:(params)=>{
      return (
        <>
        {params.row.price!==""&&
        <div className='inputInnerOldPrice'>
        <span>{TLLocale.format(params.row.price)} ₺</span></div>}
         
        </>
      )
  }
  },
    { field: "name", headerName: "Malzeme / Servis Adı", flex: 0.3,
    cellClassName:"name",
    renderCell:(params)=>{
        return(
            <div
            className='name'
            >
                {params.row.name}
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

const status=[
    "Bekliyor",
    "İptal Edildi",
    "Başka Firma ile Anlaşıldı"
]

function savePdf(){
    var element = document.getElementById('section-to-print');
    var opt = {
      margin:       1,
      filename:     `${state.id}_nolu_${state.mainWish}_keşfi.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape'},
      enableLinks:  true,
    };
     
    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  
  }
  const wishDetail=Object.values(state.wishDetail)
const navigate=useNavigate("")

window.history.pushState({}, '', `/kesiflerim`)

const handleFinish=async(e)=>{
  e.preventDefault()
  setUploading(true)
  await updateDoc(doc(db,"Jobs",state.doc),{
    completed:true,
    statue:8,
    statueMap:{id:new Date().valueOf(),createdAt:new Date(),what:8,for:state?.userid,who:auth?.currentUser?.uid},
    //income:increment(oldSum)

  })
  
  await updateDoc(doc(db,"Users",auth?.currentUser?.uid),{
    //completed:true,
    income:increment(oldSum),
    point:arrayUnion({
      id:new Date().valueOf().toString().substring(8),
      type:"Complete Job",
      time:new Date(),
      score:10,
  })
  }) 
  .then(()=>{setUploading(false)
  setAlertMessage({...alertMessage,visible:true,isInfo:true,title:"Tamamdır",isError:false,infoText:"İşi Tamamladınız!",route:"/"})
  })
  .catch(()=>{setUploading(false)
    setAlertMessage({...alertMessage,visible:true,isInfo:true,title:"Uyarı",isError:true,infoText:"Bir hata meydana geldi",})
  })
  
}
const handleCancel=async(e)=>{
  e.preventDefault()
  setUploading(true)
  var myOffer=state.Offers[state.Offers.findIndex(i=>i.firm===user.uid)]
  var newArray=state.Offers.filter(i=>i.firm!==user?.uid)
  await updateDoc(doc(db,"Jobs",state.doc),{
    Offers:newArray,
    firmsWhoCancelled:arrayUnion(auth.currentUser.uid),
    interestedFirms:arrayRemove(auth.currentUser.uid)
    
  })
  
  await updateDoc(doc(db,"Users",auth?.currentUser?.uid),{
    //completed:true,
    point:arrayUnion({
      id:new Date().valueOf().toString().substring(8),
      type:"cancel",
      time:new Date(),
      score:-10,
  })
  }) 
  .then(()=>{setUploading(false)
  setAlertMessage({...alertMessage,visible:true,isInfo:true,title:"Tamamdır",isError:false,infoText:"İşi İptal Ettiniz!",route:"/"})
  })
  .catch(()=>{setUploading(false)
    setAlertMessage({...alertMessage,visible:true,isInfo:true,title:"Uyarı",isError:true,infoText:"Bir hata meydana geldi",})
  })
  
}
let TLLocale = Intl.NumberFormat('tr-TR');
    return (
      <>
      <div className='single'>
            <Sidebar/>
            <div className="singleContainer">
            <Navbar/>
            <AppModal
              open={alertMessage.visible} 
              setOpen={setAlertMessage}
              isInfo={alertMessage.isInfo}
              isError={alertMessage.isError}
              title={alertMessage.title}
              route={alertMessage.route}
              infoText={alertMessage.infoText}
              handleFunction={alertMessage.handleFunction}
              functionText={alertMessage.functionText}
              state={state}
              alertstate={alertMessage}
              />
                          <div className="header-buttons">
                          <div
                              id='print'
                          className='button'
                          type="button" onClick={()=>window.print()}>
                            Çıktı Al
                          </div>
                          <div 
                          id='savePdf'
                          className='button'
                          type="button" 
                          onClick={savePdf}
                          value="kaydet">
                            Pdf İndir
                          </div>
                            {/* <RWebShare  
                              data={state}
                              onClick={() => alert("shared successfully!")}
                              >
                                <button className='button' >Paylaş 🔗</button>
                            </RWebShare>  */}
                        
                      </div>
                          
                                                  
                  
            <div id='section-to-print'className='tableContainer'>
                <div className='title'>{state.id} no.lu {state.mainWish} Teklif Formu</div>
                <div className="job info">
                <div className="title">Hizmet Genel Bilgileri</div>
                  <p className='row-p'><span className='row-title'>Ana Talep</span><span className='row-text'>{state.mainWish} / {state.wishDetail?.summary?.a}</span></p>
                  <p className='row-p'><span className='row-title'>Servis Talebi Oluşturma Zamanı</span><span className='row-text'>{new Date(state?.createdAt.seconds*1000).toLocaleString()}</span></p>
                  <p className='row-p'><span className='row-title'>Teklif Zamanı</span><span className='row-text'>{new Date(state?.Offers[state?.Offers.findIndex(i=>i.firm===user.uid)].createdAt.seconds*1000).toLocaleString()}</span></p>
            
                  
                </div>
               
                <div className='summary'>
                <div className="title">Hizmet İçeriği</div>
                    {wishDetail.map(i=>{
                        return(
                            <div 
                            key={i.id}
                            className='summary-row'>
                              <p className='question'>{i.q}</p>
                              <p className='answer'>{i.a}</p>
                            </div>
                        )
                    })}
                </div>
                <span className='title margin-top'>Notlar</span>
                {state.notes?.length>0?
                <Notes state={state} />:<span className='empty-text'>Not yok</span>
                }
                {amIaccepted(state)&&<div className='info'>
                  <div className="title">Müşteri Bilgileri</div>
                  <p className='row-p'><span className='row-title'>İsim</span><span className='row-text'>{state?.name}</span></p>
                  <p className='row-p'><span className='row-title'>E-Posta</span><span className='row-text'>{state?.email}</span></p>
                  <p className='row-p'><span className='row-title'>Telefon</span><span className='row-text'>{state?.phone}</span></p>
                  <p className='row-p'><span className='row-title'>Adres</span><span className='row-text'> {state?.adress} {state?.region} {state?.city}</span></p>
                  
                </div>}
                
                {/* <div>{statues[state.statue]}</div> */}
                <h3 className='section-header'>Parça Listesi</h3>
                <Box 
                className='box'
                sx={{ height:(state.relatedProducts.length+3)*60, width: '90%' }}>
                    <DataGrid
                        className='data-grid'
                        rows={state.Offers[state.Offers.findIndex(i=>i.firm===user.uid)].relatedProducts}
                        columns={columns}
                        rowHeight={50}
                        autoHeight
                        hideFooterPagination
                        disableColumnFilter
                        localeText={{
                          columnMenuShowColumns: 'Sütunları Göster',
                          columnMenuSortAsc: 'En Fazla',
                          columnMenuSortDesc: 'En Az',
                          columnMenuFilter: 'Filtre',
                          columnMenuHideColumn: 'Sütunu Gizle',
                          columnMenuUnsort: 'Filtreyi Kaldır',
                          columnsPanelShowAllButton: 'Hepsini Göster',
                          columnsPanelHideAllButton: 'Hepsini Gizle',
                          columnsPanelTextFieldLabel: 'Sütun Bul',
                          columnsPanelTextFieldPlaceholder: 'Sütun Başlığı',
                          columnsPanelDragIconLabel: 'Sütunları Düzenle',
                          filterPanelAddFilter: 'Filtre Ekle',
                          filterPanelDeleteIconLabel: 'Sil',
                          filterPanelLinkOperator: 'Seçici',
                          filterPanelOperators: 'Seçici', // TODO v6: rename to filterPanelOperator
                          filterPanelOperatorAnd: 've',
                          filterPanelOperatorOr: 'veya',
                          filterPanelColumns: 'Sütunlar',
                          filterPanelInputLabel: 'Değer',
                          filterPanelInputPlaceholder: 'Filtre Değeri',
                          footerRowSelected: (count) =>
                              count !== 1
                          ? `${count.toLocaleString()} satır seçildi`
                          : `${count.toLocaleString()} satır seçildi`,
                          footerTotalRows: 'Toplam Satır:',
                          noRowsLabel: 'Satır Yok',
                          noResultsOverlayLabel: 'Hiç bir sonuç bulunamadı.',
                          errorOverlayDefaultLabel: 'Bir hata meydana geldi',
                    
              
                          // Total row amount footer text
              
                          // Filter operators text
                          filterOperatorContains: 'içerir',
                          filterOperatorEquals: 'eşittir',
                          filterOperatorStartsWith: '-ile başlar',
                          filterOperatorEndsWith: 'ile biter',
                          filterOperatorIs: 'budur',
                          filterOperatorNot: 'bu değildir?',
                          filterOperatorAfter: '-den sonradır',
                          filterOperatorOnOrAfter: 'üzerinde veya sonradır',
                          filterOperatorBefore: '-den öncedir',
                          filterOperatorOnOrBefore: 'üzerinde veya öncedir',
                          filterOperatorIsEmpty: 'boştur',
                          filterOperatorIsNotEmpty: 'boş değildir',
                          filterOperatorIsAnyOf: '-den birisidir',
                          footerTotalVisibleRows: (visibleCount, totalCount) =>
                              `${totalCount.toLocaleString()} da ${visibleCount.toLocaleString()}`,
                              MuiTablePagination: {
                                  labelDisplayedRows: ({ from, to, count }) =>
                                  `${count} içinde ${from} - ${to}`,
                                  labelRowsPerPage:"1 sayfadaki satır sayısı :"
                    },
                      
                        }}
                    />
                    
                    <div className='priceInfoDiv'>
                        
                        <span className={`numberWithStatus`}>Toplam :{TLLocale.format(oldSum)} ₺ (KDV DAHİL)</span>
                        
                        
                    </div>
                    
                </Box>
                {amIaccepted(state)&&!state.completed?<button
                    className='finish-button'
                    onClick={(e)=>setAlertMessage({
                      ...alertMessage,visible:true,isInfo:false,
                      title:"Dikkat",
                      infoText:"İşi Tamamlamak Üzeresiniz",handleFunction:()=>handleFinish(e,state),functionText:"Yine de tamamla",route:"/",
                    })}
                    >İşi Tamamla</button>:<button
                    className='finish-button'
                    onClick={(e)=>setAlertMessage({
                      ...alertMessage,visible:true,isInfo:false,
                      title:"Dikkat",
                      infoText:"İşi İptal Etmek Üzeresiniz",handleFunction:()=>handleCancel(e),functionText:"Yine de iptal et",route:"/",
                    })}
                    >İşi İptal Et</button>}
                  
            </div>
            
            </div>
            {/* <RightSideBar/> */}
        </div>
      
      </>
        
  )
}

export default SingleMyJob