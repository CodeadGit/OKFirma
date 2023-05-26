import React from "react";
import "./navbar.scss";
import WidgetsContainer from "./Widgets";
import DestekTaleplerim from "./DestekTaleplerim";

function Navbar() {
  return (
    <div className="navbar">
      <div className="shortLinkCards">
        <WidgetsContainer />
      </div>
      <div className="helpRequests">
        <DestekTaleplerim />
      </div>
    </div>
  );
}

export default Navbar;
