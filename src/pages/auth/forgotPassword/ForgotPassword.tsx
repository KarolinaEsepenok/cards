import React from 'react'

import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import s from './ForgotPassword.module.scss'
import { forgotPasswordTC } from './forgotPasswordReducer'

import { Button } from 'common/components/button/Button'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { forgotPasswordSelector } from 'common/selectors/Selectors'
import { PATH } from 'routes/routes'

export type ErrorsType = {
  email?: string
  password?: string
}
export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const forgotPassword = useAppSelector(forgotPasswordSelector)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: ErrorsType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(forgotPasswordTC(true, values.email))
    },
  })

  if (forgotPassword) {
    navigate(PATH.CHECK_EMAIL)
  }

  return (
    <section className={s.container}>
      <div className={s.popup}>
        <h2 className={s.title}>Forgot your password?</h2>

        <form onSubmit={formik.handleSubmit} className={s.form}>
          <div className={s.inputContainer}>
            <Input
              className={s.input}
              placeholder="Email"
              type="email"
              error={formik.touched.email ? formik.errors.email : ''}
              {...formik.getFieldProps('email')}
            />
          </div>

          <p className={s.subtitle}>Enter your email address and we will send you further instructions</p>
          <Button
            styleType="primary"
            className={s.button}
            disabled={formik.values.email === '' || !!formik.errors.email}
          >
            Send instructions
          </Button>

          <p className={s.label}>Did your remember your password?</p>
          <NavLink className={s.link} to={PATH.SIGN_IN}>
            Try to logging in
          </NavLink>
        </form>
      </div>
    </section>
  )
}
