import React from 'react';
import Common from "./component/common/Common";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "./component/Login/Login";
import Registration from "./component/Registration/Registration";
import Profile from "./component/Profile/Profile";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import PasswordRecovery from "./component/PasswordRecovery/PasswordRecovery";
import NewPassword from "./component/ NewPassword/NewPassword";
import  "./App.css";

export const App=()=> {
    return (
    <HashRouter>
        <div className={'App'}>
        <div>
            <Common></Common>
           <Routes>
               <Route path={'/'}  element={<Navigate to={"/login"}/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/profile/:userId' element={<Profile/>}/>
                <Route path='/error404' element={<ErrorPage/>}/>
                <Route path='/passwordRecovery' element={<PasswordRecovery/>}/>
                <Route path='/newPassword' element={<NewPassword/>}/></Routes>
            </div>
       </div>
    </HashRouter>





  );
}

export default App;
