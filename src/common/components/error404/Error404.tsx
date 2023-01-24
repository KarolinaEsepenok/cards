import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Error404.module.scss'

import error404 from 'assets/img/error404.svg'
import { Button } from 'common/components/button/Button'

export const Error404 = () => {
  const navigate = useNavigate()
  const openHomePage = () => {
    navigate('/signIn')
  }

  return (
    <div className={s.errorContainer}>
      <div className={s.errorInfo}>
        <p>Ooops!</p>
        <p className={s.descrError}>Sorry! Page not found!</p>
        <Button styleType="primary" onClick={openHomePage}>
          Back to home page
        </Button>
      </div>
      <img className={s.error404Img} src={error404} alt={'404'} />
    </div>
  )
}
