import React from 'react';
import s from './Header.module.scss'
import logoCards from '../../../assets/img/LogoCards.svg'


export const Header = () => {
    return (
        <div className={s.headerContainer}>
            <div className={s.headerLogo}>
                <img src={logoCards}/>
            </div>
            <div className={s.headerBtn}>
                <button>
                    Sign in
                </button>
            </div>
        </div>
    );
};
