import React from 'react'

import { useFormik } from 'formik'

import { Button } from '../../../common/component/Button/Button'
import { Checkbox } from '../../../common/component/Checkbox/Checkbox'
import { Input } from '../../../common/component/Input/Input'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'

import s from './addNewPack.module.scss'

export const UpdateNamePack = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      private: false,
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
      // dispatch(updateNamePackTC(id, values.name))
    },
  })

  return (
    <div className={s.newpack_inner}>
      <h2>Edit pack</h2>
      <div>x</div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Name pack"
          {...formik.getFieldProps('name')}
          textChangeBtnCallback={formik.handleSubmit}
        />

        <div className={s.remember}>
          <label htmlFor={'private'}>Private pack</label>
          <Checkbox id="private" {...formik.getFieldProps('private')} checked={formik.values.private} />
        </div>

        <Button styleType={'secondary'} type="button">
          Cancel
        </Button>
        <Button styleType={'primary'}>Save</Button>
      </form>
    </div>
  )
}
