import React from 'react'

import { useNavigate } from 'react-router-dom'

import checkEmail from '../../../../assets/img/check-email.svg'
import { Button } from '../../../../common/component/Button/Button'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'

import s from './CheckEmail.module.scss'
export const CheckEmail = () => {
  const email = useAppSelector(state => state.password.currenEmail)
  const navigate = useNavigate()

  return (
    <section className={s.container}>
      <div className={s.popup}>
        <h2>Check your email</h2>
        <img className={s.emailImg} src={checkEmail} alt="" />
        <form>
          <p className={s.subtitle}>We&apos;ve sent an Email with instruction to {email}</p>
          <Button
            className={s.button}
            styleType="primary"
            onClick={() => {
              navigate('/signIn')
            }}
          >
            Back to login
          </Button>
        </form>
      </div>
    </section>
  )
}
