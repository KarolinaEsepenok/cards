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
import SignUp from "../features/auth/signUp/signUp";
import SignIn from "../features/auth/signIn/signIn";

export const App = () => {
    return (
        <HashRouter>
            <div className={'App'}>

                <Routes>
                    <Route path={'/'} element={<Navigate to={"/auth"}/>}/>
                    <Route path='/signIn' element={<SignIn/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
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
