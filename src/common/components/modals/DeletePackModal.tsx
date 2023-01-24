import React from 'react'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import s from 'common/components/modals/Modals.module.scss'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { deletePackTC } from 'pages/packs/packsSlice'

export const DeletePackModal = () => {
  const dispatch = useAppDispatch()

  const packIdFromState = useAppSelector(state => state.cards.packId)

  const handleAddPack = () => {
    dispatch(deletePackTC(packIdFromState))
    dispatch(toggleModal(false))
  }

  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <div onClick={handleClose} className={s.modal}>
      <div onClick={e => e.stopPropagation()} className={s.modalContent}>
        <span onClick={handleClose}>X</span>
        <h2>delete Pack</h2>
        <p>Do you really want to remove Pack Name? All cards will be deleted.</p>
        <Button onClick={handleClose} styleType="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddPack} styleType="warn">
          Delete
        </Button>
      </div>
    </div>
  )
}
