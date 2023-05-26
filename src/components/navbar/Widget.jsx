import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

function WidgetNew({ item }) {
  return (
    <NavLink
      to={item.link}
      className={({ isActive }) => (isActive ? "activeCard" : "card")}
    >
      <div className="cardInner">
        <div className="cardLeft">
          <img src={item.svg} alt="" />
        </div>
        <div className="cardText">
          <div className="cardTop">{item.label}</div>
          <div className="cardBottom">
            <h2 id="widgetinfo">{item.render}</h2>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default WidgetNew;
