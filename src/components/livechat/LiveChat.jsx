import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState,useRef, useContext } from 'react'
import { auth, db, storage } from '../../firebase/firebase.config'
import "./livechat.scss"
import Logo from "../../pages/accountStack/login/logo.svg"
import SentBox from '../boxes/SentBox'
import Attach from "./svg/attachment.svg"
import InComeBox from '../boxes/InComeBox'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Message from './Message'
import {useNavigate} from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
import { AuthenticationContext } from '../../context/authentication.context'


function LiveChat() {
  const {user}=useContext(AuthenticationContext)
    const [chat,setChat]=useState("")
    const [text,setText]=useState("")
    const [img,setImg]=useState("")
    const [messages,setMessages]=useState([])
  

    const navigate=useNavigate()
    const user1=user.uid;
    const getMessages=()=>{

      const user2="Online_Keşif";
      const id=user1>user2?`${user1+user2}`:`${user2+user1}`;
      const msgRef=collection(db,"messages",id,"chat")
      const q=query(msgRef,orderBy("createdAt","asc"))

      onSnapshot(q,querySnapshot=>{
          let msgs=[]
          querySnapshot.forEach(doc=>{
              msgs.push(doc.data())
          })
          setMessages(msgs)
      })

}
      useEffect(()=>{
        getMessages()
      },[])


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const user2="Online_Keşif";
    const id=user1>user2?`${user1+user2}`:`${user2+user1}`

    let url;
    if(img){
        const imgRef=ref(storage,`chat/${new Date().getTime()}`)
        const snap=await uploadBytes(imgRef,img)
        const dlurl=await getDownloadURL(ref(storage,snap.ref.fullPath))
        url=dlurl;

    }
    
    await addDoc(collection(db,"messages",id,"chat"),{
        text:text,
        from:user1,
        to:user2,
        createdAt:Timestamp.fromDate(new Date()),
        media:url||"",
        active:true
    })
   
  
    await setDoc(doc(db,"lastMsg",id),{
        text:text,
        from:user1,
        to:user2,
        createdAt:Timestamp.fromDate(new Date()),
        media:url||"",
        unread:true,
    })
    .then(()=>setText(""))
    .then(()=>setImg(""))
}

const handleEnding=async()=>{
  const user2="Online_Keşif";
    const id=user1+user2

    await addDoc(collection(db,"messages",id,"chat"),{
      text:"",
      from:user1,
      to:user2,
      createdAt:Timestamp.fromDate(new Date()),
      media:"",
      active:false
  })
}

  

    return (
          <div
          className='chatcontainer'
          >
              <div className="chat-top">
                <div className="chat-top-left">
                  <img src={Logo} alt="" id='chat-logo' className='top-logo'/>
                  
              </div>
                <div className="chat-top-right"
                onClick={handleEnding}
                >
                  <div className='end-chat-button' >Görüşmeyi Sonlandır</div>
                </div>
              </div>
              <div className="chat-center messages">

                {messages.length ?messages.map((i,index)=>{
                  return(
                    <Message message={i} key={index}/>
                    // <div className={isMe(i)?"isent":"incoming"}>
                    //   {isMe(i)?<SentBox key={index}>{i.text}</SentBox>:<InComeBox key={index}>{i.text}</InComeBox>}
                    //   <span>{timeCalc(i.time)}</span>
                    // </div>
                  )
                }):null}
              </div>
              <div className="chat-bottom">
                  <form onSubmit={handleSubmit}>
                    {img?<div className='img-box'>
                      <small>
                      {img.name}
                      </small>
                      <CloseIcon
                      onClick={()=>setImg("")}
                      className='icon'/>
                      </div>:null}
                      <input
                        className='chat-input'
                        placeholder='mesajınızı yazın..'
                        value={text}
                        type="text"
                        autoFocus
                        onChange={(e)=>setText(e.target.value)}
                        />
                        <div className="addFile">
                        <label htmlFor='img'>
                          <img src={Attach} alt="" />
                          </label>
                          <input 
                          onChange={(e)=>{setImg(e.target.files[0])
                          
                          }
                          
                          }
                          type="file" id="img" accept='image/*' style={{display:"none"}} />
                        </div>
                        <button
                        disabled={!text&&!img?true:false}
                        className={`send-chat ${text||img? `ready`:`empty`}`}
                        type='submit'>GÖNDER</button>
                
                  </form>
              </div>
          </div>
  )
}

export default LiveChat