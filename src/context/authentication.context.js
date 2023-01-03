import React, { createContext,useState,useEffect} from 'react'
//firebase
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendEmailVerification, updateCurrentUser, updateProfile} from 'firebase/auth';
//others
import { getFirestore, serverTimestamp, setDoc,doc,getDoc} from 'firebase/firestore';


export const AuthenticationContext=createContext();


export const AuthenticationProvider=({children})=>{
    const [user,setUser]=useState("")
    const [whoAmI,setWhoAmI]=useState(true)
    const [errMessage,setErrMessage]=useState("")
    const [userData,setUserData]=useState({})
    const [aploading,setAppLoading]=useState(false)


    const handleErrorMessage=(err)=>{
      if(err==="Firebase: Error (auth/email-already-exists)."){
        alert("Sağlanan e-posta zaten mevcut bir kullanıcı tarafından kullanılıyor. Her kullanıcının benzersiz bir e-posta adresi olmalıdır") 
      }else if(err==="Firebase: Error (auth/id-token-expired)."){
        alert("kullanıcı hatırlama süresi doldu.")
      }
      else if(err==="Firebase: Error (auth/internal-error)."){
        alert("Kimlik doğrulama sunucusu beklenmeyen bir hatayla karşılaştı. ")
      }
      else if(err==="Firebase: Error (auth/invalid-email)."){
        alert("email kullanıcı özelliği için sağlanan değer geçersiz. mail adresi, geçerli e-posta adresi olmalıdır.")
      }else if(err==="Firebase: Error (auth/wrong-password)."){
        alert("şifreyi yanlış girdiniz")
      }
      else{
        alert(err)
      }

    }
    const db=getFirestore()

    const register=async(mail,password,name,navigate,setSigning)=>{
        try{
          
          await createUserWithEmailAndPassword(auth,mail,password)
          .then((userCredential)=>sendEmailVerification(auth.currentUser)
          .then(()=>{
            if(userCredential.user)
              updateProfile(userCredential.user,{
                displayName: name
              })})
          .then(()=>{
            const collectionRef=doc(db,"Users",userCredential.user.uid)
            setDoc(collectionRef,{
              id:Math.random().toString(16).substring(2,9),
              userid:userCredential.user.uid,
              createdAt:serverTimestamp(),
              userName:name,
              mail:mail,
              wishes:[],
              virgin:true,
              verified:false,
              verifiedPhone:false,
              emailVerified:userCredential.user.emailVerified,
              phoneNumber:userCredential.user.phoneNumber,
              client:true,
              firm:false,
              userNumberFirst:new Date().getFullYear()+""+(new Date().getMonth()+1)+""+new Date().getDate(),
              userNumberSecond:userCredential.user.uid.substring(24)

            })
          }))
          .then(()=>setSigning(false)).finally(()=>alert(`Başarıyla Kaydolundu.`)) 
        }catch(error){
          //handleErrorMessage(error.message)
          alert(handleErrorMessage(error.message))
   
          setSigning(false)
        }
      
      }


    
    onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
      })

      const login=async(mail,password,navigate)=>{
        setAppLoading(true)
        try{
          const user= await signInWithEmailAndPassword(auth,mail,password)
          //.then((data)=>setUser(data.user))
          //.then(()=>getUserData())
          .then(()=>setAppLoading(false))
    
          navigate()
        }catch(error){
          setAppLoading(false)
   
        }
      }

      
      const logout=async(go)=>{
       
        await signOut(auth)
        .then(()=>setUser(""))
        
        
        
      }


        
        
        
        const getUserData=async(user)=>{
          
          try{
            
            const userRef=doc(db,"Users",user.uid)
            const docSnap=await getDoc(userRef)
            if(docSnap.exists())
            {
              setUserData(docSnap.data())
         
              
              
            }
            
            else{
            
            }  
          }catch(e){
            //alert(e.message)
          }
        }
      
        useEffect(()=>{
          if(user){
            getUserData(user)
            
          }  
        },[user])

        

    return(
        <AuthenticationContext.Provider
        value={{
            Authenticated:!!user,
            register,
            whoAmI,setWhoAmI,
            login,
            logout,
            user,
            setUser,
            errMessage,
            userData,
            aploading,setAppLoading,
            
        }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}