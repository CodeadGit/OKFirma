import React from 'react'
import Logo from "../logo.svg"
const MyJobTop = ({job}) => {
  return (
    <div
    className='one-job-top'
    >
        <div className="form-logo">
            <img
                src={Logo}
                alt=''
            />
            </div>
        <div className="form-id">{job.id} No'lu {job.mainWish} Teklif Formu</div>
                
    </div>
  )
}

export default MyJobTop