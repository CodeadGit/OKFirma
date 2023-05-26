import React, { useContext } from "react";
import "./parcaTablosu.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../../context/authentication.context";

function ParcaTablosu({ data }) {
  let TLLocale = Intl.NumberFormat("tr-TR");
  const { user } = useContext(AuthenticationContext);
  const { state } = useLocation();

  var offerIndex = state?.Offers.findIndex((i) => i.firm === user.uid);

  const columns = [
    {
      field: "sNo",
      headerName: "Sıra No",
      flex: 0.05,
      renderCell: (params) => {
        return (
          <span>
            {state.Offers[offerIndex].relatedProducts.indexOf(params.row) + 1}
          </span>
        );
      },
    },
    { field: "id", headerName: "Parça Kodu", flex: 0.1 },
    {
      field: "amount",
      headerName: "Adet",
      flex: 0.05,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fiyat",
      headerName: "Birim Fiyat (₺)",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <>
            {params.row.price !== "" && (
              <span>{TLLocale.format(params.row.unitPrice)} ₺</span>
            )}
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Malzeme Toplam Fiyat",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <>
            {params.row.price !== "" && (
              <span>{TLLocale.format(params.row.price)} ₺</span>
            )}
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Malzeme / Servis Adı",
      flex: 0.3,
      cellClassName: "name",
      renderCell: (params) => {
        return <div>{params.row.name}</div>;
      },
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
  ];

  return (
    <div className="parcaTable">
      <DataGrid
        rows={
          state.Offers[state.Offers.findIndex((i) => i.firm === user.uid)]
            .relatedProducts
        }
        density="compact"
        hideFooter={true}
        columns={columns}
        pageSizeOptions={[5]}
      />
    </div>
  );
}

export default ParcaTablosu;
