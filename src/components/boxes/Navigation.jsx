import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ children }) {
  return (
    <div className="navigation">
      {children.map((i, index) => {
        return (
          <div key={i.id} className="link">
            <NavLink className="link" to={i.to}>
              {i.text}
            </NavLink>
            {index !== children.length - 1 ? " >" : null}
          </div>
        );
      })}
    </div>
  );
}

export default Navigation;
