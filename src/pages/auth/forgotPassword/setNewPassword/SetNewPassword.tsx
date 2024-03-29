import React from 'react'

import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { ErrorsType } from '../ForgotPassword'
import { changePasswordSuccess, setNewPasswordTC } from '../forgotPasswordReducer'

import s from './SetNewPassword.module.scss'

import { Button } from 'common/components/button/Button'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { changePasswordSelector } from 'common/selectors/Selectors'
import { PATH } from 'routes/routes'

export const SetNewPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
  const onChangePasswordSuccess = useAppSelector(changePasswordSelector)

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
      dispatch(setNewPasswordTC(values.password, token))
    },
  })

  if (onChangePasswordSuccess) {
    dispatch(changePasswordSuccess(false))
    navigate(PATH.SIGN_IN)
  }

  return (
    <section className={s.container}>
      <div className={s.popup}>
        <h2 className={s.title}>Create new password</h2>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <div className={s.label}>
            <Input
              className={s.input}
              type="password"
              error={formik.errors.password}
              placeholder="Password"
              {...formik.getFieldProps('password')}
            />
            <p className={s.subtitle}>Create new password and we will send ypu further instructions to email</p>
            <Button styleType="primary" disabled={!!formik.errors.password} className={s.button}>
              Create new password
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
