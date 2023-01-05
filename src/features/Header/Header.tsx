import React from 'react';
import s from './Header.module.scss'
import logoCards from '../../assets/img/LogoCards.svg'
import {NavLink} from "react-router-dom";
import { LinearProgress} from "@mui/material";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;



export const Header = () => {

    return (

        <div className={s.headerContainer}>
            <div className={s.headerLogo}>
                <img src={logoCards}/>
            </div>
                    <button className={s.headerBtn}>
                   <NavLink className={s.headerBtnLink} to={'/signIn'} >Sign in</NavLink> </button>



        </div>
    );
};
