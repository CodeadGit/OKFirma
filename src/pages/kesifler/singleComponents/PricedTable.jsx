import React ,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GRID_DEFAULT_LOCALE_TEXT, GridCellEditStopReasons } from '@mui/x-data-grid';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { LocaleText } from '../../../components/data/localeText';
import { useApis } from '../../../context/api.context';






export default function PricedTable({job,data,handleChange}) {
    const [thistotal,setThistotal]=useState(0)
    const {doviz} = useApis()
    const [currency,setCurrency]=useState("₺")
    let TLLocale = Intl.NumberFormat('tr-TR');


    // useEffect(()=>{
    //     const initialValue = 0;
    //           const sumWithInitial = data.reduce(
    //               (accumulator, currentValue) => accumulator + 
    //           (Number(currentValue.price)*Number(currentValue.adet)*Number(doviz[currentValue?.curr]?.satis)),
    //           initialValue
    //           );
    //           setThistotal(sumWithInitial)
    // },[data])
    const columns = [
  
  
        { 
          field: 'index', 
          headerName: 'Sıra No', 
          flex: .5,
          headerAlign:"left",
          align:"left",
          renderCell:(params)=>(
            <span>{params.row.index}</span>
          )
      },
    //   { 
    //     field: 'id', 
    //     headerName: 'Parça Kodu', 
    //     flex: .7,
    //     headerAlign:"left",
    //     align:"left"

    // },
      {
        field: 'label',
        headerName: 'Malzeme / Servis Adı',
        flex: 2,
        headerAlign:"left",
        align:"left",
 
      },
   
      {
        field: "kdv",
        headerName: "KDV",
        flex: .5,
        headerAlign: "center",
        align: "center",
      },
     {
        field: 'price',
        headerName: 'Birim Fiyat',
        flex: .5,
        headerAlign:"left",
        align:"left",
        //editable: true,
        renderCell:(params)=>(
            <span>{TLLocale.format(params.row.price)} {params.row.curr||"₺"}</span>
          )
        
      },

      {
        field: 'adet',
        headerName: 'Adet',
        flex: .5,
        headerAlign:"center",
        align:"center"
      },
      {
        field: 'id',
        headerName: 'Toplam Fiyat',
        flex: .5,
        headerAlign:"left",
        align:"left",
        renderCell:(params)=>(
            <span>{TLLocale.format(Number(params.row.price)*Number(params.row.adet))} {params.row.curr}</span>
          )
      },
        
       
       
        
        
      ];
      console.log("iç sayfa",data)
  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        getRowId={(row) => row.id}
        pageSizeOptions={[25,50,75]}
        localeText={LocaleText}
        autoHeight
        //experimentalFeatures={{ newEditingApi: true }}
        //checkboxSelection
        disableRowSelectionOnClick
        getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
          }
        onCellEditStop={(params, event) => {
           handleChange(params.row.index,event)
           
           
          }}
  
      />
      <div className="totalAmount">
        <span className='amount-title'>
            Toplam:    
        </span>
        <span
            className='amount'
        >
        {TLLocale.format(thistotal)} {currency}
        </span>
      </div>
    </Box>
  );
}