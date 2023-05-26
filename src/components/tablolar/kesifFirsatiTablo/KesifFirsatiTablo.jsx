import React from "react";
import "../teklifTablosu/teklifTablosu.scss";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import { statues } from "../../data/statues";
import { auth } from "../../../firebase/firebase.config";
import { Button } from "@mui/material";

function KesifFirsatiTablo({ data }) {
  const dataToView = data
    .filter((i) => !i.interestedFirms.includes(auth.currentUser.uid))
    .filter(
      (i) =>
        new Date().getTime() <
        new Date(i.publishRemaining.seconds * 1000).getTime()
    );

  console.log(dataToView);
  const columns = [
    {
      field: "id",
      headerName: "Sıralama",
      flex: 0.5,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (props) => {
        return <span>{data.findIndex((i) => i.id === props.row.id) + 1}</span>;
      },
    },
    {
      field: "mainWish",
      headerName: "Kategori",
      flex: 1,
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
      renderCell: (props) => {
        return (
          <div>
            {new Date(props.row.createdAt.seconds * 1000).toLocaleDateString()}
          </div>
        );
      },
    },
    {
      field: "city",
      headerName: "Adres Bilgileri",
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
      renderCell: (props) => {
        return (
          <div className={`statue ${statues[props.row.statue].class}`}>
            {statues[props.row.statue].label}
          </div>
        );
      },
    },
    {
      field: "remainingTime",
      headerName: "Kalan Zaman",
      type: "date",
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (props) => {
        var termin = new Date(props.row.termin.seconds * 1000).getTime();
        var now = new Date().getTime();
        if (now > termin) {
          return <div>Teklif Yapılmadı</div>;
        } else {
          return (
            <>
              <Moment
                className="moment"
                to={new Date(props.row.termin.seconds * 1000)}
              >
                {new Date()}
              </Moment>
            </>
          );
        }
      },
    },
    {
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (props) => {
        return (
          <NavLink to={`${props.row.id}`} state={props.row}>
            <Button className="datagridButton">
              <p>Görüntüle</p>
            </Button>
          </NavLink>
        );
      },
    },
  ];

  return (
    <div className="tableParent">
      <DataGrid
        rows={dataToView}
        density="comfortable"
        columns={columns}
        pageSizeOptions={[5]}
      />
    </div>
  );
}

export default KesifFirsatiTablo;
