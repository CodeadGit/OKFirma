import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import Home from "../home/Home";
  import Kesifler from "../kesifler/Kesifler";
  import Kesiflerim from "../kesiflerim/Kesiflerim";
  import List from "../list/List";
  import Single from "../single/Single";
  import React, { useContext, useState } from "react";
  import { CloudContext } from "../../context/cloud.context.js";
  import { AuthenticationContext } from "../../context/authentication.context";
  import SingleMyJob from "../single/SingleMyJob";
  import SingleFirm from "../SingleFirm/SingleFirm";
  import New from "../new/New";
  import { userInputs } from "../../formSource";
  import Register from "../accountStack/register/Register";
  import Login from "../accountStack/login/Login";
  import LoadingGeneral from "../../components/Loading/LoadingGeneral";
  import Messages from "../messages/Messages";
  import SupportRequest from "../messages/SupportRequest";
  import LiveSupport from "../messages/LiveSupport";
  import NewSupportRequest from "../messages/NewSupportRequest";
  import MyReaquestScreen from "../messages/MyReaquestScreen";
  import MyFirm from "../MyFirm/MyFirm";
  import Confirmation from "../../Confirmation/Confirmation";
  import Settings from "../settings/Settings";
  import ForgotPassword from "../accountStack/forgot/ForgotPassword";
import { BrowserRouter } from "react-router-dom";
  
  export const AuthStack = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [warnMessage, setWarnMessage] = useState("");
    const { aploading } = useContext(AuthenticationContext);
    const { myPossibleJobs, myJobsData, myProducts } = useContext(CloudContext);
  
    
    return (
        <BrowserRouter>
      <Routes>
       
          <Route
            path="/"
            element={
              <Login
              
              warnMessage={warnMessage}
                setLoading={setLoading}
                setWarnMessage={setWarnMessage}
                setMessage={setMessage}
                message={message}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}/>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="sifremi-unuttum" element={<ForgotPassword />} />
          <Route
            path="Kayit-Ol"
            element={
              <Register
                warnMessage={warnMessage}
                setLoading={setLoading}
                setWarnMessage={setWarnMessage}
                setMessage={setMessage}
                message={message}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
              />
            }
          />
          
      </Routes>
      </BrowserRouter>
    );
  };
  