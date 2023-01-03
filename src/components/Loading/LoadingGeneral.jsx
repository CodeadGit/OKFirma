import React from 'react'
import "./loading.scss"
function LoadingGeneral({title}) {
  return (
    <div className="spinner-container-big">
      <div className="loading-spinner-bigger">
        <div className="loading-spinner-big">
            
        </div>  
      </div>
      <p id='loadingtitle'>{title}</p>
    </div>
  )
}

export default LoadingGeneral