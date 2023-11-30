import { Alert } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import NewSupport from "./NewSupport";
import "./newSupport.scss";
import Navigation from "../../components/boxes/Navigation";

function NewSupportRequest() {

  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  
  const pathData = [
    { text: "Panelim", to: "/", id: "02" },
    { text: "Mesajlarım", to: "/mesajlarim", id: "02" },
    { text: "Yeni Destek Talebi", to: "/mesajlarim/Yeni-Destek-Talebi", id: "03" },   
  ];
  
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          {alert ? (
            <Alert
              onClick={() => setAlert("")}
              className="alert"
              severity="success"
            >
              {alert}
              <button className="alert-button">Tamam</button>
            </Alert>
          ) : null}
          {error ? (
            <Alert
              className="alert"
              onClick={() => setError("")}
              severity="error"
            >
              {error}
              <button className="alert-button">Tamam</button>
            </Alert>
          ) : null}
          <Navbar />
          <Navigation children={pathData} />
          <NewSupport setAlert={setAlert} setError={setError} />
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default NewSupportRequest;
