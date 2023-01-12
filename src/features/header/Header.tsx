import React from 'react'

import { useNavigate } from 'react-router-dom'

import logoCards from '../../assets/img/LogoCards.svg'
import { Button } from '../../common/component/Button/Button'

import s from './Header.module.scss'

export const Header = () => {
  const navigate = useNavigate()
  const openSignIn = () => {
    navigate('/signIn')
  }

  return (
    <header className={s.headerContainer}>
      <div className={s.headerContent}>
        <img src={logoCards} alt="logo" />

        <Button styleType="primary" onClick={openSignIn}>
          Sign in
        </Button>
      </div>
    </header>
  )
}
