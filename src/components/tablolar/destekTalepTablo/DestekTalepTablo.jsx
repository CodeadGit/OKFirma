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

const columns = [
  {
    field: "id",
    headerName: "Sıra No",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "talepid",
    headerName: "Talep Id",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: "tarihZaman",
    headerName: "Tarih/Zaman",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "durum",
    headerName: "Durum",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "konu",
    headerName: "Konu",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "oncelik",
    headerName: "Öncelik",
    flex: 1,
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    sortable: false,
    editable: false,
    disableColumnMenu: true,
    flex: 1,
    renderCell: (e) => {
      return (
        <Button className="datagridButton">
          <p>Görüntüle</p>
        </Button>
      );
    },
  },
];

function DestekTalepTablo() {
  const [myRequests, setMyRequests] = useState([]);
  const { user } = useContext(AuthenticationContext);
  const getMessages = () => {
    const msgRef = collection(db, "FirmRequests");
    const q = query(msgRef, where("from", "==", user?.uid || "bekleniyor"));

    onSnapshot(q, orderBy("createdAt", "asc"), (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });

      setMyRequests(msgs);
    });
  };
  useEffect(() => {
    getMessages();
  }, []);
  const statues = ["Cevap Bekliyor", "Cevaplandı", "Kapandı"];
  const pathData = [
    { text: "Panelim", to: "/", id: "01" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Destek Taleplerim", to: "/mesajlarim/Destek-Talebi", id: "03" },
  ];

  myRequests.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  const rows = [];
  console.log(myRequests);

  return (
    <Box sx={{ height: 270, width: "100%" }}>
      <DataGrid
        className="dataGridStyles"
        columns={columns}
        rows={rows}
        density="compact"
        hideFooter={true}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

export default DestekTalepTablo;
