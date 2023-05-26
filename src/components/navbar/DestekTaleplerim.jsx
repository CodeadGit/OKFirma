import React from "react";
import Chat from "./svg/chat.svg";
import { NavLink } from "react-router-dom";
import DestekTalepTablo from "../tablolar/destekTalepTablo/DestekTalepTablo";

function DestekTaleplerim() {
  return (
    <div className="destekInner">
      <div className="destekHeader">
        <div className="destekHeaderLeft">
          <img src={Chat} alt="taleplerim" />
          <p>Destek Taleplerim</p>
        </div>
        <div className="destekHeaderRight">
          <NavLink>Tüm Taleplerim</NavLink>
          <button>Yeni Talep Oluştur</button>
        </div>
      </div>
      <div className="destekDatagrid">
        <DestekTalepTablo />
      </div>
    </div>
  );
}

export default DestekTaleplerim;
