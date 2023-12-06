import React, { useContext } from "react";
import "./teklifTablosu.scss";
import { auth } from "../../../firebase/firebase.config";
import { statues } from "../../data/statues";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import PriceOfOneRow from "./PriceOfOneRow";
import OfferStatue from "./OfferStatue";
import { RunCircleOutlined } from "@mui/icons-material";
import { CloudContext } from "../../../context/cloud.context";

function TeklifTablosu({ data, kesiflerimPage }) {
  let TLLocale = Intl.NumberFormat("tr-TR");

  const { deleteFirmFromJob, updatingJob } = useContext(CloudContext);

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
      renderCell: (params) => {
        return <PriceOfOneRow job={params.row} />;
      },
    },
    {
      field: "durum",
      headerName: "Durum",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      cellClassName: "statue-holder",
      flex: 1.5,
      renderCell: (e) => {
        const statueData = data.map((item) => item.statue);
        return statueData.length < 0 ? (
          <h3>Başka Firma Onaylandı</h3>
        ) : (
          <>
            <div className={`statue ${statues[e.row.durum].class}`}>
              <div className={`${statues[e.row.durum].class}`}></div>
              <p>{statues[e.row.durum].label}</p>
            </div>
            {/* <OfferStatue job={e.row.doc} /> */}
          </>
        );
      },
    },
    {
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      cellClassName: "navigate",
      renderCell: (e) => {
        //const stateData = data.find((item) => item.id === e.row.teklifId);
        return (
          <>
            {e.row.durum !== 11 ? (
              <NavLink to={`/kesiflerim/${e.row.doc}`}>
                {/* <Button className="datagridButton">
                  <p>Görüntüle</p>
                </Button> */}
                ...
              </NavLink>
            ) : (
              <Tooltip title="iş listesinden çıkar">
                <IconButton
                  onClick={() => deleteFirmFromJob(e.row)}
                  disabled={updatingJob ? true : false}
                  className="delete-button"
                >
                  <RunCircleOutlined />
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      },
    },
  ];

  const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);

  const mydiscoveries = kesiflerimPage ? sortedData : sortedData.slice(0, 5);

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          border: "1px solid red",
          display: "flex",
          paddingLeft: "2rem",
        }}
      >
        <p className="myKesiflerim">Keşiflerim</p>
        {/* <div className="tableHeader">
          <div className="right">
            <div className="colors">
              <div className="color"></div>
              <div className="color"></div>
              <div className="color"></div>
              <div className="color"></div>
              <div className="color"></div>
            </div>
            <div className="filters">
              <p>Filtreler</p>
              <p>Tarihe Göre Sırala</p>
              <p>Dışarı Aktar</p>
            </div>
          </div>
        </div> */}
        <div className="rightSide">
          <div className="colors">
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
          </div>
          <GridToolbarFilterButton  sx={{
          border: "1px solid red",
          paddingInline: "0 !important",
        }}/>
          <GridToolbarExport sx={{
          border: "1px solid red",
          paddingInline: "0 !important"
        }}/>
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div className={`tableParent ${kesiflerimPage ? "kesiflerim" : ""}`}>
      <DataGrid
        rows={mydiscoveries.map((item, index) => {
          var array = item.Offers;
          var itemIndex = array.findIndex(
            (i) => i.firm === auth.currentUser.uid
          );
          var priceelement = array[itemIndex];

          return {
            id: index + 1,
            teklifId: item.id,
            doc: item.doc,
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
            durum: item.statue,
          };
        })}
        sx={{
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "inherit",
          },
        }}
        density="comfortable"
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        columns={columns}
        pageSizeOptions={[5]}
        slots={{
          toolbar: CustomToolbar,
        }}
        hideFooter
        autoHeight
      />
    </div>
  );
}

export default TeklifTablosu;
