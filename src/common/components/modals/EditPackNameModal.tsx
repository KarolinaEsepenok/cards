import React, { useState } from 'react'

import s from './Modals.module.scss'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { updateNamePackTC } from 'pages/packs/packsSlice'

export const EditPackNameModal = () => {
  const dispatch = useAppDispatch()
  const packIdFromState = useAppSelector(state => state.cards.packId)
  const packNameFromState = useAppSelector(state => state.cards.packName)

  const [nameValue, setNameValue] = useState<string>(packNameFromState)

  const handleAddPack = () => {
    dispatch(updateNamePackTC(packIdFromState, nameValue))
    dispatch(toggleModal(false))
  }
  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <div onClick={handleClose} className={s.modal}>
      <div onClick={e => e.stopPropagation()} className={s.modalContent}>
        <span onClick={handleClose}>X</span>
        <h2>Edit pack</h2>
        <Input
          autoFocus
          value={nameValue}
          onChange={e => setNameValue(e.currentTarget.value)}
          type="text"
          label="Name pack"
        />
        <Checkbox />

        <Button onClick={handleClose} styleType="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddPack} styleType="primary">
          Save
        </Button>
      </div>
    </div>
  )
}
