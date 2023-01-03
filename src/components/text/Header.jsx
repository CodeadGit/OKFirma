import React from 'react'

function Header({children}) {
  return (
    <h3 className='headerText'
    >{children}</h3>
  )
}

export default Header