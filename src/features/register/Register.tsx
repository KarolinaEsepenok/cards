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
}

export const Register = () => {
  const register = useAppSelector(state => state.register.register)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
      } else if (values.password.length < 3) {
        errors.password = 'must be more 3 characters'
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
          </div>
          <div>
            <input
              type={'password'}
              placeholder={'password'}
              {...formik.getFieldProps('password')}
            />
          </div>
          <div>
            <input
              type={'password'}
              placeholder={'password'}
              {...formik.getFieldProps('password')}
            />
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
