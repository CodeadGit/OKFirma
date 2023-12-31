import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthenticationProvider } from "./context/authentication.context";
import { CloudContextProvider } from "./context/cloud.context";
import Footer from "./components/footer/Footer";
import { SupportContextProvider } from "./context/supportContext";
import { UsefulApiProvider } from "./context/api.context";
import { OfferProvider } from "./context/offer.context";
import { NotificationProvider } from "./context/notification.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <CloudContextProvider>
        <SupportContextProvider>
          <UsefulApiProvider>
            <OfferProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </OfferProvider>
          </UsefulApiProvider>
        </SupportContextProvider>
      </CloudContextProvider>
    </AuthenticationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
