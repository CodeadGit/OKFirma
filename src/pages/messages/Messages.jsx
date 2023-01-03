import React from 'react'
import { NavLink } from 'react-router-dom'
import Path from '../../components/boxes/Path'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import LiveChatPhoto from "./svg/liveChat.svg"
import SupportChatPhoto from "./svg/supportMesaj.svg"
function Messages() {

  const pathData=[
    {text:"Panelim",to:"/",id:"01"},
    {text:"Mesajlarım",to:"/mesajlarim",id:"02"},
]

  return (
    <>

    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <Path children={pathData}/>
        <div className="links">
          <div className="left">
          <NavLink
            className="bigLink"
            to="/mesajlarim/Canli-Destek"
            >
              <img src={LiveChatPhoto}  alt=""/>
              Canlı Destek
            </NavLink>
            
          </div>
          <div className="right">
            <NavLink
              className="bigLink"
              to="/mesajlarim/Destek-Talebi"
              >
              <img src={SupportChatPhoto}  alt=""/>
              Destek Talebi
            </NavLink>
          </div>
            
        </div>
      </div>
      {/* <RightSideBar/> */}
    </div>
    
    </>
    
  )
}

export default Messages