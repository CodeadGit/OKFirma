import React, { useContext, useState } from 'react'
import "./navbar.scss"
import Note from "./svg/note.svg"
import NoteBlack from "./svg/noteBlack.svg"
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function WidgetNew({item,
  className,setClassName
 
}) {
  const handleClass=()=>{
    return className===item.id
}


    
let navigate=useNavigate()
  return (
    <div
    className="card"
    onClick={()=>{
      setClassName(item.id)
              if(item.linkable){
                  
                  navigate(`${item.link}`)
            }
          }
        }
    >
          <div
          //to={item.link}
          className={`layer-top ${handleClass()&&`selected`} ${item.full}`}
          >

            {item.full&&
            <div className={`note_container ${handleClass()&&`selected`}`}>
                <img src={handleClass()?NoteBlack:Note} alt="" />
            </div>
}
            <div className={item.className}>
                <img src={handleClass()?item.altsvg:item.svg} 
                className="widgetimg"
                alt=""/>
                <h2 id='widgetinfo'>{item.render}</h2>
            </div>         
            <div className={`label ${item.style}`}>{item.label}</div>
          </div>
          <div className="layer-center"></div>
          <div className="layer-bottom"></div>
        </div>
  )
}

export default WidgetNew