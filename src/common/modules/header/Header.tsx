import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import logoCards from 'assets/img/LogoCards.svg'
import avatarPlug from 'assets/img/profile_photo.jpg'
import { Button } from 'common/components/button/Button'
import { useAppSelector } from 'common/hooks/useAppSelector'
import s from 'common/modules/header/Header.module.scss'
import { avatarSelector, isLoggedInSelector, nameSelector } from 'common/selectors/Selectors'
import { PATH } from 'routes/routes'

export const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const userName = useAppSelector(nameSelector)
  const userAvatar = useAppSelector(avatarSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug

  const openSignIn = () => {
    navigate(`${PATH.SIGN_IN}`)
  }
  const openProfile = () => {
    navigate(`${PATH.PROFILE}`)
  }

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <img src={logoCards} alt="logo" />
        </Link>

        {isLoggedIn ? (
          <div className={s.userInfoContainer}>
            <p className={s.name}>{userName}</p>
            <img src={avatar} alt="user avatar" className={s.avatar} onClick={openProfile} />
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
