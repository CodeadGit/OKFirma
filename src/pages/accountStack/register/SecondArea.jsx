import React, { useState } from 'react'
import AddPhoto from "./svg/addPhoto.svg"
import Example from "./svg/exampleLogo.svg"
import { storage } from '../../../firebase/firebase.config'
import {ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { companyTypes } from '../../../components/data/firmTypes'
import { provinces } from '../../../components/data/provinces'


function SecondArea({regForm,setRegForm,error,file,setFile}) {

const [percent,setPercent]=useState(0)
const [age, setAge] = React.useState('');
const [region,setRegion]=useState(["ilçe"])

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
function handleChange(event) {
    setFile(event.target.files[0]);
}


  return (
    <div
    className='inputs'
    >
      <div 
      className='imgContainer'>
        <label htmlFor='photo'>
        <img 
          className={`logodiv ${error&&!file?"red":"valid"}`}
          src={file?URL.createObjectURL(file):AddPhoto} alt=""/>
          <input type="file" id='photo' accept="image/*" 
          onChange={handleChange}
          style={{display:"none"}}/>
        
        </label>
          {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
              
        <img src={Example} alt=""/>  
      </div>
      <div className='zippedArea'>
            <div className="inputRow">
            <input
                type="text"
                className={`input ${error&&!regForm.firmName?"red":"valid"}`}
                value={regForm.firmName}
                autoFocus 
                placeholder='Firma Adı' 
                onChange={(event)=>{setRegForm({...regForm,firmName:event.target.value})}}
                />

                <input
                type="text"
                value={regForm.TCKN}
                className={`input ${error&&!regForm.TCKN?"red":"valid"}`}
                autoFocus 
                placeholder='TCKN/VKN'
                onChange={(event)=>{setRegForm({...regForm,TCKN:event.target.value})}}
                //onChange={(event)=>{setLoginEmail(event.target.value)}}
                />
                  <select
                  className={`input ${error&&!regForm.TCKN?"red":"valid"}`}
                  placeholder='Şirket Türü'
                  onChange={(e)=>setRegForm({...regForm,firmType:e.target.value})}
                  name="cars" id="cars">
                    {companyTypes.map(i=>{
                      return (
                        <option
                        key={i.id}
                        className='selectoption'
                        value={i.label}>{i.label}</option>
                      )
                    })}
                  </select>
                  
                {/* <input
                type="text"
                value={regForm.firmType}
                className={`input ${error&&!regForm.firmType?"red":"valid"}`}
                autoFocus 
                placeholder='Şirket Türü'
                onChange={(event)=>{setRegForm({...regForm,firmType:event.target.value})}}
                //onChange={(event)=>{setLoginEmail(event.target.value)}}
                /> */}
            </div>
                <textarea
                value={regForm.Address}
                placeholder='İş Yeri Adresiniz'
                className={`input ${error&&!regForm.Address?"red":"valid"}`}
                onChange={(event)=>{setRegForm({...regForm,Address:event.target.value})}}
                >

                </textarea>
                <div className="inputRow">
            {/* <input
                type="text"
                className={`input ${error&&!regForm.City?"red":"valid"}`}
                value={regForm.City}
                autoFocus 
                placeholder="İl" 
                onChange={(event)=>{setRegForm({...regForm,City:event.target.value})}}
                /> */}
                <select
                  className={`input ${error&&!regForm.TCKN?"red":"valid"}`}
                  placeholder='Şirket Türü'
                  onChange={(e)=>{setRegForm({...regForm,City:e.target.value})
                  setRegion(provinces[provinces.findIndex(i=>i.city_name===e.target.value)].districts)
                }}
                  name="cars" id="cars">
                    {provinces.map(i=>{
                      return (
                        <option
                        key={i.city_name}
                        className='selectoption'
                        value={i.city_name}>{i.city_name}</option>
                      )
                    })}
                  </select>
                <select
                  className={`input ${error&&!regForm.TCKN?"red":"valid"}`}
                  placeholder='Şirket Türü'
                  defaultValue={regForm.Region}
                  onChange={(e)=>setRegForm({...regForm,Region:e.target.value})}
                  name="cars" id="cars">
                    {region.map(i=>{
                      return (
                        <option
                        key={i}
                        className='selectoption'
                        value={i}>{i}</option>
                      )
                    })}
                  </select>
                {/* <input
                type="text"
                value={regForm.Region}
                className={`input ${error&&!regForm.Region?"red":"valid"}`}
                autoFocus 
                placeholder='İlçe'
                onChange={(event)=>{setRegForm({...regForm,Region:event.target.value})}}
                //onChange={(event)=>{setLoginEmail(event.target.value)}}
                />     */}
                <input
                type="text"
                value={regForm.ZIP}
                className={`input ${error&&!regForm.ZIP?"red":"valid"}`}
                autoFocus 
                placeholder='Posta Kodunuz'
                onChange={(event)=>{setRegForm({...regForm,ZIP:event.target.value})}}
                //onChange={(event)=>{setLoginEmail(event.target.value)}}
                />
            </div>
      </div>  
    </div>
  )
}

export default SecondArea