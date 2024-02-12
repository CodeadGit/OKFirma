import React, { useContext } from "react";
import "./SidebarBottom.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/authentication.context";
import AddPhoto from "../../pages/accountStack/register/svg/addPhoto.svg";
//svgs
import UserLogo from "./svg/user.svg";
import Depo from "./svg/depo.svg";
import Kesif from "./svg/kesif.svg";
import MiniCircle from "./svg/minicircle.svg";
import Logo from "../../pages/accountStack/login/logo.svg";
import Mesajlar from "./svg/messages.svg";
import Firmalar from "./svg/firm.svg";
import CRM from "./svg/crm.svg";
import Wallet from "./svg/wallet.svg";
import Settings from "./svg/settings.svg";
import Logout from "./svg/logout.svg";
import Header from "../text/Header";
import SubHeader from "../text/SubHeader";
import MiniSubHeader from "../text/MiniSubHeader";
import { NotAccessible } from "@mui/icons-material";
import { NotificationAdd } from "@mui/icons-material";
import { CircleNotifications } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";
import { useNotifications } from "../../context/notification.context";

function Sidebar() {
  const { logout, user, setUser, userData } = useContext(AuthenticationContext);

  const { toggleNotification, notifications, unreads } = useNotifications();

  const linkList = [
    {
      img: UserLogo,
      label: "Panelim",
      id: "01",
      to: "/",
      hasNest: false,
    },
    {
      img: Kesif,
      label: "Keşifler",
      id: "02",
      to: "/kesifler",
      hasNest: true,
      subList: [],
    },
    {
      img: Mesajlar,
      label: "Mesajlarım",
      id: "03",
      to: "/mesajlarim",
      hasNest: false,
    },
    {
      img: Firmalar,
      label: "Firma Bilgileri",
      id: "04",
      to: "/firma-bilgilerim",
      hasNest: false,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="sidebarr">

          <ul>
            {linkList.map((i) => {
              return (
                <div key={i.id} className="renk">
                  <li>
                    <NavLink
                      to={i.to}
                      className={({ isActive }) =>
                        isActive
                          ? "sidelink active"
                          : "sidelink" && i.to == "null"
                          ? "disableLink"
                          : "sidelink"
                      }
                    >
                      <img src={i.img} alt="" className="icon" />
                      <span>{i.label}</span>
                    </NavLink>
                    <div className={i.hasNest && "subLinks"}>
                      {i.hasNest &&
                        i.subList.map((i) => {
                          return (
                            <NavLink
                              key={i.id}
                              to={i.to}
                              className={({ isActive }) =>
                                isActive
                                  ? "sidelinkmini active"
                                  : "sidelinkmini"
                              }
                            >
                              <img src={i.img} className="iconmini" alt="" />
                              <span>{i.label}</span>
                            </NavLink>
                          );
                        })}
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        
    </div>
  );
}

export default Sidebar;
