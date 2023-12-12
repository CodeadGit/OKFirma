import { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./liveChatTablo.scss";
import { Button, Box } from "@mui/material";
import { CloudContext } from "../../../context/cloud.context";
import { supportStatues } from "../../data/statues";
import { useNavigate } from "react-router-dom";

// const rows = [
//   {
//     id: 1,
//     talepid: "29422791",
//     tarihZaman: "13.11.2022",
//     durum: "Cevap Bekliyor",
//     konu: "Genel",
//     oncelik: "Normal",
//   },
//   {
//     id: 2,
//     talepid: "29422791",
//     tarihZaman: "13.11.2022",
//     durum: "Cevap Bekliyor",
//     konu: "Genel",
//     oncelik: "Normal",
//   },
//   {
//     id: 3,
//     talepid: "29422791",
//     tarihZaman: "13.11.2022",
//     durum: "Cevap Bekliyor",
//     konu: "Genel",
//     oncelik: "Normal",
//   },
//   {
//     id: 4,
//     talepid: "29422791",
//     tarihZaman: "13.11.2022",
//     durum: "Cevap Bekliyor",
//     konu: "Genel",
//     oncelik: "Normal",
//   },
// ];

function LiveChatTablo() {

  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      flex: 2,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: "durum",
      flex: 1.25,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <p>{supportStatues[params.row.statue]}</p>
      }
    },
    {
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (e) => {
        return (
          <Button className="datagridButton" onClick={() => navigate(`/mesajlarim/Destek-Talebi/${e.id}`)}>
            ...
          </Button>
        );
      },
    },
  ];

  const { myRequests } = useContext(CloudContext);

  console.log(myRequests)
  
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        className="dataGridStyles livechat"
        rows={myRequests}
        columns={columns}
        density="compact"
        hideFooter={true}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

export default LiveChatTablo;
