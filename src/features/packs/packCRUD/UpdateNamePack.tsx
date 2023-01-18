import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { Button } from '../../../common/component/Button/Button'
import { Checkbox } from '../../../common/component/Checkbox/Checkbox'
import { Input } from '../../../common/component/Input/Input'
import style from '../../../common/component/Input/Input.module.scss'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { updateNamePackTC } from '../packsReducer'

import s from './packCRUD.module.scss'

type UpdateNamePackType = {
  togglePopup: () => void
  packId: string
  packName: string
}
interface FormikErrorType {
  name?: string
  private?: boolean
}
export const UpdateNamePack: React.FC<UpdateNamePackType> = ({ togglePopup, packId, packName }) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      private: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.name.trim()) {
        errors.name = 'Name is required'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(updateNamePackTC(packId, values.name))
      togglePopup()
    },
  })

  useEffect(() => {
    formik.setFieldValue('name', packName)
  }, [packName])

  return (
    <div className={s.newpack_inner}>
      <h2>Edit pack</h2>
      <div onClick={togglePopup}>x</div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Name pack"
          {...formik.getFieldProps('name')}
          textChangeBtnCallback={formik.handleSubmit}
        />
        <span className={style.error}>{formik.errors.name}</span>

        <div className={s.remember}>
          <label htmlFor={'private'}>Private pack</label>
          <Checkbox id="private" {...formik.getFieldProps('private')} checked={formik.values.private} />
        </div>

        <Button styleType={'secondary'} type="button" onClick={togglePopup}>
          Cancel
        </Button>
        <Button styleType={'primary'} disabled={!!formik.errors.name}>
          Save
        </Button>
      </form>
    </div>
  )
}
