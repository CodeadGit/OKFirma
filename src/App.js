import { BrowserRouter as Router } from "react-router-dom";
import { VenderStack } from "./pages/renderStack";
import { createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "./context/authentication.context";
import Home from "./pages/home/Home";
import LoadingGeneral from "./components/Loading/LoadingGeneral";
import { AuthStack } from "./pages/renderStack/AuthStack";
import Confirmation from "./Confirmation/Confirmation";
import { ConfirmationStack } from "./pages/renderStack/ConfirmationStack";

function App() {
  const { user, apploading, userData } = useContext(AuthenticationContext);

  // console.log(user);
  // console.log(userData);
  // console.log("app", apploading);

  return (
    <>
      {apploading || (!userData && user) ? (
        <LoadingGeneral title="yükleniyor" />
      ) : !user ? (
        <AuthStack />
      ) : userData.confirmed ? (
        <VenderStack />
      ) : (
        <ConfirmationStack />
      )}
    </>
  );
}

export default App;

{
  /* <>
      {apploading||(!userData&&user)
      ?<LoadingGeneral title="yükleniyor" />
      
      :userData.confirmed
        ?user
          ?<VenderStack />
            :<AuthStack/>
        :<LoadingGeneral title="kontrol ediliyor" />
              
      }
    </> */
}
