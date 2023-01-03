import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React ,{useEffect, useState}from 'react'
import { NavLink } from 'react-router-dom'
import Datatable from '../../components/datatable/Datatable'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import Sidebar from '../../components/sidebar/Sidebar'
import { auth, db } from '../../firebase/firebase.config'
import DatatableNew from './DatatableNew'
import "./support.scss"
import MessageIcon from "../../components/sidebar/svg/messages.svg"
import SubHeader from '../../components/text/SubHeader'
import Path from '../../components/boxes/Path'
import { useContext } from 'react'
import { AuthenticationContext } from '../../context/authentication.context'

function SupportRequest() {
  const [myRequests,setMyRequests]=useState([])
  const {user}=useContext(AuthenticationContext)
  const getMessages=()=>{

    
    const msgRef=collection(db,"FirmRequests")
    const q=query(msgRef,where("from","==",user?.uid||"bekleniyor"))

    onSnapshot(q,orderBy("createdAt","asc"),querySnapshot=>{
        let msgs=[]
        querySnapshot.forEach(doc=>{
            msgs.push(doc.data())
        })
        
      
        setMyRequests(msgs)
    })
}
    useEffect(()=>{
      getMessages()
    },[])

  // const myRequests=[
  //   {id:new Date().valueOf(),createdAt:new Date(),statue:0,lastResponse:"Faruk Yılmaz",subject:"Kazan",priority:0,file:"",summary:"Kazan takamadım",body:[{text:"Böle işverenlik olur mu hemşerim kimse cevap vermiyor",from:auth.currentUser.displayName,createdAt:new Date(),media:""}],},
  //   {id:new Date().valueOf(),createdAt:new Date(),statue:0,lastResponse:"Faruk Yılmaz",subject:"Kazan",priority:0,file:"",summary:"Kazan takamadım",body:[{text:"Böle işverenlik olur mu hemşerim kimse cevap vermiyor",from:auth.currentUser.displayName,createdAt:new Date(),media:""}],},
  //   {id:new Date().valueOf(),createdAt:new Date(),statue:0,lastResponse:"Faruk Yılmaz",subject:"Kazan",priority:0,file:"",summary:"Kazan takamadım",body:[{text:"Böle işverenlik olur mu hemşerim kimse cevap vermiyor",from:auth.currentUser.displayName,createdAt:new Date(),media:""}],},
  // ]
  const statues=[
    "Cevap Bekliyor",
    "Cevaplandı",
    "Kapandı",
  ]
  const pathData=[
    {text:"Panelim",to:"/",id:"01"},
    {text:"Mesajlarım",to:"/mesajlarim",id:"02"},
    {text:"Destek Taleplerim",to:"/mesajlarim/Destek-Talebi",id:"03"},
]

  myRequests.sort((a,b) => (b.createdAt.seconds) -(a.createdAt.seconds))
  return (
    <>
      <div className='support'>
        <Sidebar/>
        <div className="supportContainer">
          <Navbar/>
          <Path children={pathData}/>
          <div className="request-header-bar">
            <div className="left">
            <img src={MessageIcon} alt="" />
            <h4>Destek Talepleriniz</h4>
            </div>
            <div className="right">
              {myRequests.length>0?<NavLink 
              className="add-button"
              to="/mesajlarim/Yeni-Destek-Talebi">Yeni Talep Oluştur</NavLink>:null}
            </div>
          </div>
          <DatatableNew data={myRequests} statues={statues}/>
        </div>
        {/* <RightSideBar/> */}
      </div>

    </>
    
  )
}

export default SupportRequest