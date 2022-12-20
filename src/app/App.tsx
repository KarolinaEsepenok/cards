import React from 'react';
import Common from "../common/component/generalComponents/Common";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import Registration from "../features/registration/Registration";
import Auth from "../features/auth/Auth";
import Profile from "../features/profile/Profile";
import ErrorPage from "../features/errorPage/ErrorPage";
import PasswordRecovery from "../features/auth/passwordRecovery/PasswordRecovery";
import NewPassword from "../features/auth/newPassword/NewPassword";
import "../App.css";

export const App = () => {
    return (
        <HashRouter>
            <div className={'App'}>

                <Routes>
                    <Route path={'/'} element={<Navigate to={"/auth"}/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/error404' element={<ErrorPage/>}/>
                    <Route path='/passwordRecovery' element={<PasswordRecovery/>}/>
                    <Route path='/newPassword' element={<NewPassword/>}/>
                    <Route path='/testCommon' element={<Common/>}/>
                </Routes>

            </div>
        </HashRouter>
    )
}
