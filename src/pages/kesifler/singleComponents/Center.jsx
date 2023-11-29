import { CircularProgress, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PricedTable from './PricedTable'
import OfferedNotes from './OfferedNotes'
import JobNotes from './singleMyJobComponents/JobNotes'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase/firebase.config'

const Center = ({job,products}) => {
  var wishDetailArray=Object.keys(job.wishDetail).sort()

  return (
    <div className="one-job-center">
        <div className="one-job-center-top">
            <div className="one-job-center-top-left">
                <h4>Hizmet İçeriği</h4>
                <Divider/>
                <span>{job.summary}</span>

                {wishDetailArray.map((i,idx)=>{
                  var isMapable=Array.isArray(job.wishDetail[i])
                  return(
                            <>
                            {isMapable?
                            <div
                            key={idx}
                            className="section-individual">
                            <span className='row-title'>{i}</span>
                            <span className='dots'>:</span>
                            <div className='row-text listed'>
                            {job.wishDetail[i].map((inner,idx)=>{
                            return(
                            
                            <span 
                            className="sub-text"
                            key={idx}>{inner.label}</span>
                            )})}
                            </div>
                            
                            </div>
                            :
                            <div
                            key={idx}
                            className="section-individual">

                            <span 
                            className="row-title sub"
                            key={idx}>{job.wishDetail[i].q}</span>
                            <span className='dots'>:</span>
                            <span 
                            className="row-text"
                            key={idx}>{job.wishDetail[i].a}</span>
                            </div>}
                            </>
                        )
                    
                })}
            </div>
            <div className="one-job-center-top-right">
              <div className="one-job-center-top-right-top">
                <h4>Hizmet Genel Bilgileri</h4>
                <Divider/>
                <div className="section-individual">
                  <span className="row-title">Ana Talep</span>
                  <span className="dots">:</span>
                  <span className="row-text">{job.mainWish}</span>
                </div>
                <div className="section-individual">
                  <span className="row-title">Servis Talebi Oluşturma Zamanı</span>
                  <span className="dots">:</span>
                  <span className="row-text">{new Date(job.createdAt.seconds*1000).toLocaleString()}</span>
                </div>
                <div className="section-individual">
                  <span className="row-title">Ana Talep</span>
                  <span className="dots">:</span>
                  <span className="row-text">{job.mainWish}</span>
                </div>
                <div className="section-individual">
                  <span className="row-title">Ana Talep</span>
                  <span className="dots">:</span>
                  <span className="row-text">{job.mainWish}</span>
                </div>
              </div>
              {/* <div className="one-job-center-top-right-bottom">
                <h4>Notlar</h4>
                <Divider/>
              </div> */}
            </div>
        </div>
        <div className="one-job-center-bottom">
            <h3>Keşif Notları</h3>

            <div className="this-products-table">
                      <JobNotes
                          job={job}
                        />
            </div>
        </div>
        <div className="one-job-center-bottom">
            <h3>Parça Listesi</h3>

            <div className="this-products-table">
                <PricedTable 
                  data={products}
                />
            </div>
        </div>
        <div className="one-job-center-bottom">
            <h3>Notlar</h3>

            <div className="this-products-table">
                <OfferedNotes
                  jobDoc={job.doc}
                />
            </div>
        </div>
    </div>
  )
}

export default Center