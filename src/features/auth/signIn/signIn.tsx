import React, { useEffect } from 'react'

import { FormControl, FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '../../../common/component/Button/Button'
import { Checkbox } from '../../../common/component/Checkbox/Checkbox'
import { Input } from '../../../common/component/Input/Input'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { authTC } from '../authReducer'

import s from './signIn.module.scss'

interface FormikErrorType {
  email?: string
  password?: string
  rememberMe?: boolean
}

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

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
      } else if (values.password.length <= 7) {
        errors.password = 'Password should be longer then 7 symbols!'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(authTC(values))
    },
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn])

  return (
    <div className={s.loginContainer}>
      <h1 className={s.loginNameContainer}>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <div className={s.label}>
              <Input
                type="email"
                label="Email"
                error={formik.errors.email}
                {...formik.getFieldProps('email')}
              />{' '}
              {/* {formik.touched.email && formik.errors.email ? (
                <div className={s.loginError}>{formik.errors.email}</div>
              ) : null}
             */}
              <Input
                type="password"
                label="Password"
                error={formik.errors.password}
                {...formik.getFieldProps('password')}
              />
              {/* {formik.touched.password && formik.errors.password ? (
                <div className={s.passwordError}>{formik.errors.password}</div>
              ) : null}*/}
            </div>
            <div className={s.remember}>
              <label htmlFor={'rememberMe'}>Remember me</label>
              <Checkbox
                id="rememberMe"
                {...formik.getFieldProps('rememberMe')}
                checked={formik.values.rememberMe}
              />
            </div>
            <NavLink className={s.forgotPassword} to={'/password'}>
              Forgot password?
            </NavLink>
            <Button type={'submit'} styleType="primary">
              Sign In
            </Button>
          </FormGroup>
        </FormControl>
      </form>
      <div className={s.loginQuestion}>Do not have an account?</div>

      <NavLink to="/register">Sign Up</NavLink>
    </div>
  )
}

export default SignIn
