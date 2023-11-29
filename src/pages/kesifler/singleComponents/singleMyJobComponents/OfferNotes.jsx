import { Remove } from '@mui/icons-material';
import { Save } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../firebase/firebase.config';
import { Sync } from '@mui/icons-material';
import { useOffer } from '../../../../context/offer.context';
import { Close } from '@mui/icons-material';

const OfferNotes = ({
    job,
    handleCondition,
    conditions,
    handleConditionBoolean,

}) => {
   
const {
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
    listTitle,
    noteList,
    savedNotes,
    fetchingNotes,
    savingNotes,
    notesExist,
    open,
    used,
    isOne,
    selectOpen
}=useOffer()
console.log(conditions)
  return (
    <div
        className='firm-notes'
    >
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Liste Adı</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Listenize erişmenizin daha kolay olması için ona bir isim verin. <i><smal>(örn: Genel Notlarım)</smal></i>
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="Liste Adı"
                    type="text"
                    fullWidth
                    value={listTitle}
                    onChange={handleNoteListTitle}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Vazgeç</Button>
                <Button 
                disabled={savingNotes?true:false}
                onClick={saveNotes}>{savingNotes?<CircularProgress/>:"Kaydet"}</Button>
            </DialogActions>
        </Dialog>
        <div className="one-question">
            <span className='index'>1.</span>
            <span className="question">FİYATLARIMIZ TL OLARAK VERİLMİŞTİR. FİYATLARIMIZA %20 KDV</span>
            <div className="selectors">
                <span 
                    onClick={()=>handleConditionBoolean("KDVincluded",true)}
                    className={`selector ${conditions.KDVincluded?"selected":"not-selected"}`}
                >
                    DAHİLDİR
                </span>
                <span 
                    onClick={()=>handleConditionBoolean("KDVincluded",false)}
                    className={`selector ${!conditions.KDVincluded?"selected":"not-selected"}`}
                >
                    İLAVE EDİLECEKTİR
                </span>
            </div>
        </div>
        <div className="one-question">
            <span className='index'>2.</span>
            <span className="question">ELEKTRİK, İNŞAİİ VE VİNÇ İŞLEMLERİ</span>
            <div className="selectors">
                <span 
                    onClick={()=>handleConditionBoolean("angaryaIsOur",false)}
                    className={`selector ${!conditions.angaryaIsOur?"selected":"not-selected"}`}
                >
                    MÜSTERİYE AİTTİR
                </span>
                <span 
                    onClick={()=>handleConditionBoolean("angaryaIsOur",true)}
                    className={`selector ${conditions.angaryaIsOur?"selected":"not-selected"}`}
                >
                    İŞ YAPANA AİTTİR
                </span>
            </div>
        </div>
        <div className="one-question">
                <span className='index'>3. </span>
                <span className="question">ÜRÜN TEMİN SÜRESİ</span>      
                <input
                    onChange={handleCondition}
                    name='recruitment'
                    value={conditions.recruitment}
                    className='answer-input'
                    type='text'
                    placeholder='temin süresi'
                />
                <select
                    onChange={handleCondition}
                    name='recruitmentUnit'
                    value={conditions.recruitmentUnit}
                    className='answer-select'
                >
                    <option value="gün">gün</option>
                    <option value={"hafta"} >hafta</option>
                    <option value={"ay"}>ay</option>
                </select>
                <span className='answer-end'>İÇERİSİNDE</span>
        </div>
        <div className="one-question answered">
            <span className='index'>4. </span>
            <span className="question">ÖDEME ŞEKLİ : İŞ BİTİMİNDE</span>
        </div>
        <div className="one-question">
                <span className='index'>5. </span>
                <span className="question">İŞ TESLİM SÜRESİ</span>      
                <input
                    onChange={handleCondition}
                    name='deliveryTime'
                    value={conditions.deliveryTime}
                    className='answer-input'
                    type='text'
                    placeholder='iş teslim süresi'
                />
                <select
                    onChange={handleCondition}
                    name='deliveryTimeUnit'
                    value={conditions.deliveryTimeUnit}
                    className='answer-select'
                >
                    <option value="gün">gün</option>
                    <option value={"hafta"} >hafta</option>
                    <option value={"ay"}>ay</option>
                </select>
                <span className='answer-end'>İÇERİSİNDE</span>
        </div> 
        <div className="one-question">
                <span className='index'>6. </span>
                <span className="question">TEKLİFİN GEÇERLİLİK SÜRESİ</span>      
                <input
                    onChange={handleCondition}
                    name='expiration'
                    value={conditions.expiration}
                    className='answer-input'
                    type='text'
                    placeholder='geçerlilik süresi'
                />
                <select
                    onChange={handleCondition}
                    name='expirationUnit'
                    value={conditions.expirationUnit}
                    className='answer-select'
                >
                    <option value="gün">gün</option>
                    <option value={"hafta"} >hafta</option>
                    <option value={"ay"}>ay</option>
                </select>
        </div> 
       
        {noteList.map((i,idx)=>{
                return(
                    <div 
                    key={idx}
                    className='one-question'>

                        <span className='index' >{idx+7}.</span>
                        
                        <input
                            className='answer-input wide'
                            placeholder='notunuzu yazınız'
                            required
                            
                            name='note'
                            value={noteList[idx].note}
                            onChange={(e)=>handleNotetListChange(e,idx)}
                            
                        />
                        <Tooltip
                            title="sil"
                        >
                            <IconButton
                                onClick={()=>handleRemoveNote(i.id)}
                            >
                                <Remove/>
                            </IconButton>
                        </Tooltip>
                        
                        
                    </div>
                )
        })}
        

            <div className="action-buttons">
                {
                    notesExist&&!fetchingNotes&&savedNotes.length>0&&!isOne&&
                    selectOpen&&
                    <select
                        className='select-list'
                        onChange={handleOnChangeSelect}
                    >
                        <option value="" disabled selected>
                            Select an option
                        </option>
                            {savedNotes?.map((s,sidx)=>{
                                return(
                                    <option
                                        value={sidx}
                                        key={sidx}
                                    >
                                        {s.title}
                                    </option>
                                )
                            })}
                    </select> 
                }
                <Button
                    variant="outlined"
                    color="primary"
                    className='button addNote'
                    onClick={handleAddNoteList}
                >
                    <Add/>
                    <span>Not Ekle</span>
                </Button>
                    {notesExist&&
                        <>
                            {
                                fetchingNotes
                                ?<CircularProgress/>
                                :
                                <>
                                    {savedNotes.length>0&&used?
                                    <Button
                                        variant="outlined"
                                        //color="delete"
                                        className='button removeSaved'
                                        onClick={removeSavedNotes}
                                    >
                                        <Close/>
                                        <span>Kayıtlı Notlarımı Kaldır</span>
                                    </Button>
                                    :<Button
                                        variant="outlined"
                                        color="primary"
                                        className='button useSaved'
                                        onClick={fetchSavedNotes}
                                    >
                                        <Sync/>
                                        <span>Kayıtlı Notlarımdan Kullan</span>
                                    </Button>
                                    }
                                </>
                            }
                        
                        </>
                    }

                    {noteList.length>0&&noteList[0]?.note&&
                        <Button    
                            variant="contained"
                            color="primary"
                            className='button save'                
                            onClick={handleClickOpen}
                        >
                            <Save/>
                            <span>Notlarıma Kaydet</span>
                        </Button>
                    }
            </div>
            

        
    </div>
  )
}

export default OfferNotes