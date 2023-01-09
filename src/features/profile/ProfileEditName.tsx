import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { useAppDispatch } from '../../app/store'
import { CommonButton } from '../../common/component/generalComponents/Button/CommonButton'
import { CommonInput } from '../../common/component/generalComponents/Input/CommonInput'
import edit from '../profile/Profile.module.scss'

type ProfileEditNamePropsType = {
  setEditMode: (value: boolean) => void
}

export const ProfileEditName: React.FC<ProfileEditNamePropsType> = ({ setEditMode }) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
      // dispatch(updateProfileNameTC(values)).then()
      setEditMode(false)
      formik.resetForm()
    },
  })

  // useEffect(() => {
  //     formik.setFieldValue('name', profile.name)
  // }, [profile])

  return (
    <form onSubmit={formik.handleSubmit} className={edit.profile_form}>
      <label className={edit.profile_edit} htmlFor={'name'}>
        Nickname
      </label>
      <CommonInput type="text" id="name" {...formik.getFieldProps('name')} />

      <div className={edit.profile_btn_box_save}>
        <CommonButton className={edit.profile_btn_save} text={'save'} />
      </div>
    </form>
  )
}
