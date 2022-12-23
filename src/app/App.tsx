import React from 'react';
import Common from "../common/component/generalComponents/Common";
import { Route, Routes, Navigate} from "react-router-dom";
import Profile from "../features/profile/Profile";
import ErrorPage from "../features/errorPage/ErrorPage";
import PasswordRecovery from "../features/auth/passwordRecovery/PasswordRecovery";
import NewPassword from "../features/auth/newPassword/NewPassword";
import s from "./App.module.scss";
import SignUp from "../features/auth/signUp/signUp";
import SignIn from "../features/auth/signIn/signIn";
import {Header} from "../common/component/Header/Header";

export const App = () => {
    return (
        <div className={s.app}>
            <Header/>
            <div className={s.centerApp}>

                <div>
                <Routes>
                    <Route path={'/'} element={<Navigate to={"/auth"}/>}/>
                    <Route path='/signIn' element={<SignIn/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/error404' element={<ErrorPage/>}/>
                    <Route path='/passwordRecovery' element={<PasswordRecovery/>}/>
                    <Route path='/newPassword' element={<NewPassword/>}/>
                    <Route path='/testCommon' element={<Common/>}/>
                </Routes></div>


         </div></div>
    )
}
