import React, { useContext } from "react";
import "./exportPdf.scss";
import Logo from "./svg/logo.svg";
import { useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/authentication.context";
import { Notes } from "@mui/icons-material";
import ParcaTablosuPdf from "../tablolar/parcaTablo/ParcaTablosuPdf";

function ExportPdf() {
  const { state } = useLocation();
  const { user } = useContext(AuthenticationContext);

  const wishDetail = Object.values(state.wishDetail);
  let TLLocale = Intl.NumberFormat("tr-TR");

  var offerIndex = state?.Offers.findIndex((i) => i.firm === user.uid);
  var oldSum =
    state && state.Offers.length > 0
      ? state.Offers?.[offerIndex].relatedProducts
          .map((item) => item.price)
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;

  return (
    <div id="section-to-print" className="singleContainerPdf">
      <div className="infoArea">
        <img src={Logo} alt="logo" />
        <p>
          {state.id} No'lu {state.mainWish}
        </p>
      </div>
      <hr className="seperator" />
      <div className="teklifBilgiContainerPdf">
        <div className="teklifDetailsPdf">
          <p>Hizmet İçeriği</p>
          <hr />
          <table>
            {wishDetail.map((i) => {
              return (
                <tr key={i.id}>
                  <th>{i.q}</th>
                  <td>{i.a}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="teklifRequestPdf">
          <div className="requestHeaderPdf">
            <p>Hizmet Genel Bilgileri</p>
          </div>
          <hr />
          <div className="requestBody">
            <table>
              <tr>
                <th>Ana Talep </th>
                <td>{state.mainWish}</td>
              </tr>
              <tr>
                <th>Talep Oluşturma Tarihi </th>
                <td>
                  {new Date(state?.createdAt.seconds * 1000).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>Teklif Zamanı </th>
                <td>
                  {new Date(
                    state?.Offers[
                      state?.Offers.findIndex((i) => i.firm === user.uid)
                    ].createdAt.seconds * 1000
                  ).toLocaleString()}
                </td>
              </tr>
            </table>
            <div className="talepNotesAreaPdf">
              <p>Notlar</p>
              {state.notes?.length > 0 ? (
                <Notes state={state} />
              ) : (
                <span className="empty-textPdf">Not yok</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="partListPdf">
        <p>Parça Listesi</p>
      </div>
      <div className="teklifBilgiContainerPdf">
        <ParcaTablosuPdf data={state} />
      </div>
      <div className="teklifContainerBottomPdf">
        <div className="priceInfoDivPdf">
          Toplam :{TLLocale.format(oldSum)} ₺ (KDV DAHİL)
        </div>
      </div>
    </div>
  );
}

export default ExportPdf;
