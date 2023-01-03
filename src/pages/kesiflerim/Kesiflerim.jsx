import React from 'react'
import Path from '../../components/boxes/Path'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import "../kesifler/kesifler.scss"
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { auth, db } from '../../firebase/firebase.config'
import Empty from "../home/svg/empty.svg"
import { statues } from '../../components/data/statues'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'


function Kesiflerim({data}) {

    const [pageSize,setPageSize]=useState(7)
    const pathData=[
        {text:"Panelim",to:"/",id:"01"},
        {text:"Keşiflerim",to:"/kesiflerim",id:"02"},
     ]

     const handleRemove=async(e,props)=>{
        e.preventDefault()

        var willbeRemoved=props.row.Offers.find(i=>i.firm===auth.currentUser.uid)
        updateDoc(doc(db,"Jobs",props.row.doc),{
            Offers:arrayRemove(willbeRemoved),
            interestedFirms:arrayRemove(auth.currentUser.uid)
        })
     }
     const handleRemoveView=async(e,props)=>{
        e.preventDefault()

        var willbeRemoved=props.row.interestedFirms.find(i=>i===auth.currentUser.uid)
        updateDoc(doc(db,"Jobs",props.row.doc),{
            Offers:arrayRemove(willbeRemoved),
            interestedFirms:arrayRemove(auth.currentUser.uid)
        })
     }
     var otherAccepted=(props)=>{return props.row.interestedFirms.includes(auth.currentUser.uid)&&props.row.Offers.filter(i=>i.firm===auth.currentUser.uid).length<1}
    
     let TLLocale = Intl.NumberFormat('tr-TR');
const columns= [
    { 
    field: 'adminned', 
    headerName: 'SIRALAMA',
    headerClassName: 'header first',
    headerAlign: 'center',
    cellClassName: 'cell',
    width:150,
    renderCell:props=>{
        return(
            <span>{data.findIndex(i=>i.id===props.row.id)+1}</span>
        )
    }
    },
    { 
    field: 'id', 
    headerName: 'TEKLİF ID',
    cellClassName: 'cell',
    headerClassName: 'header',
    headerAlign: 'center',
    width:150
}, { 
    field: 'mainWish', 
    headerName: 'KATEGORİ', 
    headerClassName: 'header',
    cellClassName: 'cell',
    headerAlign: 'center',
    width:150,
   
    
},
    { 
    field: 'createdAt', 
    headerName: 'TARİH/ZAMAN', 
    headerClassName: 'header',
    cellClassName: 'cell',
    headerAlign: 'center',
    width:150,
    renderCell:props=>{

        return(
            <>
            {otherAccepted(props)?null:
            <div>{new Date(props.row.Offers[0].createdAt.seconds*1000).toLocaleDateString()}</div>
            }
                
            </>
        )
    }
    
},
    { 
    field: 'city', 
    headerName: 'ADRES BİLGİLERİ', 
    headerClassName: 'header',
    headerAlign: 'center',
    cellClassName: 'cell',
    flex:1
    
},
{ 
    field: 'relatedProducts', 
    headerName: 'FİYAT', 
    headerClassName: 'header',
    cellClassName: 'cell',
    headerAlign: 'center',
    type:"date",
    flex:1,
    renderCell:props=>{
        return(
            <>{otherAccepted(props)?null:
                <div>
                {TLLocale.format(props.row.Offers[props.row.Offers.findIndex(i=>i.firm===auth.currentUser.uid)].totalPrice)} ₺
            </div>
            }
                
            </>
        )
    }
    
},
    { 
    field: 'statue', 
    headerName: 'DURUM', 
    headerClassName: 'header',
    headerAlign: 'center',
    cellClassName: 'cell',
    flex:1,
    renderCell:props=>{
        
      
        return(
            <>
            {
            otherAccepted(props)?<h4>Başka Firma Onaylandı</h4>:
            props.row.Offers[props.row.Offers.findIndex(i=>i.firm===auth.currentUser.uid)].refused?
                    <h4>Teklif Reddedildi</h4>
                    :<div className={`statue ${statues[props.row.statue].class}`}>{statues[props.row.statue].label}</div>
            
        }
                </>
        )
    }
    
},
   
    { field: 'action', 
    headerName: "action", 
    headerClassName: 'header last black',
    headerAlign: 'center',
    cellClassName: 'cell',
    flex:1,
    height:"100%",
    renderCell:props=>{
        
        return(
            <>
            {
            otherAccepted(props)?<button 
            onClick={(e)=>handleRemoveView(e,props)}
            >Kaldır</button>:
            props.row.Offers[props.row.Offers.findIndex(i=>i.firm===auth.currentUser.uid)].refused?
            <button 
            onClick={(e)=>handleRemove(e,props)}
            >Kaldır</button>
            :<NavLink
            to={`${props.row.id}`} state={props.row}
            className='view-button'
            >Görüntüle</NavLink>    
        }
            
            </>
        )
    }
}
  ];


  return (
    <>
    <div className='home'>
    <Sidebar/>
    <div className="homeContainer">
        <Navbar/>
        <Path children={pathData} />
        {data?.length>0?
        <Box
        className='box'
        >
        

        <DataGrid
        className='datagrid'
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        autoHeight
        rows={data}
        scrollbarSize={0}
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
        columns={columns}
        //disableColumnMenu={true}
        />
        
        
        </Box>:<div className='empty'>
           <img src={Empty} alt="" />

           <NavLink 
           to="/kesifler"
           className="button">Keşiflere Git</NavLink>
           </div>
        }
        
        
        
    </div>
    {/* <RightSideBar/> */}
    </div>
    </>
    
  )
}

export default Kesiflerim