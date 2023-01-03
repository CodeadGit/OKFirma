import React from 'react'
import { NavLink } from 'react-router-dom'
function SideLink({children,to}) {
  return (
    <NavLink to={to} className='sideLink'
    >{children}</NavLink>
  )
}

export default SideLink