import React, { useContext } from "react";
import "./sidebar.scss";
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

  const {toggleNotification,notifications,unreads}=useNotifications();

  const linkList = [
    { 
      img: UserLogo, label: "Panelim", id: "01", to: "/", hasNest: false 
    },
    {
      img: Kesif,
      label: "Keşifler",
      id: "02",
      to: "/",
      hasNest: true,
      subList: [
        {
          img: MiniCircle,
          label: "Keşif Fırsatları",
          id: "08",
          to: "/kesifler",
          hasNest: false,
        },
        {
          img: MiniCircle,
          label: "Keşiflerim",
          id: "09",
          to: "/kesiflerim",
          hasNest: false,
        },
      ],
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
    {
      img: CRM,
      label: "CRM - Çok Yakında",
      id: "05",
      to: "null",
      hasNest: false,
    },
    {
      img: Wallet,
      label: "Finans - Çok Yakında",
      id: "06",
      to: "null",
      hasNest: false,
    },
    {
      img: Depo,
      label: "Depo - Çok Yakında",
      id: "07",
      to: "null",
      hasNest: false,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebarLogoArea">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img id="logo" src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="sidebarInner">
        <div className="sidebarTop">
          <div
            onClick={() => navigate("/firma-bilgilerim")}
            className="sidebarFirmInfo"
          >
            <label>
              <img
                className={`logodiv`}                
                src={user.photoURL ? user.photoURL : AddPhoto}
                alt=""
              />
            </label>
            {Object.keys(userData).length > 0 && (
              <Header id="firmName">
                {userData ? userData.firmName : user?.displayName}
              </Header>
            )}
            {Object.keys(userData).length > 0 && (
              <SubHeader>
                Üye Numarası: {new Date().valueOf().toString().substring(0, 6)}
              </SubHeader>
            )}
          </div>
          <div className="nots-holder">
              <IconButton
                size="large"
                color="primary"
                className="not-icon"
                onClick={toggleNotification}
              >
                <NotificationsNone               
                />
                <span className="count">{unreads.length}</span>
                
              </IconButton>
          </div> 
        </div>
        <div className="sidebarCenter">
          <ul>
            {linkList.map((i) => {
              return (
                <div key={i.id}>
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
                  <hr />
                </div>
              );
            })}
          </ul>
        </div>
        <div className="sidebarBottom">
          <Link to="/ayarlar" className="settings">
            <img src={Settings} className="icon" alt="" />
            Ayarlar
          </Link>
          <div onClick={logout} className="logout">
            <img src={Logout} className="icon" alt="" />
            <SubHeader>Çıkış</SubHeader>
          </div>
        </div>
        <div className="sidebarFooter">
          <MiniSubHeader>© Versiyon 1.1</MiniSubHeader>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
