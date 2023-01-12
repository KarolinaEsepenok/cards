import React from 'react'

import { Button, FormControl, FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { Checkbox } from '../../../common/component/Checkbox/Checkbox'
import { Input } from '../../../common/component/Input/Input'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import reg from '../../register/registration.module.scss'

import { signInThunk } from './signIn-reducer'
import s from './signIn.module.scss'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      if (!values.email) {
        return {
          email: 'Email is required',
        }
      }
      if (!values.password) {
        return {
          password: 'Password is required',
        }
      }
      if (values.password.length <= 7) {
        return {
          password: 'Password should be longer then 7 symbols!',
        }
      }
    },
    onSubmit: values => {
      dispatch(signInThunk(values))
    },
  })

  {
    if (isAppInitialized) {
      navigate('/profile')
    }
    // if (!isAppInitialized) {
    //   navigate('/signUp')
    // }
  }
  const navigatInRegistration = () => {
    navigate('/register')
  }

  return (
    <div className={s.loginContainer}>
      <h1 className={s.loginNameContainer}>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <div className={s.label}>
              <label className={s.loginNameLabel} htmlFor={'email'}>
                Email
              </label>
              <Input type="email" id="email" {...formik.getFieldProps('email')} />{' '}
              {formik.errors.email ? (
                <div className={s.loginError}>{formik.errors.email}</div>
              ) : null}
              <label className={s.loginNameLabel} htmlFor={'password'}>
                Password
              </label>
              <Input type="password" id={'password'} {...formik.getFieldProps('password')} />
              {formik.errors.password ? (
                <div className={s.passwordError}>{formik.errors.password}</div>
              ) : null}
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
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{ marginTop: 3, fontFamily: 'Montserrat' }}
            >
              Sign In
            </Button>
            {/*<div className={s.loginQuestion}>Do have an account?</div>*/}
            {/*<NavLink className={s.loginLink} to={'/register'}>*/}
            {/*  Sign Up*/}
            {/*</NavLink>*/}
          </FormGroup>
        </FormControl>
      </form>
      <div className={s.loginQuestion}>Do have an account?</div>
      {/*<NavLink className={s.loginLink} to={'/register'}>*/}
      {/*  Sign Up*/}
      {/*</NavLink>*/}

      <Button className={reg.btn_signin} onClick={navigatInRegistration}>
        Sign Up
      </Button>
    </div>
  )
}

export default SignIn
