import React, { useContext, useState } from "react";
import "../parcaTablo/parcaTablosu.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../../context/authentication.context";
import PriceInput from "../../../pages/single/PriceInput";
import emailjs from "@emailjs/browser";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";

function ParcaKesifTablosu({ data }) {
  const [indexes, setIndexes] = useState({});
  const { state } = useLocation();
  const [rows, setRows] = useState(state.relatedProducts);
  const { user, userData } = useContext(AuthenticationContext);
  const [uploading, setUploading] = useState(false);
  var navigate = useNavigate();

  var newValue = Object.values(indexes).reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  const sendEmailToUser = () => {
    var params = {
      subject: state?.mainWish + " Servis Talebiniz Hakkında",
      user_email: state?.email,
      user_name: "bilgi@onlinekesif.com",
      message: `${state.mainWish} Servis Talebiniz için bir firma teklif yaptı.`,
    };

    emailjs
      .send(
        "onlinekesif_support",
        "template_fd5d0vb",
        params,
        "az39-SQ3JNFE4N2sA"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const addOffer = async (item) => {
    var row = {
      firm: user.uid,
      firmName: user.displayName,
      logo: user.photoURL,
      //job:item.postId,
      //jobTitle:item.MainWi sh,
      //jobCreatedAt:item.createdAt,
      createdAt: new Date(),
      relatedProducts: rows,
      totalPrice: newValue,
      KPU: userData.KPU,
      refused: false,
      email: auth.currentUser.email,

      id: Math.random().toString(16).substring(2, 9),
    };
    setUploading(true);
    const docRef = doc(db, "Jobs", item.doc);
    const userRef = doc(db, "Users", auth?.currentUser.uid);
    await updateDoc(docRef, {
      Offers: arrayUnion(row),
      statue: 2,
      statueMap: {
        id: new Date().valueOf(),
        createdAt: new Date(),
        what: 2,
        for: item?.userid,
        who: auth?.currentUser?.uid,
      },
      interestedFirms: arrayUnion(user.uid),
    })
      .then(() => setUploading(false))
      .then(() => alert("Tebrikler!! Teklif Gönderildi."))
      .finally(() => navigate("/"))
      .catch((err) => alert(err + "Bir hata meydana geldi."));

    await updateDoc(userRef, {
      point: arrayUnion({
        id: new Date().valueOf(),
        score: 10,
        time: new Date(),
        type: "made Offer as firm",
      }),
    });
    sendEmailToUser();
  };

  const columns = [
    {
      field: "sNo",
      headerName: "Sıra No",
      flex: 1,
      renderCell: (params) => {
        return <span>{state.relatedProducts.indexOf(params.row) + 1}</span>;
      },
    },
    { field: "id", headerName: "Parça Kodu", flex: 1 },
    { field: "amount", headerName: "Adet", flex: 1 },
    {
      field: "fiyat",
      headerName: "Birim Fiyat (₺)",
      flex: 2.5,
      renderCell: (params) => {
        return (
          <>
            {params.row.price !== "" && (
              <div className="inputInnerOldPrice">
                <span>{params.row.price} ₺</span>
              </div>
            )}
            <PriceInput
              state={state}
              params={params}
              setIndexes={setIndexes}
              indexes={indexes}
              rows={rows}
              setRows={setRows}
            />
          </>
        );
      },
    },

    {
      field: "label",
      headerName: "Malzeme / Servis Adı",
      flex: 8,

      renderCell: (params) => {
        return <div>{params.row.label}</div>;
      },
    },

    //     { field: "statue", headerName: "Durum", flex:1,
    //     renderCell: (params) => {
    //       return (
    //         <div className={`cellWithStatus ${statues[params.row.statue]}`}>
    //           {statues[params.row.statue]}
    //         </div>
    //       );
    //     },
    //    },
    // { field: "createdAt", headerName: "Oluşturma Zamanı", flex:1,renderCell: (params) => {
    //   var date=new Date(params.row.createdAt.seconds*1000).toLocaleString("tr-TR","string")
    //   return (
    //     <div>
    //       {date}
    //     </div>
    //   );
    // }, },
  ];

  return (
    <div className="parcaTable">
      <DataGrid
        className="data-grid"
        rows={state.relatedProducts}
        columns={columns}
        rowHeight={50}
        hideFooterPagination
      />

      <div className="priceInfoDiv">
        <span className={`numberWithStatus`}>
          Toplam :
          {Object.values(indexes).reduce((partialSum, a) => partialSum + a, 0)}{" "}
          ₺
        </span>

        <div onClick={() => addOffer(state)} className="submit">
          <span>Teklifi Oluştur</span>
        </div>
      </div>
    </div>
  );
}

export default ParcaKesifTablosu;
