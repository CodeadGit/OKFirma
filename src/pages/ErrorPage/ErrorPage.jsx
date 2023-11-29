import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { NavLink } from 'react-router-dom'
import { Home } from '@mui/icons-material'

const ErrorPage = () => {
  return (
    <>
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h3>Bir hata meydana geldi</h3>
        <NavLink
            to={"/"}
        >
            <Home/>

        </NavLink>
        </div>
      {/* <RightSideBar/> */}
    </div>
  </>
  )
}

export default ErrorPage