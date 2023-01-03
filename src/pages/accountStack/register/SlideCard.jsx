import React, { useState } from 'react'
import "./register.scss"
function SlideCard({item,regForm,setRegForm}) {

  
  

  const handleDecision=(item)=>{
    if(regForm.fields.includes(item.title)){
        var newArray=regForm.fields.filter(i=>i!==item.title)
        setRegForm({...regForm,fields:newArray})
        
    }
    else{
        setRegForm({...regForm,fields:[...regForm.fields,item.title]})
        
    }
  }
    return (
    <div 
        className={`slideItem ${regForm.fields.includes(item.title)?`selected`:`notselected`}`}
        onClick={()=>{
            handleDecision(item)
            }
        }
        >
                <h3>{item.title}</h3>
                <h6>{item.body}</h6>
    </div>
  )
}

export default SlideCard