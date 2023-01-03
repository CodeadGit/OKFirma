import React from 'react'
import { NavLink } from 'react-router-dom'

function Path({children}) {
  return (
    <div className='path'>
        {children.map((i,index)=>{
            return(
              
                <div
                key={i.id}
                className="link"
                >
                <NavLink 
                className="link"
                 to={i.to}>{i.text}</NavLink>
                {index!==children.length-1?">":null}
                </div>
            )
        })}
    </div>
  )
}

export default Path