import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { registerTC } from './registerReducer'

interface RegisterErrorType {
  email?: string
  password?: string
}

export const Register = () => {
  const register = useAppSelector(state => state.register.register)
  const dispatch = useAppDispatch()

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
      alert(JSON.stringify(values, null, 2))
      dispatch(registerTC(values))
      formik.resetForm()
    },
  })

  if (register) {
    return <Navigate to={'/signIn'} />
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input type={'text'} placeholder={'email'} {...formik.getFieldProps('email')} />
        <input type={'password'} placeholder={'password'} {...formik.getFieldProps('password')} />
        <button>Register</button>
      </form>
    </div>
  )
}
