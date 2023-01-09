import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { Button } from '../../common/component/Button/Button'
import { Input } from '../../common/component/Input/Input'
import { useAppDispatch } from '../../common/hooks/useDispatch'
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
      <Input type="text" id="name" {...formik.getFieldProps('name')} />

      <div className={edit.profile_btn_box_save}>
        <Button className={edit.profile_btn_save} text={'save'} />
      </div>
    </form>
  )
}
