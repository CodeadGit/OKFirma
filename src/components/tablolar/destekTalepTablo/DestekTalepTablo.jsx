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
import { db } from "../../../firebase/firebase.config";
import { SupportContext } from "../../../context/supportContext";
import { supportStatues } from "../../data/statues";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const columns = [
  // {
  //   field: "id",
  //   headerName: "Sıra No",
  //   flex: 1,
  //   sortable: false,
  //   editable: false,
  //   disableColumnMenu: true,
  // },
  // {
  //   field: "createdAt",
  //   headerName: "Tarih/Zaman",
  //   flex: 1,
  //   sortable: false,
  //   editable: false,
  //   disableColumnMenu: true,
  // },
  {
    field: "subject",
    headerName: "Konu",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "statue",
    headerName: "Durum",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    renderCell:(params)=>{
      return(
        <span>{supportStatues[params.row.statue]}</span>
      )
    }
  }, 
  {
    field: "priority",
    headerName: "Öncelik",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },  
  {
    field:"id",
    headerName:"",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    flex: 1,

    renderCell: (e) => {
      return (
        <NavLink 
        to={`/mesajlarim/Destek-Talebi/${e.row.doc}`}
        className="datagridButton">
          <span>Görüntüle</span>
        </NavLink>
      );
    },
  },
];

function DestekTalepTablo({data}) {
  
  const { user } = useContext(AuthenticationContext);
  
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
        rows={data}
        density="compact"
        hideFooter={true}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

export default DestekTalepTablo;
