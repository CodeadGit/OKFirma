import React, { useContext, useState } from 'react'
import "./new.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { AuthenticationContext } from '../../context/authentication.context';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';



function New({inputs,title}) {
  const [file,setFile]=useState("")
  const [uploading,setUploading]=useState(false)
  const {user}=useContext(AuthenticationContext)
  const [firmData,setFirmData]=useState({
    name:"",
    img:file,
    id:Math.random().toString(16).substring(3,7),
    forms:[],
    email:"",
    address:"",
    city:"",
    phone:"",
    field:"",
    holder:user.uid
  })


  const handleChange=(e,item)=>{
    setFirmData({...firmData,[item.state]:e.target.value})
  }

const navigate=useNavigate()
  const handleSubmit=async () => {
    
     setUploading(true)
     const docRef = collection(db, "ClientsOfFirms");   
     await addDoc(docRef,firmData)  
     .then(()=>setUploading(false))
     .finally(()=>alert("Tamamdır.Firma Bilgilerin Yüklendi"))
      .then(()=>navigate("/Firmalarim"))
       .catch(err=>alert(err+"Bir hata meydana geldi."))
     
   }
  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1 className="title">{title}</h1>
        </div>
        <div className="bottom">
            <form
            onSubmit={handleSubmit}
            >
              
              {inputs.map(i=>(
                <div className="formInput" key={i.id}>
                <label>{i.label}</label>
                <input type={i.type} 
                onChange={(e)=>handleChange(e,i)}
                placeholder={i.placeholder}/>
              </div>
              ))}
              <button type='submit'>Kaydet</button>
            </form>
          
        </div>
      </div>
    </div>
  )
}

export default New