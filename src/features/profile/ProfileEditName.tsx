import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { Input } from '../../common/component/Input/Input'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { updateProfileNameTC } from '../auth/authReducer'
import s from '../profile/Profile.module.scss'
import reg from '../register/registration.module.scss'

type ProfileEditNamePropsType = {
  setEditMode: (value: boolean) => void
}

export const ProfileEditName: React.FC<ProfileEditNamePropsType> = ({ setEditMode }) => {
  const profileName = useAppSelector(state => state.auth.name)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
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
      />
    </form>
  )
}
