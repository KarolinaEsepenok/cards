import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './CheckEmail.module.scss'

import checkEmail from 'assets/img/check-email.svg'
import { Button } from 'common/components/button/Button'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { currentEmailSelector } from 'common/selectors/Selectors'
import { PATH } from 'routes/routes'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const email = useAppSelector(currentEmailSelector)

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
              navigate(PATH.SIGN_IN)
            }}
          >
            Back to login
          </Button>
        </form>
      </div>
    </section>
  )
}
