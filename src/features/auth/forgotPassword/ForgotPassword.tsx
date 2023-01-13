import React from 'react'

import { Button, FormControl, FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { Input } from '../../../common/component/Input/Input'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import s from '../signIn/signIn.module.scss'

import { forgotPasswordTC } from './forgotPassword-reducer'

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
    <div className={s.loginContainer}>
      <h1 style={{ color: 'black' }}>Forgot your password?</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <div className={s.label}>
              <Input
                label="email"
                type="email"
                error={formik.errors.email}
                {...formik.getFieldProps('email')}
              />
              {/*
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}*/}

              <div style={{ color: 'black', opacity: 0.5 }}>
                Enter your email address and we will send you further instructions
              </div>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{ marginTop: 3, fontFamily: 'Montserrat' }}
                disabled={!!formik.errors.email}
              >
                Send instructions
              </Button>
              <div style={{ color: 'black', opacity: 0.5 }}>Did your remember your password?</div>
              <NavLink className={s.loginLink} to={'/signIn'}>
                Try to logging in
              </NavLink>
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  )
}
