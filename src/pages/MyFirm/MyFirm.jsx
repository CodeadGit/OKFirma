import React from 'react'
import Path from '../../components/boxes/Path'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import EditForm from './EditForm'
import "./myFirm.scss"

function MyFirm() {
    const pathData=[
        {text:"Panelim",to:"/",id:"01"},
        {text:"Firma Bilgilerim",to:"/firma-bilgilerim",id:"02"},
     ]


  return (
    <>
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
            <Navbar/>
            <Path children={pathData}/>
                <div className="editContainer">
                    <EditForm/>
                </div>
            </div>
            {/* <RightSideBar/> */}
        </div>

    </>
    
  )
}

export default MyFirm