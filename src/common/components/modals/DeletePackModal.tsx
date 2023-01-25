import React from 'react'

import { Modal } from './Modal'
import s from './Modals.module.scss'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { deletePackTC, togglePackModal } from 'pages/packs/packsSlice'

export const DeletePackModal = () => {
  const dispatch = useAppDispatch()

  const packIdFromState = useAppSelector(state => state.cards.packId)
  const packName = useAppSelector(state => state.cards.packName)

  const handleDeletePack = () => {
    dispatch(deletePackTC(packIdFromState))
    // dispatch(toggleModal(false))
    dispatch(togglePackModal(false))
  }

  return (
    <Modal title={'Delete Pack'} isSaveDataModal={handleDeletePack} typeBtn="delete">
      <p>Do you really want to remove {packName}? All cards will be deleted.</p>
    </Modal>
  )
}
