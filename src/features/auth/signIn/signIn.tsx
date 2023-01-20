import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { Button } from '../../../common/component/button/Button'
import { Checkbox } from '../../../common/component/Checkbox/Checkbox'
import { Input } from '../../../common/component/Input/Input'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { isLoggedInSelector } from '../../../common/selectors/Selectors'
import { PATH } from '../../../routes/routes'
import { authTC } from '../authReducer'

import s from './signIn.module.scss'

interface FormikErrorType {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const SignIn = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length <= 8) {
        errors.password = 'Password should be longer then 8 symbols!'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(authTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PACKS} />
  }

  return (
    <div className={s.signIn}>
      <div className={s.popupContainer}>
        <h1 className={s.title}>Sign In</h1>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <div className={s.inputContainer}>
            <Input
              className={s.input}
              type="email"
              label="Email"
              error={formik.touched.email ? formik.errors.email : ''}
              {...formik.getFieldProps('email')}
            />
          </div>
          <div className={s.inputContainer}>
            <Input
              className={s.input}
              type="password"
              label="Password"
              error={formik.touched.password ? formik.errors.password : ''}
              {...formik.getFieldProps('password')}
            />
          </div>
          <Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}>
            Remember me
          </Checkbox>

          <NavLink className={s.forgotPassword} to={'/password'}>
            Forgot password?
          </NavLink>
          <Button
            type="submit"
            styleType="primary"
            className={s.button}
            disabled={
              !!formik.errors.password || !!formik.errors.email || !formik.values.email || !formik.values.password
            }
          >
            Sign In
          </Button>
        </form>
        <div className={s.subtitle}>Don`t have an account?</div>
        <NavLink className={s.loginLink} to={PATH.REGISTER}>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}
