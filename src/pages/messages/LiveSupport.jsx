import React from 'react'
import Path from '../../components/boxes/Path'
import Footer from '../../components/footer/Footer'
import LiveChat from '../../components/livechat/LiveChat'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./liveSupport.scss"


function LiveSupport() {

    const pathData=[
        {text:"Panelim",to:"/",id:"01"},
        {text:"Mesajlarım",to:"/mesajlarim",id:"02"},
        {text:"Canlı Destek",to:"/mesajlarim/Canli-Destek",id:"03"},
    ]
    
  return (
            <>
                <div className='liveSupport'>
                    <Sidebar/>
                    <div className="liveSupportContainer">
                        <Navbar/>
                        <Path children={pathData}/>
                        <div className="wrapper">
                            <LiveChat/>
                        </div>
                    </div>
                    {/* <RightSideBar/> */}
                </div>
              
            </>
    
  )
}

export default LiveSupport