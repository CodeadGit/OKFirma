import React from "react";
import "./teklifTablosu.scss";
import { auth } from "../../../firebase/firebase.config";
import { statues } from "../../data/statues";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function TeklifTablosu({ data }) {
  let TLLocale = Intl.NumberFormat("tr-TR");

  const columns = [
    {
      field: "id",
      headerName: "No",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 0.5,
    },
    {
      field: "teklifId",
      headerName: "Teklif Id",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "kategori",
      headerName: "Kategori",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "tarihZaman",
      headerName: "Tarih/Zaman",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
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
      field: "fiyat",
      headerName: "Fiyat",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "durum",
      headerName: "Durum",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (e) => {
        const statueData = data.map((item) => item.statue);
        return statueData.length < 0 ? (
          <h3>Başka Firma Onaylandı</h3>
        ) : (
          <div className={`statue ${statues[e.row.durum].class}`}>
            <p>{statues[e.row.durum].label}</p>
          </div>
        );
      },
    },
    {
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (e) => {
        const stateData = data.find((item) => item.id === e.row.teklifId);

        return (
          <NavLink to={`/kesiflerim/${e.row.teklifId}`} state={stateData}>
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
        rows={data.map((item, index) => {
          var array = item.Offers;
          var itemIndex = array.findIndex(
            (i) => i.firm === auth.currentUser.uid
          );
          var priceelement = array[itemIndex];

          return {
            id: index + 1,
            teklifId: item.id,
            kategori: item.mainWish,
            tarihZaman: new Date(
              item.createdAt.seconds * 1000
            ).toLocaleDateString("tr-TR"),
            adresBilgileri: `${item.city} / ${item.region}`,
            fiyat: priceelement ? (
              TLLocale.format(priceelement.totalPrice) + " ₺"
            ) : (
              <span>****₺</span>
            ),
            durum: `${item.statue}`,
          };
        })}
        density="comfortable"
        columns={columns}
        pageSizeOptions={[5]}
      />
    </div>
  );
}

export default TeklifTablosu;