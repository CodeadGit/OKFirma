import React from 'react'
import Path from '../../components/boxes/Path'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import EditPassword from './EditPassword'
import "./settings.scss"

function Settings() {


    const pathData=[
        {text:"Panelim",to:"/",id:"01"},
        {text:"Ayarlar",to:"/ayarlar",id:"02"},
        
    ]
  return (
    <>
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
            <Navbar/>
            <Path children={pathData}/>
            <div className="editContainer">
                <EditPassword/>
            </div>
        </div>
        {/* <RightSideBar/> */}
    </div>

    </>
  )
}

export default Settings