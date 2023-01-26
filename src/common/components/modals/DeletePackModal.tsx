import React from 'react'

import { Modal } from './Modal'

import s from 'common/components/modals/Modals.module.scss'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsPackName, packIdSelector } from 'common/selectors/Selectors'
import { deletePackTC, togglePackModal } from 'pages/packs/packsSlice'

export const DeletePackModal = () => {
  const dispatch = useAppDispatch()

  const packIdFromState = useAppSelector(packIdSelector)
  const packName = useAppSelector(cardsPackName)

  const handleDeletePack = () => {
    dispatch(deletePackTC(packIdFromState))
    // dispatch(toggleModal(false))
    dispatch(togglePackModal(false))
  }

  return (
    <Modal title={'Delete Pack'} isSaveDataModal={handleDeletePack} typeBtn="delete">
      <p className={s.modalSubtitle}>
        Do you really want to remove <span className={s.modalSubtitleColor}>{packName}</span>? All cards will be
        deleted.
      </p>
    </Modal>
  )
}
