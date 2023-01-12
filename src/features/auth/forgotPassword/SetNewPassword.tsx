import React from 'react'

import { Button, FormControl, FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { InputM } from '../../../common/component/Input/InputM'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import s from '../signIn/signIn.module.scss'

import { ErrorsType } from './ForgotPassword'
import { setNewPassword } from './forgotPassword-reducer'

export const SetNewPassword = () => {
  const changePasswordSuccess = useAppSelector(state => state.password.changePasswordSuccess)
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: ErrorsType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Field should be 8 symbols or more'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(setNewPassword(values.password, token))
    },
  })

  if (changePasswordSuccess) {
    navigate('/signIn')
  }

  return (
    <div className={s.loginContainer}>
      <h1 style={{ color: 'black' }}>Create new password</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <div className={s.label}>
              <label className={s.loginNameLabel} htmlFor={'password'}>
                Password
              </label>
              <InputM label={'Password'} id={'password'} {...formik.getFieldProps('password')} />
              {/*<Input type="password" id="password" {...formik.getFieldProps('password')} />*/}
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <div style={{ color: 'black', opacity: 0.5 }}>
                Create new password and we will send ypu further instructions to email
              </div>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{ marginTop: 3, fontFamily: 'Montserrat' }}
                disabled={!!formik.errors.password}
              >
                Create new password
              </Button>
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  )
}
