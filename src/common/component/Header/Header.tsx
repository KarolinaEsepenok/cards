import React from 'react';
import s from './Header.module.scss'
import logoCards from '../../../assets/img/LogoCards.svg'
import {NavLink} from "react-router-dom";


export const Header = () => {
    console.log('header')
    return (

        <div className={s.headerContainer}>
            <div className={s.headerLogo}>
                <img src={logoCards}/>
            </div>

                <button className={s.headerBtn}>
                   <NavLink className={s.headerBtnLink} to={'/signIn'} >Sign in</NavLink>
                </button>

        </div>
    );
};
