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
import { Padding } from "@mui/icons-material";

const columns = [
  {
    field: "id",
    headerName: "Sıra No",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    width: 30
    
  },
  {
    field: "doc",
    headerName: "Talep ID",
    flex: 2,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Tarih/Zaman",
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
  }, 
  {
    field: "subject",
    headerName: "Konu",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
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
    field:"summary",
    headerName:"",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    flex: 2,
    cellClassName: "navigate",
    renderCell: (e) => {
      return (
        <NavLink 
        to={`/mesajlarim/Destek-Talebi/${e.row.doc}`}>
          ...
        </NavLink>
      );
    },
  },
];

function DestekTalepTablo({data, padding}) {

  
  const { user } = useContext(AuthenticationContext);

  const filteredData = data.filter((i) => i.fromName === user.displayName )
  
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Destek Taleplerim", to: "/mesajlarim/Destek-Talebi", id: "03" },
  ];

  const paddingLeft = padding ? "30px" : "0";

  return (
    <Box sx={{ height: "auto", width: "100%", paddingLeft }}>
      <DataGrid
        className="dataGridStyles"
        columns={columns}
        rows={filteredData.map((item, index) => (
            {
              id: index + 1,
              doc: item.id,
              createdAt: new Date(
                item.createdAt.seconds * 1000
              ).toLocaleDateString("tr-TR"),
              subject: item.subject,
              statue: item.statue === 0 ? "Cevap Bekliyor" : "Kabul Edildi",
              priority: item.priority,
              summary:  (
                <NavLink 
                to={`/mesajlarim/Destek-Talebi/${item.doc}`}>
                  ...
                </NavLink>
              )
            }        
        ))}
        density="compact"
        hideFooter={true}
        pageSizeOptions={[5]}
        // autoHeight={true}

      />
    </Box>
  );
}

export default DestekTalepTablo;
