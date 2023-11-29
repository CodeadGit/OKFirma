import { Button, Drawer, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNotifications } from '../../context/notification.context'
import { Close } from '@mui/icons-material'
import "./drawer.scss"
import { Notifications } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase.config'
const NotificationDrawer = () => {
    
    const {
        notifyOpen,
        toggleNotification,
        handleCloseNotifyDrawer,
        handleRefreshNotify,
        notifications
        }=useNotifications()

        useEffect(()=>{
            if(notifyOpen){
                handleRefreshNotify()            
            }
        },[notifyOpen])

        const updateDoc_closeDrawer=async(item)=>{
            var referance=doc(db,"Users",auth.currentUser.uid,"Notifications",item.id)
            try {
                updateDoc(referance,{
                    readen:true
                })
                handleCloseNotifyDrawer()
            } catch (error) {
                console.log(error)
            }
        }
  return (
    
          <Drawer
            PaperProps={{
                sx: { width: "90%",maxWidth:600},
              }}
            anchor={"right"}
            open={notifyOpen}
            onClose={handleCloseNotifyDrawer}
          >
            <div className="drawer">
                <div className="drawer-top">
                <IconButton
                    className='close-drawer'
                    onClick={handleCloseNotifyDrawer}
                >
                    <Close/>
                </IconButton>
                <Notifications className='Notifications-icon'/>
                <h4>Bildirimler</h4>
                </div>
                <div className="drawer-center">
                    <div className="notifications">
                        {notifications.map((i,idx)=>{
                            return(
                                <NavLink
                                    onClick={()=>updateDoc_closeDrawer(i)}
                                    className={`notification ${i.readen?"read":"unread"}`}
                                    key={idx}
                                    to={`kesiflerim/${i.relatedDoc}`}
                                >
                                    <span>{i.what}</span>
                                    <small><i>{new Date(i.createdAt.seconds*1000).toLocaleString()}</i></small>
                                
                                </NavLink>
                            )
                        })}
                        
                        
                    </div>
                    
                </div>
                <div className="drawer-footer">
                    <a href='https://onlinekesif.com/' target='_blank' rel="noreferrer" >onlinekesif.com</a>
                </div>
            </div>
            
            
          </Drawer>
    )
}

export default NotificationDrawer