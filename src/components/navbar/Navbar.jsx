import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { auth, db, storage } from '../../firebase/firebase.config'
import "./navbar.scss"
import AddPhoto from "../../pages/accountStack/register/svg/addPhoto.svg"
import { async } from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { AuthenticationContext } from '../../context/authentication.context'
import Widgets from '../widgets/Widgets'
import WidgetNew from './Widget'
import WidgetsContainer from './Widgets'
import "./navbar.scss"
function Navbar() {
  const [file,setFile]=useState("")
  const {user,userData}=useContext(AuthenticationContext)
  const [loadingDeneme,setLoadingDeneme]=useState(false)
  const [className,setClassName]=useState("")
  
  function handleChange(event) {
    setFile(event.target.files[0]);
}
  const uploadPic=async()=>{
    const fileRef=ref(storage,auth.currentUser.uid+".png");
    setLoadingDeneme(true)
    const snapshot=await uploadBytes(fileRef,file);
    const photoURL=getDownloadURL(fileRef)
    photoURL.then(url=>updateProfile(user,{photoURL:url}))

    
    setLoadingDeneme(false)
    alert("Yüklendi")
  }
  let TLLocale = Intl.NumberFormat('tr-TR');
  return (
    
    <div className='navbar'>
      <div className='nav-wrapper'>
      <WidgetsContainer
      className={className}
      setClassName={setClassName}
      />
      {userData&&userData.income&&<div className='income'>
        <span className='income-title'>Elde Edilen Toplam Gelir</span>
        <span className='income-text'>{TLLocale.format(userData.income)} ₺</span></div>}
      </div>
      
    </div>
  )
}

export default Navbar