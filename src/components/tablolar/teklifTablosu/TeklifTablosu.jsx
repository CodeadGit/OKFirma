import React, { useContext, useEffect, useState } from "react";
import "./teklifTablosu.scss";
import { auth } from "../../../firebase/firebase.config";
import { statues } from "../../data/statues";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import PriceOfOneRow from "./PriceOfOneRow";
// import OfferStatue from "./OfferStatue";
import { RunCircleOutlined } from "@mui/icons-material";
import { CloudContext } from "../../../context/cloud.context";
import { calculateFilterDays } from "../../../functions";

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

  const [allRowsData, setallRowsData] = useState(sortedData);

  const mydiscoveries = kesiflerimPage ? allRowsData : allRowsData.slice(0, 5);

  const [filteredInterval, setFilteredInterval] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setFilteredInterval(value);
  };

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
          width: "100%"
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
          toolbar: () => <CustomToolbar calculateFilterDays={calculateFilterDays} data={data} setallRowsData={setallRowsData} handleChange={handleChange} filteredInterval={filteredInterval} />
        }}
        hideFooter
        autoHeight
      />
    </div>
  );
}

export default TeklifTablosu;

export function CustomToolbar({calculateFilterDays, data, setallRowsData, filteredInterval, handleChange}) {

  const location = useLocation();

  const isFirsatlarim = location.pathname === "/kesifler";

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
    <GridToolbarContainer
      sx={{
        display: "flex",
        padding: "1rem 2.25rem 0",
      }}
    >
      <p className="myKesiflerim">{isFirsatlarim ? "Keşif Fırsatlarım" : "Keşifler"}</p>
      <div className="rightSide">
        <div className="colors">
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
        </div>
        <select style={{outline:"none", cursor:"pointer"}} value={filteredInterval} onChange={(e) => {
          handleChange(e);
          calculateFilterDays(data, e.target.value, setallRowsData);
        }}>
          <option hidden value="">Aralık Seçiniz</option>
        {
          values.map((item) => (
            <option key={item.id} value={item.value}>{item.label}</option>
          ))
        }
        </select>
        <div class="input-container">
          <input
            onChange={(e) => console.log(new Date(e.target.value))}
            id="effective-date"
            type="date"
            name="effective-date"
            minlength="1"
            maxlength="64"
            placeholder=" "
            style={{ opacity: 0, position: "absolute" }}
            autocomplete="nope"
            required="required"
          ></input>
          <span class="bar">Tarihe Göre Sırala</span>
        </div>

        <GridToolbarFilterButton
          sx={{
            paddingInline: "0 !important",
          }}
        />
        <GridToolbarExport
          sx={{
            paddingInline: "0 !important",
          }}
        />
      </div>
    </GridToolbarContainer>
  );
}

