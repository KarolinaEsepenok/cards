import React from 'react'

import { NavLink } from 'react-router-dom'

import logoCards from '../../assets/img/LogoCards.svg'

import s from './Header.module.scss'

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <div className={s.headerLogo}>
        <img src={logoCards} />
      </div>
      <button className={s.headerBtn}>
        <NavLink className={s.headerBtnLink} to={'/signIn'}>
          Sign in
        </NavLink>{' '}
      </button>
    </div>
  )
}
