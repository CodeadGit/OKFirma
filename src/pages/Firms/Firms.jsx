import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { CloudContext } from '../../context/cloud.context'
import "./firms.scss"
function Firms() {

  const {myFirms}=useContext(CloudContext)
  return (
    <div className='firms'>
        <Sidebar/>
        <div className="firmsContainer">
            <Navbar/>
            <Link to="yeni-firma">
            <div className="new">
                yeni ekle
            </div>
            
            </Link>

            {myFirms.length>0&&myFirms.map(i=>{
              return(
                <Link 
                key={i.id}
                to={`${i.name}`}>
                <div>{i.name}</div>
                </Link>
                
              )
            })}

        </div>
    </div>
  )
}

export default Firms