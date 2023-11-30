import {
  BrowserRouter,
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
import Settings from "../settings/Settings";
import SingleOpportunity from "../kesifler/SingleOpportunity";
import SingleMyJobNew from "../kesifler/SingleMyJob";
import NotificationDrawer from "../../components/sidebar/NotificationDrawer";
import ErrorPage from "../ErrorPage/ErrorPage";

export const VenderStack = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [warnMessage, setWarnMessage] = useState("");
  const { aploading } = useContext(AuthenticationContext);
  const { myPossibleJobs, myJobsData, myProducts } = useContext(CloudContext);

  if (loading | aploading) {
    return <LoadingGeneral title="Kontrol Ediliyor..." />;
  }

  return (
    <BrowserRouter>
      <NotificationDrawer />
      <Routes>
        <Route
          errorElement={<ErrorPage />}
          path="/"
          element={
            <Home setAlertMessage={setAlertMessage} setLoading={setLoading} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route errorElement={<ErrorPage />} path="kesiflerim">
          <Route index element={<Kesiflerim data={myJobsData} />} />
          <Route path=":jobDoc" element={<SingleMyJobNew />} />
        </Route>
        <Route errorElement={<ErrorPage />} path="firma-bilgilerim">
          <Route errorElement={<ErrorPage />} index element={<MyFirm />} />
          <Route path=":userId" element={<SingleFirm />} />
          <Route
            errorElement={<ErrorPage />}
            path="yeni-firma"
            element={<New inputs={userInputs} title="Yeni Firma Ekle" />}
          />
        </Route>
        <Route errorElement={<ErrorPage />} path="kesifler">
          <Route index element={<Kesifler data={myPossibleJobs} />} />
          <Route path=":docRef" element={<SingleOpportunity />} />
          {/* <Route path=":docRef" element={<Single />} /> */}
        </Route>
        <Route errorElement={<ErrorPage />} path="malzemeler">
          <Route index element={<List data={myProducts} />} />
          <Route path=":userId" element={<Single />} />
        </Route>

        <Route errorElement={<ErrorPage />} path="mesajlarim">
          <Route index element={<Messages />} />
          <Route path="Canli-Destek" element={<LiveSupport />} />
          <Route path="Destek-Talebi">
            <Route index element={<SupportRequest />} />
            <Route path=":talepId" element={<MyReaquestScreen />} />
          </Route>
          <Route path="Yeni-Destek-Talebi" element={<NewSupportRequest />} />
          <Route path=":userId" element={<Single />} />
        </Route>
        <Route path="ayarlar" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};
