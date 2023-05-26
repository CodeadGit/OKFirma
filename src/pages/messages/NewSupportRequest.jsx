import { Alert } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import NewSupport from "./NewSupport";
import "./newSupport.scss";

function NewSupportRequest() {
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <div className="newSupport">
        <Sidebar />
        <div className="newSupportContainer">
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
          <NewSupport setAlert={setAlert} setError={setError} />
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default NewSupportRequest;
