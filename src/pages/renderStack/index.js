import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Home from "../home/Home"
import Kesifler from "../kesifler/Kesifler"
import Kesiflerim from "../kesiflerim/Kesiflerim"
import List from "../list/List"
import Single from "../single/Single"
import React, { useContext, useState } from 'react'
import { CloudContext } from "../../context/cloud.context.js"
import { AuthenticationContext } from "../../context/authentication.context"
import ListMyJobs from "../list/ListMyJobs"
import SingleMyJob from "../single/SingleMyJob"
import Firms from "../Firms/Firms"
import SingleFirm from "../SingleFirm/SingleFirm"
import New from "../new/New"
import { userInputs } from "../../formSource"
import Register from "../accountStack/register/Register"
import Login from "../accountStack/login/Login"
import Loading from "../../components/Loading/Loading"
import LoadingGeneral from "../../components/Loading/LoadingGeneral"
import LiveChat from "../../components/livechat/LiveChat"
import Messages from "../messages/Messages"
import SupportRequest from "../messages/SupportRequest"
import LiveSupport from "../messages/LiveSupport"
import NewSupportRequest from "../messages/NewSupportRequest"
import MyReaquestScreen from "../messages/MyReaquestScreen"
import MyFirm from "../MyFirm/MyFirm"
import Confirmation from "../../Confirmation/Confirmation"
import { auth } from "../../firebase/firebase.config"
import Settings from "../settings/Settings"
import ForgotPassword from "../accountStack/forgot/ForgotPassword"



export const VenderStack = () => {
      const [loading, setLoading] = useState(false)
      const [message, setMessage] = useState("")
      const [alertMessage, setAlertMessage] = useState("")
      const [warnMessage, setWarnMessage] = useState("")
      const { user, userData, Authenticated, aploading, setAppLoading } = useContext(AuthenticationContext)
      const { myJobs, myPossibleJobs, myJobsData, myProducts } = useContext(CloudContext)

      if (loading | aploading) {
            return <LoadingGeneral title="Kontrol Ediliyor..." />

      }

      
      

      return (

            <Routes>


                  <>
                        <Route path='/' element={
                              <Home
                                    setAlertMessage={setAlertMessage}
                                    setLoading={setLoading} />

                        } />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="kesiflerim">
                              <Route index element={<Kesiflerim data={myJobsData} />} />
                              <Route path=":userId" element={<SingleMyJob />} />

                        </Route>
                        <Route index path='giris-yap' element={<Login
                              setMessage={setMessage}
                              setLoading={setLoading}
                              message={message}
                              warnMessage={warnMessage}
                              setWarnMessage={setWarnMessage}
                              alertMessage={alertMessage}
                              setAlertMessage={setAlertMessage}
                        />} />
                        <Route path="sifremi-unuttum" element={<ForgotPassword/>} />
                        <Route path='Kayit-Ol' element={<Register
                              warnMessage={warnMessage}
                              setLoading={setLoading}
                              setWarnMessage={setWarnMessage}
                              setMessage={setMessage}
                              message={message}
                              alertMessage={alertMessage}
                              setAlertMessage={setAlertMessage} />} />
                        <Route path="firma-bilgilerim">
                              <Route index element={<MyFirm />} />
                              <Route path=":userId" element={<SingleFirm />} />
                              <Route path="yeni-firma" element={<New inputs={userInputs} title="Yeni Firma Ekle" />} />
                        </Route>
                        {/* <Route path="firma-yonetim">
              <Route index element={<Firms/>}/>
              <Route path=":userId" element={<SingleFirm/>}/>
              <Route path="yeni-firma" element={<New inputs={userInputs} title="Yeni Firma Ekle"/>}/>
        </Route> */}
                        {/* <Route path="kesifler">
              <Route index element={<List data={myPossibleJobs}/>}/>
              <Route path=":userId" element={<Single/>}/>
        </Route> */}
                        <Route path="kesifler">
                              <Route index element={<Kesifler data={myPossibleJobs} />} />
                              <Route path=":userId" element={<Single />} />
                        </Route>
                        <Route path="malzemeler">
                              <Route index element={<List data={myProducts} />} />
                              <Route path=":userId" element={<Single />} />

                        </Route>
                        <Route path="onay" element={<Confirmation />} />
                        <Route path="mesajlarim">
                              <Route index element={<Messages />} />
                              <Route path="Canli-Destek" element={<LiveSupport />} />
                              <Route path="Destek-Talebi">
                                    <Route index element={<SupportRequest />} />
                                    <Route path=":talepId" element={<MyReaquestScreen />} />
                              </Route>
                              <Route path="Yeni-Destek-Talebi" element={<NewSupportRequest />} />
                              <Route path=":userId" element={<Single />} />
                        </Route>
                        <Route path="ayarlar" element={<Settings />} />
                  </>




            </Routes>
      )
}