import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Login from "./login/Login"
import Register from "./register/Register"


export const AccountStack=()=>{
    return(
        <>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/Kayit-Ol' element={<Register/>} />
        </Routes>
        </>
    )
}