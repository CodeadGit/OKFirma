import React, { useContext, useState } from "react";
import "./sidebar.scss";

import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/authentication.context";

import AddPhoto from "../../pages/accountStack/register/svg/addPhoto.svg";
//svgs
import UserLogo from "./svg/user.svg";
import Circle from "./svg/circle.svg";
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

function Sidebar({ setLoading }) {
  const { logout, user, userData } = useContext(AuthenticationContext);

  const linkList = [
    { img: UserLogo, label: "Panelim", id: "01", to: "/", hasNest: false },
    {
      img: Circle,
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
      hasNest: true,
      subList: [
        {
          img: MiniCircle,
          label: "Canlı Destek",
          id: "10",
          to: "/mesajlarim/Canli-Destek",
          hasNest: false,
        },
        {
          img: MiniCircle,
          label: "Destek Talebi",
          id: "11",
          to: "/mesajlarim/Destek-Talebi",
          hasNest: false,
        },
      ],
    },
    {
      img: Firmalar,
      label: "Firma Bilgileri",
      id: "04",
      to: "/firma-bilgilerim",
      hasNest: false,
    },
    { img: CRM, label: "CRM - Çok Yakında", id: "05", to: "/", hasNest: false },
    {
      img: Wallet,
      label: "Finans - Çok Yakında",
      id: "06",
      to: "/",
      hasNest: false,
    },
    {
      img: Firmalar,
      label: "Depo - Çok Yakında",
      id: "07",
      to: "/",
      hasNest: false,
    },
  ];
  const bottomList = [
    // {img:Kalite,label:"Kalite Puanı",id:"01",to:"/",hasNest:false},
    {
      img: Settings,
      label: "Ayarlar",
      id: "02",
      to: "/ayarlar",
      hasNest: true,
      subList: [
        {
          img: MiniCircle,
          label: "Güvenlik",
          id: "08",
          to: "/ayarlar",
          hasNest: false,
        },
      ],
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
                        isActive ? "sidelink active" : "sidelink"
                      }
                    >
                      <img src={i.img} alt="" className="icon" />
                      <span>{i.label}</span>
                    </NavLink>
                    {i.hasNest &&
                      i.subList.map((i) => {
                        return (
                          <NavLink
                            key={i.id}
                            to={i.to}
                            className={({ isActive }) =>
                              isActive ? "sidelinkmini active" : "sidelinkmini"
                            }
                          >
                            <img src={i.img} className="iconmini" alt="" />
                            <span>{i.label}</span>
                          </NavLink>
                        );
                      })}
                  </li>
                  <hr></hr>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="sidebarBottom">
          <ul>
            {bottomList.map((i) => {
              return (
                <div key={i.id}>
                  <li>
                    <NavLink
                      to={i.to}
                      className={({ isActive }) =>
                        isActive ? "sidelink active" : "sidelink"
                      }
                    >
                      <img alt="" src={i.img} className="icon" />
                      <span>{i.label}</span>
                    </NavLink>
                    {i.hasNest &&
                      i.subList.map((i) => {
                        return (
                          <NavLink
                            key={i.id}
                            to={i.to}
                            className={({ isActive }) =>
                              isActive ? "sidelinkmini active" : "sidelinkmini"
                            }
                          >
                            <img src={i.img} alt="" className="iconmini" />
                            <span>{i.label}</span>
                          </NavLink>
                        );
                      })}
                  </li>
                  <hr></hr>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="sidebarFooter">
          <MiniSubHeader>© Versiyon 1.1</MiniSubHeader>
          <div onClick={() => logout(navigate)} className="logout">
            <SubHeader>Çıkış</SubHeader>
            <img src={Logout} className="icon" alt="" />
          </div>
        </div>
      </div>

      {/* <div className="sideBarinner">
        
            <div className="arrow-right"></div>
        
            <div className="top">
            <Link to="/" style={{textDecoration:"none"}}>
                <img id="logo"src={Logo} alt="logo"/>
            </Link>
            </div>
            <div className="center">

                <ul>
                    {linkList.map(i=>{
                        return(
                        <div
                        key={i.id}
                        >
                            <li>
                                <NavLink
                                
                                to={i.to}
                                className={({ isActive }) =>isActive ? "sidelink active" : "sidelink"}
                                >
                                    <img src={i.img} 
                                    alt=""
                                    className='icon'/>
                                            <span>{i.label}</span>
                                </NavLink>
                                {i.hasNest&&i.subList.map(i=>{
                                    return(
                                        <NavLink
                                            key={i.id}
                                            to={i.to}
                                            className={({ isActive }) =>isActive ? "sidelinkmini active" : "sidelinkmini"}
                                        >
                                            <img src={i.img} className='iconmini'
                                            alt=''
                                            />
                                            <span>{i.label}</span>
                                        </NavLink>
                                    )
                                })}
                            </li>
                            <hr></hr>
                        </div>
                        )
                    })}
                </ul>
            </div>
            <div className="bottom">
           
            <ul>
                    {bottomList.map(i=>{
                        return(<div
                            key={i.id}
                        >
                            <li
                            
                            >
                                <NavLink
                                
                                to={i.to}
                                className={({ isActive }) =>isActive ? "sidelink active" : "sidelink"}
                                >
                                    <img alt='' src={i.img} className='icon'/>
                                            <span>{i.label}</span>
                                </NavLink>
                                {i.hasNest&&i.subList.map(i=>{
                                    return(
                                        <NavLink
                                            key={i.id}
                                            to={i.to}
                                            className={({ isActive }) =>isActive ? "sidelinkmini active" : "sidelinkmini"}
                                        >
                                            <img src={i.img}
                                            alt=""
                                            className='iconmini'/>
                                            <span>{i.label}</span>
                                        </NavLink>
                                    )
                                })}
                            </li>
                            <hr></hr>
                        </div>
                        )
                    })}
            </ul>
           
            
                
                
            </div>
            
            <div className="bottom-bottom">
                <MiniSubHeader>© Versiyon 1.1</MiniSubHeader>
                <div 
                onClick={()=>logout(navigate)}
                className="logout">
                    <SubHeader>Çıkış</SubHeader>
                    <img src={Logout} className="icon" alt=""/>
                </div>
                

            </div>
            
        </div> */}
    </div>
  );
}

export default Sidebar;

// <li>
// <NavLink
// to="/"
// className={({ isActive }) =>isActive ? "sidelink active" : "sidelink"}
// >

//         <img src={UserLogo} className='icon'/>
//         <span className='sidelinktitle'>Panelim</span>

// </NavLink>
// </li>
// <hr></hr>

//     <li className='haslist'>
//     <NavLink to="/kesiflerim"
//         activeClassName="sidelink active"
//         // className={({ isActive }) =>isActive ? "sidelink active" : "sidelink"}
//         >
//                 <img src={Circle} className='icon'/>
//                 <span>Keşifler</span>
//         </NavLink>

//     </li>

//     <li className='listinlist'>
//         <NavLink to="/kesiflerim"
//             //activeClassName="activeLink"
//             className={({ isActive }) =>isActive ? "activeLinkinList" : "linkinlist"}
//             >
//             <img src={MiniCircle} className='icon'/>
//             <span>Keşifler</span>
//         </NavLink>
//     </li>

// <hr></hr>

//     <Link to="/users" style={{textDecoration:"none"}}>
//         <li>
//             <GroupIcon className='icon'/>
//             <span>Mesajlar</span>
//         </li>
//     </Link>
//     <Link to="/malzemeler" style={{textDecoration:"none"}}>
//     <li>
//         <InventoryIcon className='icon'/>
//         <span>Malzemelerim</span></li>
//     </Link>

//     <Link to="/kesiflerim" style={{textDecoration:"none"}}>
//     <li>
//         <ExploreIcon className='icon'/>
//         <span>Keşiflerim</span>
//         <div className="counter">2</div>
//     </li>
//     </Link>
//     <Link to="/firmalarim" style={{textDecoration:"none"}}>
//     <li>
//         <ExploreIcon className='icon'/>
//         <span>Firmalarım</span>
//         <div className="counter">2</div>
//     </li>
//     </Link>
//     <li>
//         <StarsIcon className='icon'/>
//         <span>Kalite Puanı</span>
//     </li>
