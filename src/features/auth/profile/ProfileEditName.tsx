import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { Input } from '../../../common/component/Input/Input'
import style from '../../../common/component/Input/Input.module.scss'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { updateProfileNameTC } from '../authReducer'
import reg from '../register/registration.module.scss'

import s from './Profile.module.scss'

type ProfileEditNamePropsType = {
  setEditMode: (value: boolean) => void
}

interface FormikErrorType {
  name?: string
  avatar?: string
}

export const ProfileEditName: React.FC<ProfileEditNamePropsType> = ({ setEditMode }) => {
  const profileName = useAppSelector(state => state.auth.name)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.name.trim()) {
        errors.name = 'Name is required'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(updateProfileNameTC(values))
      setEditMode(false)
      formik.resetForm()
    },
  })

  useEffect(() => {
    formik.setFieldValue('name', profileName)
  }, [profileName])

  return (
    <form onSubmit={formik.handleSubmit} className={s.profile_form}>
      <Input
        className={reg.input}
        type="text"
        textChange={true}
        label="Nickname"
        {...formik.getFieldProps('name')}
        textChangeBtnCallback={formik.handleSubmit}
        disabled={!!formik.errors.name}
      />
      <span className={style.error}>{formik.errors.name}</span>
    </form>
  )
}