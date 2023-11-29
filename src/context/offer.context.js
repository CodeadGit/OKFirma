import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import { AuthenticationContext } from "./authentication.context";


const OfferContext=createContext();

const OfferProvider=({children})=>{
    const {user}=useContext(AuthenticationContext)
    const [noteList,setNoteList]=useState([])
    const [savedNotes,setSavedNotes]=useState([])
    const [fetchingNotes,setFetchingNotes]=useState(false)
    const [savingNotes,setSavingNotes]=useState(false)
    const [notesExist,setNotesExist]=useState(false)
    const [listTitle,setListTitle]=useState("")
    const [open, setOpen] = useState(false);
    const [used,setUsed]=useState(false)
    const [isOne,setIsOne]=useState(false)
    const [onload,setOnload]=useState(false)
    const [selectOpen,setSelectOpen]=useState(false)

    const handleOnloaded=()=>{
        setOnload(pre=>!pre)
    }
    const handleCloseSelect=()=>{
        setSelectOpen(pre=>!pre)
    }

    useEffect(()=>{
        if(user){
            var me=user.uid;
            let controller = new AbortController();
            (async () => {
                const q = query(collection(db, "Users",me,"SavedNotes"))
    
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty){
                    setNotesExist(true)
                }else{
                    return
                }
            })();
              return () => controller?.abort();
        }
        
    
    },[onload,user])
    
    const fetchSavedNotes = async () => {
        setFetchingNotes(true)
        try {
          const querySnapshot = await getDocs(collection(db,"Users",auth.currentUser.uid,'SavedNotes'));
          const fetchedNotes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if(querySnapshot.size===1){
            setNoteList(pre=>([...pre,...fetchedNotes[0].notes]))
            setSavedNotes(fetchedNotes[0].notes);
            setIsOne(true)
    
          }else{
            setIsOne(false)
            setUsed(true)
            setSavedNotes(fetchedNotes)
          }
          setFetchingNotes(false)
          handleCloseSelect()
        } catch (error) {
            setFetchingNotes(false)
            alert("notlar çekilemedi")
          console.error('Error retrieving saved notes:', error);
        }
      };
    const handleAddNoteList = () => {
        var id=new Date().valueOf().toString().substring(6)
        const newList = [...noteList, {note:"",id:id}];
        setNoteList(newList);
    };
    
    const handleRemoveNote=(id)=>{
        const newList = noteList.filter((i)=>i.id!==id);
        setNoteList( newList);
    }
    
    
    const handleNotetListChange = (event, index,item) => {
        const { value } = event.target;

        const oldObject={...noteList[index]}
        const oldList = [...noteList];
        oldList[index] = {
            ...oldObject,
            note:String(value).toUpperCase(),
            
            
        };
        setNoteList(oldList);
    };
    
    const saveNotes=async()=>{
        if(!listTitle){
            alert("listenizin bir ismi olmalı")
        }else{
            setSavingNotes(true);
            var referance=collection(db,"Users",auth.currentUser.uid,"SavedNotes");
            try {
                await addDoc(referance,{
                    title:listTitle,
                    notes:noteList,
                    createdAt:new Date()
                })
                setSavingNotes(false)
                handleClose()
                alert("notlar başarıyla kaydedildi")
    
            } catch (error) {
                setSavingNotes(false)
                alert("Hata: notlar kaydedilemedi.")
            }
        }
        
    }
    
    const handleClickOpen = () => {
    setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };
    
    const removeSavedNotes=()=>{
    
       var oldList=[...noteList]
       var filteredArray=[]
        if(isOne){
            filteredArray = oldList.filter(obj1 => !savedNotes.some(obj2 => obj2.id === obj1.id));
        
        }else{
            for(let i=0;i<savedNotes.length;i++){
                filteredArray = oldList.filter(obj1 => !savedNotes[i].notes.some(obj2 => obj2.id === obj1.id))
            }
            
        }
        
        setNoteList(filteredArray)
        setUsed(false)
        //setSavedNotes([])
        handleCloseSelect()
       
    }
    
    const handleOnChangeSelect=(e)=>{
    const {value}=e.target;
    console.log(value)
    e.preventDefault();
    var oldList=[...noteList]
    setNoteList([...oldList,...savedNotes[value].notes])
    }
    
    const handleNoteListTitle=(e)=>{
      setListTitle(e.target.value)
    }
    



    return(
        <OfferContext.Provider
            value={{
                fetchSavedNotes,
                handleAddNoteList,
                handleRemoveNote,
                handleNotetListChange,
                saveNotes,
                handleClickOpen,
                handleClose,
                removeSavedNotes,
                handleOnChangeSelect,
                handleNoteListTitle,
                //states
                noteList,
                savedNotes,
                fetchingNotes,
                savingNotes,
                notesExist,
                listTitle,
                open,
                used,
                isOne,
                handleOnloaded,
                handleCloseSelect,
                selectOpen
                
            }}
        >
            {children}
        </OfferContext.Provider>
    )
}

const useOffer=()=>{
    const context=useContext(OfferContext)
    return context
}

export { OfferProvider, useOffer }