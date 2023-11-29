import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AuthenticationContext } from "./authentication.context";
import beep from "../data/beep.mp3"
const NotificationContext=createContext();

const NotificationProvider=({children})=>{
    const {user}=useContext(AuthenticationContext)
    const [notifyOpen,setNotifyOpen]=useState(false)
    const [notifications,setNotifications]=useState([])
    const [unreads,setUnreads]=useState(0)
    const [notificationsLoading,setNotificationsLoading]=useState(true)
    const [shouldPlaySound, setShouldPlaySound] = useState(false);
    const [refreshed, setRefreshed] = useState(false);

    const handleRefreshNotify=()=>{
        setRefreshed(pre=>!pre)
    }

    const toggleNotification=()=>{
        setNotifyOpen(pre=>!pre)
    }

    const handleCloseNotifyDrawer=()=>{
        setNotifyOpen(false)
    }

    useEffect(()=>{

        if(user){
            let controller = new AbortController();

            (async () => {
                const q = query(collection(db,"Users",user.uid,"Notifications")
                , orderBy("createdAt","desc")
                )       
                const jobgetting=onSnapshot(q,(snap)=>{
                var jobs=[];
                var unreads=[]
                if(!snap.empty){
                    snap.forEach(doc=>{
                        if(!doc.data().readen){
                            unreads.push(doc.id)
                        }
                        jobs.push({...doc.data(),id:doc.id})
                        })
                    setNotifications(jobs)
                    setUnreads(unreads)
                    setNotificationsLoading(false)    
                }
                                             
                    })
                return ()=>jobgetting()
            })();
              return () => {
                controller?.abort()
                
            };
        }

       

    },[user,refreshed])

    return(
        <NotificationContext.Provider
            value={{
                notifyOpen,
                toggleNotification,
                handleCloseNotifyDrawer,
                notifications,
                notificationsLoading,
                unreads,
                handleRefreshNotify
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

const useNotifications=()=>{
    const context=useContext(NotificationContext)
    return context
}

export { NotificationProvider, useNotifications}