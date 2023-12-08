import React, { useEffect, useState } from "react";
import "../teklifTablosu/teklifTablosu.scss";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import { statues } from "../../data/statues";
import { auth } from "../../../firebase/firebase.config";
import { Button } from "@mui/material";
import { LocaleText } from "../../data/localeText";
import { CustomToolbar } from "../teklifTablosu/TeklifTablosu";
import { calculateFilterDays } from "../../../functions";

function KesifFirsatiTablo({ data, kesiflerPage }) {
  
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
            <div className={`${statues[props.row.statue].class}`}></div>
            <p>{statues[props.row.statue].label}</p>
          </div>
        );
      },
    },
    {
      field: "termin",
      headerName: "KALAN ZAMAN",
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (props) => {
        const timeObject = props.row.termin;
        const targetTime = timeObject.seconds * 1000 + Math.floor(timeObject.nanoseconds / 1e6);
        const currentTime = new Date().getTime();
        const remainingTime = targetTime - currentTime;
        const remainingSeconds = Math.floor(remainingTime / 1000);
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingHours = Math.floor(remainingMinutes / 60);

        if (remainingHours < 0) return <p>Süre Bitti</p>
        return <div>{`${remainingHours} SAAT`}</div>;
      },
    },
    // {
    //   field: "remainingTime",
    //   headerName: "Kalan Zaman",
    //   type: "date",
    //   flex: 1,
    //   sortable: false,
    //   editable: false,
    //   disableColumnMenu: true,
    //   renderCell: (props) => {
    //     var termin = new Date(props.row.termin.seconds * 1000).getTime();
    //     var now = new Date().getTime();
    //     if (now > termin) {
    //       return <div>Teklif Yapılmadı</div>;
    //     } else {
    //       return (
    //         <>
    //           <Moment
    //             className="moment"
    //             to={new Date(props.row.termin.seconds * 1000)}
    //           >
    //             {new Date()}
    //           </Moment>
    //         </>
    //       );
    //     }
    //   },
    // },
    {
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      cellClassName: "navigate",
      renderCell: (props) => {
        return (
          <NavLink to={`${props.row.doc}`} state={props.row}>
              ...
          </NavLink>
        );
      },
    },
  ];

  const [rowsData, setRowsData] = useState(data);

  useEffect(() => {
    setRowsData(data);
  }, [data]);

  const values = [
    {
      id: 1,
      label: "Hepsi",
      value: "all", 
    },
    {
      id: 2,
      label: "2 Gün",
      value: "2", 
    },
    {
      id: 3,
      label: "1 Hafta",
      value: "7", 
    },
    {
      id: 4,
      label: "10 Gün",
      value: "10", 
    },
    {
      id: 5,
      label: "2 Hafta",
      value: "14", 
    },
  ];

  return (
    <div className={`tableParent ${kesiflerPage ? "kesiflerim" : ""}`}>
      <DataGrid
        rows={rowsData}
        density="comfortable"
        columns={columns}
        pageSizeOptions={[5]}
        localeText={LocaleText}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        autoHeight
        slots={{
          toolbar: () => <CustomToolbar calculateFilterDays={calculateFilterDays} data={data} setallRowsData={setRowsData} values={values} />
        }}
      />
    </div>
  );
}

export default KesifFirsatiTablo;
