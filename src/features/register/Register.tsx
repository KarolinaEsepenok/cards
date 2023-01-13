import React from 'react'

import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '../../common/component/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import profile from '../profile/Profile.module.scss'

import { registerTC } from './registerReducer'
import reg from './registration.module.scss'

interface RegisterErrorType {
  email?: string
  password?: string

  confirmPassword?: string
}

export const Register = () => {
  const register = useAppSelector(state => state.register.register)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
      // alert(JSON.stringify(values, null, 2))
      dispatch(registerTC(values))
      formik.resetForm()
    },
  })

  const navigatInSigin = () => {
    navigate('/signIn')
  }

  if (register) {
    return <Navigate to={'/signIn'} />
  }

  return (
    <div>
      <div className={profile.profile_wrapper}>
        <h2 className={profile.profile_title}>Sign Up</h2>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <input type={'text'} placeholder={'email'} {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? (
              <div className={reg.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              type={'password'}
              placeholder={'password'}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={reg.error}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className={reg.input_box}>
            <input
              type={'password'}
              placeholder={'confirmPassword'}
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className={reg.error}>{formik.errors.confirmPassword}</div>
            )}
          </div>

          <Button styleType={'primary'} className={reg.btn_signup}>
            Sign Up
          </Button>
        </form>
        <div>Already have an account?</div>

        <Button className={reg.btn_signin} onClick={navigatInSigin}>
          Sign In
        </Button>
      </div>
    </div>
  )
}
