import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

import { db } from '../../../../firebase/firebase.config'


const JobNotes = ({job}) => {
    const [notes,setNotes]=useState([])
    const [loading,setLoading]=useState(true)

   
    useEffect(()=>{
        let controller = new AbortController();
        (async () => {
            const q = query(collection(db, "Jobs",job.doc,"Notes")
            , orderBy("createdAt","asc")
            )       
            const jobgetting=onSnapshot(q,(snap)=>{
            var jobs=[];
            if(!snap.empty){
                snap.forEach(doc=>{
                    if(doc.data().readers.includes("firm")){
                        jobs.unshift({...doc.data(),doc:doc.id})
                        
                    }
                    })
                    setNotes(jobs)
            }
            setLoading(false) 
                               
       })
            return ()=>jobgetting()
        })();
          return () => controller?.abort();

    },[job])

    


      
      
    if(loading){
        return(
            <CircularProgress/>
        )
    }

      
  return (
        <div 
        className={`saved-notes`}
        >
            {notes.length>0?notes?.map((i,idx)=>{
                return(
                    <div className="note-row">
                        <span>{idx+1}.</span>
                        <span key={idx}>{i.note}</span>
                    </div>
                )
            }):<span>Herhangi bir not bulunmamaktadır.</span>}
        </div>
            
            )
}

export default JobNotes