import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { Button } from '../../common/component/Button/Button'
import { Input } from '../../common/component/Input/Input'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { updateProfileNameTC } from '../auth/authReducer'
import edit from '../profile/Profile.module.scss'

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
      // alert(JSON.stringify(values, null, 2))
      dispatch(updateProfileNameTC(values))
      setEditMode(false)
      formik.resetForm()
    },
  })

  useEffect(() => {
    formik.setFieldValue('name', profileName)
  }, [profileName])

  return (
    <form onSubmit={formik.handleSubmit} className={edit.profile_form}>
      <label className={edit.profile_edit} htmlFor={'name'}>
        Nickname
      </label>
      <Input type="text" id="name" {...formik.getFieldProps('name')} />

      <div className={edit.profile_btn_save}>
        <Button styleType="primary">Save</Button>
      </div>
    </form>
  )
}
