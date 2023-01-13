import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { Button } from '../../common/component/Button/Button'
import { Input } from '../../common/component/Input/Input'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import profile from '../profile/Profile.module.scss'

import { registerTC } from './registerReducer'
import s from './registration.module.scss'

interface RegisterErrorType {
  email?: string
  password?: string

  confirmPassword?: string
}

export const Register = () => {
  const register = useAppSelector(state => state.register.register)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: values => {
      const errors: RegisterErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 7) {
        errors.password = 'must be more 7 characters'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'password should be identical'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(registerTC(values))
      formik.resetForm()
    },
  })

  if (register) {
    return <Navigate to={'/signIn'} />
  }

  return (
    <div className={profile.profile_wrapper}>
      <h2 className={profile.profile_title}>Sign Up</h2>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <Input
            className={s.input}
            type="email"
            label="Email"
            error={formik.touched.email ? formik.errors.email : ''}
            {...formik.getFieldProps('email')}
          />
        </div>
        <div>
          <Input
            className={s.input}
            type="password"
            label="Password"
            error={formik.touched.password ? formik.errors.password : ''}
            {...formik.getFieldProps('password')}
          />
        </div>
        <div className={s.input_box}>
          <Input
            className={s.input}
            type="password"
            label="ConfirmPassword"
            error={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
            {...formik.getFieldProps('confirmPassword')}
          />
        </div>

        <Button styleType={'primary'} className={s.btn_signup}>
          Sign Up
        </Button>
      </form>
      <div className={s.have_acc}>Already have an account?</div>

      <NavLink to="/signIn" className={s.signin}>
        Sign In
      </NavLink>
    </div>
  )
}
