import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GRID_DEFAULT_LOCALE_TEXT,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase.config";
import { LocaleText } from "../../../../components/data/localeText";
import { useApis } from "../../../../context/api.context";

export default function RelatedProducts({ job, data, handleChange }) {
  console.log(data);
  const { doviz } = useApis();
  let TLLocale = Intl.NumberFormat('tr-TR');

  const columns = [
    {
      field: "sira",
      headerName: "Sıra No",
      flex: 0.2,
      headerAlign: "start",
      align: "start",
    },

    {
      field: "id",
      headerName: "Parça Kodu",
      flex: 1,
      headerAlign: "start",
      align: "start",
    },
   {
      field: "adet",
      headerName: "Adet",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      sortable: false
    },
    {
      field: "label",
      headerName: "Malzeme / Servis Adı",
      flex: 2,
      headerAlign: "start",
      align: "start",
      
    },
 

    {
      field: "price",
      headerName: "Birim Fiyat (₺)",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      //editable: true,

      renderCell: (params) => {
        
        return (
          <div className="input-row">
            <input
              value={params.row.price}
              //style={{backgroundColor:"white"}}
              placeholder="Fiyat Giriniz"
              className="cell-input"
              name="price"
              onChange={(e) => handleChange(e, params.row.sira)}
            />
            <select
              className="select-curr"
              name="curr"
              onChange={(e) => handleChange(e, params.row.sira)}
              value={params.row.curr}
            >
              <option value={"TL"}>₺</option>
              {doviz && <option value={"USD"}>$</option>}
              {doviz && <option value={"EUR"}>€</option>}
              {doviz && <option value={"GBP"}>£</option>}
            </select>
          </div>
        );
      },
    },

    {
      field: "kdv",
      headerName: "KDV",
      flex: .4,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "toplamfiyat",
      headerName: "TOPLAM FİYAT",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell:(params)=>(
        <span>{TLLocale.format(Number(params.row.price)*Number(params.row.adet))} {params.row.curr}</span>
      )
    },
  ];
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
        pageSizeOptions={[25, 50, 75]}
        localeText={LocaleText}
        autoHeight
        experimentalFeatures={{ newEditingApi: true }}
        //checkboxSelection
        disableRowSelectionOnClick
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        onCellEditStop={(params, event) => {
          handleChange(params.row.index, event);
        }}
      />
    </Box>
  );
}
