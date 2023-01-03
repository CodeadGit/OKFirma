import React from 'react'
import Path from '../../components/boxes/Path'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./kesifler.scss"
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { statues } from '../../components/data/statues'
import Moment from 'react-moment';
import trLocale from 'moment/locale/tr';
import { auth } from '../../firebase/firebase.config'

function Kesifler({data}) {

    
    const [pageSize,setPageSize]=useState(7)
    const pathData=[
        {text:"Panelim",to:"/",id:"01"},
        {text:"Keşif Fırsatları",to:"/kesifler",id:"02"},
     ]
     var dataToView=data.filter(i=>!i.interestedFirms.includes(auth.currentUser.uid)).filter(i=>new Date().getTime()<new Date(i.publishRemaining.seconds*1000).getTime())


const columns= [
    { 
    field: 'id', 
    headerName: 'SIRALAMA',
    headerClassName: 'header first',
    headerAlign: 'center',
    cellClassName: 'cell',
    width:150,
    align:"center",
    renderCell:props=>{
        return(
            <span>{data.findIndex(i=>i.id===props.row.id)+1}</span>
        )
    }
    },
    { 
    field: 'mainWish', 
    headerName: 'KATEGORİ',
    cellClassName: 'cell',
    headerClassName: 'header',
    headerAlign: 'center',
    width:150,
    align:"center",
},
    { 
    field: 'createdAt', 
    headerName: 'TARİH/ZAMAN', 
    headerClassName: 'header',
    cellClassName: 'cell',
    headerAlign: 'center',
    width:150,
    align:"center",
    renderCell:props=>{
        return(
            <div>
                {new Date(props.row.createdAt.seconds*1000).toLocaleDateString()}
                </div>
        )
    }
    
},
    { 
    field: 'city', 
    headerName: 'ADRES BİLGİLERİ', 
    headerClassName: 'header',
    headerAlign: 'center',
    cellClassName: 'cell',
    flex:1,
    align:"center",
    
},
    { 
    field: 'statue', 
    headerName: 'DURUM', 
    headerClassName: 'header',
    headerAlign: 'center',
    cellClassName: 'cell',
    align:"center",
    flex:1,
    renderCell:props=>{
        return(
            <div className={`statue ${statues[props.row.statue].class}`}>{statues[props.row.statue].label}</div>
        )
    }
    
},
    { 
    field: 'remainingTime', 
    headerName: 'KALAN ZAMAN', 
    headerClassName: 'header',
    cellClassName: 'cell',
    headerAlign: 'center',
    type:"date",
    align:"center",
    width:150,
    renderCell:props=>{
        var termin=new Date(props.row.termin.seconds*1000).getTime()
        var now=new Date().getTime()
        if(now>termin){
            return(
                <div>Teklif Yapılmadı</div>
            )
        }else{
            return(
            <Moment
                className='moment'
                to={new Date(props.row.termin.seconds*1000)}>{new Date()}</Moment>
        
            )
            }
        
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
            <NavLink
            to={`${props.row.id}`} state={props.row}
            className='view-button'
            >Görüntüle</NavLink>
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

        <Box
        className='box'
        >
        

        <DataGrid
        className='datagrid'
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[7, 10, 20]}
        pagination
        rows={dataToView}
        autoHeight
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
        
        
        </Box>
        
        
    </div>
    {/* <RightSideBar/> */}
    </div>
    </>
    
  )
}

export default Kesifler