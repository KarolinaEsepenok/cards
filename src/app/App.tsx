import React from 'react';
import Common from "../common/component/generalComponents/Common";
import { Route, Routes, Navigate} from "react-router-dom";
import Profile from "../features/profile/Profile";
import ErrorPage from "../features/errorPage/ErrorPage";
import Password from "../features/auth/common/password/Password";
import NewPassword from "../features/auth/newPassword/NewPassword";
import s from "./App.module.scss";
import SignUp from "../../src/features/auth/signUp/signUp"
import SignIn from "../features/auth/signIn/signIn";
import {Header} from "../features/Header/Header";
import {NavLink} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../common/component/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RootStateType} from "./store";

export const App = () => {
    const isLoading = useSelector<RootStateType,boolean>((state)=>state.app.isLoading)
    return (
        <div className={s.app}>
            <ErrorSnackbar/>
            <Header/>
            <div className={s.centerApp}>
                <nav className={s.nav}>
                    {isLoading && <LinearProgress className={s.linearProgress} /> }
                    <ul className={s.items}>
                        <li className={s.item}><NavLink to={"/signIn"} >SignIn</NavLink></li>
                        <li className={s.item}><NavLink to={"/signUp"} >SignUp</NavLink></li>
                        <li className={s.item}><NavLink to={"/password"}>passwordRecovery</NavLink></li>
                        <li className={s.item}><NavLink to={"/newPassword"} >newPassword</NavLink></li>
                        <li className={s.item}><NavLink to={"/profile/:userId"} >profile/:userId</NavLink></li>
                        <li className={s.item}><NavLink to={"/error404"} >error404</NavLink></li>
                        <li className={s.item}><NavLink to={"/testCommon"} >testCommon</NavLink></li>
                    </ul>
                </nav>
                <div>
                <Routes>
                    <Route path={'/'} element={<Navigate to={"/signIn"}/>}/>
                   <Route path='/signIn' element={<SignIn/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path='/passwordRecovery' element={<Password namePassword={'Password'}/>}/>
                    <Route path='/newPassword' element={<NewPassword/>}/>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/error404' element={<ErrorPage/>}/>
                    <Route path='/testCommon' element={<Common/>}/>
                </Routes>
                </div>

         </div></div>
    )
}
