import React, { useContext } from "react";
import Chat from "./svg/chat.svg";
import { NavLink, useNavigate } from "react-router-dom";
import DestekTalepTablo from "../tablolar/destekTalepTablo/DestekTalepTablo";
import { SupportContext } from "../../context/supportContext";

function DestekTaleplerim() {
  
  const { myRequests } = useContext(SupportContext);

  const navigate = useNavigate();

  return (
    <div className="destekInner">
      <div className="destekHeader">
        <div className="destekHeaderLeft">
          <img src={Chat} alt="taleplerim" />
          <p>Destek Taleplerim</p>
        </div>
        <div className="destekHeaderRight">
          <NavLink to={"/mesajlarim/Destek-Talebi"}>Tüm Taleplerim</NavLink>
          <button onClick={() => navigate("/mesajlarim/Yeni-Destek-Talebi")}>
            Yeni Talep Oluştur
          </button>
        </div>
      </div>
      <div className="destekDatagrid">
        <DestekTalepTablo data={myRequests} />
      </div>
    </div>
  );
}

export default DestekTaleplerim;
