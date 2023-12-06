import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./destekTalepTablo.scss";
import { Button, Box } from "@mui/material";
import { AuthenticationContext } from "../../../context/authentication.context";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import PriceOfOneRow from "../teklifTablosu/PriceOfOneRow";
import { auth } from "../../../firebase/firebase.config";

const columns = [
  {
    field: "id",
    headerName: "Sıralama",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "doc",
    headerName: "Teklif ID",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "kategori",
    headerName: "Kategori",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Tarih/Zaman",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "adresBilgileri",
    headerName: "Adres Bilgileri",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field:"summary",
    headerName:"",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    flex: 1,
    cellClassName: "navigate",
    renderCell: (params) => {
      return (
        <NavLink 
        to={`/kesiflerim/${params.row.summary}`}>
          ...
        </NavLink>
      );
    },
  },
];

function KesifTablo({data}) {
  
  const { user } = useContext(AuthenticationContext);

  let TLLocale = Intl.NumberFormat("tr-TR");
  
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Destek Taleplerim", to: "/mesajlarim/Destek-Talebi", id: "03" },
  ];

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        className="dataGridStyles"
        columns={columns}
        rows={data.map((item, index) => {
            var array = item.Offers;
            var itemIndex = array.findIndex(
              (i) => i.firm === auth.currentUser.uid
            );
            var priceelement = array[itemIndex];
            return {
              id: index + 1,
              doc: item.id,
              kategori: item.mainWish,
              createdAt: new Date(
                item.createdAt.seconds * 1000
              ).toLocaleDateString("tr-TR"),
              adresBilgileri: `${item.city}/${item.region}`,
              summary: item.doc,
            }}    
        )}
        density="compact"
        hideFooter={true}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

export default KesifTablo;
