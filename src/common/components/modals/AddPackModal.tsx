import React, { useState } from 'react'

import s from './Modals.module.scss'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addNewPackTC } from 'pages/packs/packsSlice'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const handleAddPack = () => {
    dispatch(addNewPackTC({ cardsPack: { name, deckCover: '', private: false } }))
    dispatch(toggleModal(false))
  }

  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <div onClick={handleClose} className={s.modal}>
      <div onClick={e => e.stopPropagation()} className={s.modalContent}>
        <span onClick={handleClose}>X</span>
        <h2>Add new pack</h2>
        <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" />
        <Checkbox />

        <Button onClick={handleClose} styleType={'secondary'}>
          Cancel
        </Button>
        <Button onClick={handleAddPack} styleType="primary">
          Save
        </Button>
      </div>
    </div>
  )
}
