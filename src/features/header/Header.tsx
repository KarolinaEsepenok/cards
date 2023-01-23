import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Header.module.scss'

import logoCards from 'assets/img/LogoCards.svg'
import avatarPlug from 'assets/img/profile_photo.jpg'
import { Button } from 'common/component/button/Button'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { avatarSelector, isLoggedInSelector, nameSelector } from 'common/selectors/Selectors'

export const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const userName = useAppSelector(nameSelector)

  const userAvatar = useAppSelector(avatarSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug
  const openSignIn = () => {
    navigate('/signIn')
  }

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <img src={logoCards} alt="logo" />

        {isLoggedIn ? (
          <div className={s.userInfoContainer}>
            <p className={s.name}>{userName}</p>
            <img src={avatar} alt="user avatar" className={s.avatar} />
          </div>
        ) : (
          <Button styleType="primary" onClick={openSignIn}>
            Sign in
          </Button>
        )}
      </nav>
    </header>
  )
}
