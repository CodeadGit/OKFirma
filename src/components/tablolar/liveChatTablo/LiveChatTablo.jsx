import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./liveChatTablo.scss";
import { Button, Box } from "@mui/material";

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
    field: "durum",
    headerName: "Durum",
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

const rows = [
  {
    id: 1,
    talepid: "29422791",
    tarihZaman: "13.11.2022",
    durum: "Cevap Bekliyor",
    konu: "Genel",
    oncelik: "Normal",
  },
  {
    id: 2,
    talepid: "29422791",
    tarihZaman: "13.11.2022",
    durum: "Cevap Bekliyor",
    konu: "Genel",
    oncelik: "Normal",
  },
  {
    id: 3,
    talepid: "29422791",
    tarihZaman: "13.11.2022",
    durum: "Cevap Bekliyor",
    konu: "Genel",
    oncelik: "Normal",
  },
  {
    id: 4,
    talepid: "29422791",
    tarihZaman: "13.11.2022",
    durum: "Cevap Bekliyor",
    konu: "Genel",
    oncelik: "Normal",
  },
];

function LiveChatTablo() {
  return (
    <Box sx={{ height: 270, width: "100%" }}>
      <DataGrid
        className="dataGridStyles"
        rows={rows}
        columns={columns}
        density="compact"
        hideFooter={true}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

export default LiveChatTablo;
