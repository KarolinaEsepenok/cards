import React from 'react'

import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '../../../common/component/Button/Button'
import { Input } from '../../../common/component/Input/Input'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import { forgotPasswordTC } from './forgotPassword-reducer'
import s from './ForgotPassword.module.scss'

export type ErrorsType = {
  email?: string
  password?: string
}
export const ForgotPassword = () => {
  const forgotPassword = useAppSelector(state => state.password.forgotPassword)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
    navigate('/checkEmail')
  }

  return (
    <section className={s.container}>
      <div className={s.popup}>
        <form onSubmit={formik.handleSubmit} className={s.formContainer}>
          <h2 className={s.title}>Forgot your password?</h2>
          <div className={s.inputContainer}>
            <Input
              className={s.input}
              placeholder="Email"
              type="email"
              error={formik.touched.email ? formik.errors.email : ''}
              {...formik.getFieldProps('email')}
            />
          </div>
          <p className={s.subtitle}>
            Enter your email address and we will send you further instructions
          </p>
          <Button styleType="primary" className={s.button}>
            Send instructions
          </Button>
          <p className={s.label}>Did your remember your password?</p>
          <NavLink className={s.link} to="/signIn">
            Try to logging in
          </NavLink>
        </form>
      </div>
    </section>
  )
}
