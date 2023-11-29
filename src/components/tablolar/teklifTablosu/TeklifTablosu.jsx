import React, { useContext } from "react";
import "./teklifTablosu.scss";
import { auth } from "../../../firebase/firebase.config";
import { statues } from "../../data/statues";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import PriceOfOneRow from "./PriceOfOneRow";
import OfferStatue from "./OfferStatue";
import { DeleteForever, RunCircle, RunCircleOutlined, RunningWithErrors } from "@mui/icons-material";
import { CloudContext } from "../../../context/cloud.context";

function TeklifTablosu({ data }) {
  let TLLocale = Intl.NumberFormat("tr-TR");

  const {
    deleteFirmFromJob,
    updatingJob}=useContext(CloudContext)
  
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
      renderCell:(params)=>{
        return(
          <PriceOfOneRow job={params.row} />
        )
      }
    },
    {
      field: "durum",
      headerName: "Durum",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      cellClassName:"statue-holder",

      flex: 1.5,
      renderCell: (e) => {
        const statueData = data.map((item) => item.statue);
        return statueData.length < 0 ? (
          <h3>Başka Firma Onaylandı</h3>
        ) : (
          <>
          <div className={`statue ${statues[e.row.durum].class}`}>
            <p>{statues[e.row.durum].label}</p>
          </div>
          <OfferStatue job={e.row.doc} />
          </>
        );
      },
    },
    {
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (e) => {
        //const stateData = data.find((item) => item.id === e.row.teklifId);

        return (
          <>
          {e.row.durum!==11?
          <NavLink to={`/kesiflerim/${e.row.doc}`}>
          <Button className="datagridButton">
            <p>Görüntüle</p>
          </Button>
        </NavLink>
        :
          <Tooltip
            title="iş listesinden çıkar"
          >
              <IconButton
                onClick={()=>deleteFirmFromJob(e.row)}
                disabled={updatingJob?true:false}
                className="delete-button"
              >
                <RunCircleOutlined/>
              </IconButton>
          </Tooltip>
          }
          
          </>
        );
      },
    },
  ];

  return (
    <div className="tableParent">
      <DataGrid
      autoHeight
        rows={data.map((item, index) => {
          var array = item.Offers;
          var itemIndex = array.findIndex(
            (i) => i.firm === auth.currentUser.uid
          );
          var priceelement = array[itemIndex];

          return {
            id: index + 1,
            teklifId: item.id,
            doc:item.doc,
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
        density="comfortable"
        columns={columns}
        pageSizeOptions={[5]}
      />
    </div>
  );
}

export default TeklifTablosu;
