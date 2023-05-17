import React, { useContext } from 'react'
import { CloudContext } from '../../context/cloud.context'
import "./home.scss"
import RelatedJobCard from './relatedJobCard/RelatedJobCard'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import List from '../list/List'
import Datatable from '../../components/datatable/Datatable'

import { AuthenticationContext } from '../../context/authentication.context'
import LoadingGeneral from '../../components/Loading/LoadingGeneral'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Footer from '../../components/footer/Footer'
import Path from '../../components/boxes/Path'
import Empty from "./svg/empty.svg"
import { Navigate, NavLink } from 'react-router-dom'
import { useEffect } from 'react'


function Home({setLoading,setAlertMessage}) {
    const {myJobs,myPossibleJobs,myJobsData}=useContext(CloudContext)
    const {userData,user}=useContext(AuthenticationContext)

    // if(Object.keys(userData).length<1)
    // return <LoadingGeneral title="ayarlar yükleniyor"/>

    const pathData=[
      {text:"Panelim",to:"/",id:"01"},
      
  ]
  window.history.pushState({}, '', `/`)
 
  if((!user|!userData?.firm)){
    return <Navigate to="giris-yap"/>
  }

  if(!!user&&userData&&!userData.confirmed){
    return <Navigate to="onay"/>
  }


  return (
    <>
    <div className='home'>
        <Sidebar setLoading={setLoading}/>
        {/* <div className="homeContainer">
           <Navbar/>
           <Path children={pathData}/>
           
           {myJobsData?.length>0?
           <Datatable data={myJobsData}/>
           :
           <div className='empty'>
           <img src={Empty} alt="" />

           <NavLink 
           to="/kesifler"
           className="button">Keşiflere Git</NavLink>
           </div>
           }
            
        </div> */}
        {/* <RightSideBar/> */}
        
        
    </div>
   
    </>
  )
}

export default Home