import React from 'react'
import "./loading.scss"
function Loading({title}) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <p>{title}</p>
    </div>
  )
}

export default Loading