import React, { useContext } from 'react'
import { CloudContext } from '../../context/cloud.context'
import WidgetItem from './WidgetItem'

function Widgets() {
    const {myJobs,myPossibleJobs,myJobsData,myFirms}=useContext(CloudContext)
  return (
    <div className='widgetContainer'>
        <WidgetItem list={myJobsData} type="user"/>
        <WidgetItem list={myPossibleJobs} type="explore"/>
        <WidgetItem list={myFirms} type="firm"/>
    </div>
  )
}

export default Widgets