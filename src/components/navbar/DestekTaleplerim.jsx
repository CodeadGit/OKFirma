import React, { useContext, useEffect, useState } from "react";
import Chat from "./svg/chat.svg";
import { useLocation, useNavigate } from "react-router-dom";
import DestekTalepTablo from "../tablolar/destekTalepTablo/DestekTalepTablo";
import { SupportContext } from "../../context/supportContext";
import { AuthenticationContext } from "../../context/authentication.context";
import { db } from "../../firebase/firebase.config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { CloudContext } from "../../context/cloud.context";
import KesifTablo from "../tablolar/destekTalepTablo/KesifTablo";

function DestekTaleplerim() {
  
  const { myJobsData } = useContext(CloudContext);

  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const isKesiflerim = pathname !== "/mesajlarim";

  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user) {
      let controller = new AbortController();
      (async () => {
        const q = query(collection(db, "FirmRequests"));
        const jobgetting = onSnapshot(q, (snap) => {
          var jobs = [];
          if (!snap.empty) {
            snap.forEach((doc) => {
              jobs.push({ ...doc.data(), id: doc.id });
            });
            setMyRequests(jobs);
            setLoading(false);
          }
        });
        return () => jobgetting();
      })();
      return () => {
        controller?.abort();
      };
    }
  }, [user]);

  return (
    <div className="destekInner">
      <div className="destekHeader">
        <div className="destekHeaderLeft">
          <img src={Chat} alt="taleplerim" />
          <p>{isKesiflerim ? "Destek Talepleriniz" : "Keşiflerim"}</p>
        </div>
        {isKesiflerim && (
          <div className="destekHeaderRight">
            {/* <NavLink to={"/mesajlarim/Destek-Talebi"}>Tüm Taleplerim</NavLink> */}
            <button onClick={() => navigate("/mesajlarim/Yeni-Destek-Talebi")}>
              Yeni Talep Oluştur
            </button>
          </div>
        )}
      </div>
      <div className="destekDatagrid">
        {isKesiflerim ? (
          <DestekTalepTablo data={myRequests} />
        ) : (
          <KesifTablo data={myJobsData} />
        )}
      </div>
    </div>
  );
}

export default DestekTaleplerim;
