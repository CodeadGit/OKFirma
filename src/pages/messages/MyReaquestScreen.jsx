import React from 'react'
import { useLocation } from 'react-router-dom'
import Path from '../../components/boxes/Path'
import LiveChat from '../../components/livechat/LiveChat'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import SupportChat from './SupportChat'

function MyReaquestScreen() {
const {state}=useLocation()
const pathData=[
    {text:"Panelim",to:"/",id:"02"},
    {text:"Mesajlarım",to:"/mesajlarim",id:"02"},
    {text:"Destek Taleplerim",to:"/mesajlarim/Destek-Talebi",id:"03"},
    {text:state.id,to:`/mesajlarim/Destek-Talebi`,id:"04"},
]
    return (
    <div className='liveSupport'>
        <Sidebar/>
        <div className="liveSupportContainer">
        <Navbar/>
        <Path children={pathData}/>
        <div className="wrapper">
            <SupportChat item={state} />
        </div>
        </div>
        {/* <RightSideBar/> */}
    </div>
  )
}

export default MyReaquestScreen