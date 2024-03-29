import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import reg from '../register/registration.module.scss'

import s from './Profile.module.scss'

import { Input } from 'common/components/Input/Input'
import style from 'common/components/Input/Input.module.scss'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { nameSelector } from 'common/selectors/Selectors'
import { updateProfileNameTC } from 'pages/auth/authSlice'

type ProfileEditNamePropsType = {
  setEditMode: (value: boolean) => void
}

interface FormikErrorType {
  name?: string
  avatar?: string
}

export const ProfileEditName: React.FC<ProfileEditNamePropsType> = ({ setEditMode }) => {
  const profileName = useAppSelector(nameSelector)
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

  //нужно чтоб в инпуте сохранялось имя прошлое при обновлении
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
