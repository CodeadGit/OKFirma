import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../context/authentication.context";
import { auth } from "../firebase/firebase.config";
import "./confirm.scss";
import Onay from "./onay.svg";

function Confirmation() {
  const { user, userData } = useContext(AuthenticationContext);
  if (!!user && userData && userData.confirmed) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="confirm">
        <div className="confirmContainer">
          <img src={auth.currentUser?.photoURL} alt="" />
          <strong>{auth.currentUser?.displayName}</strong>
          Bilgilerinizi aldık onay süreciniz devam ediyor
        </div>
        <img className="onay" src={Onay} alt="" />
      </div>
    </>
  );
}

export default Confirmation;
