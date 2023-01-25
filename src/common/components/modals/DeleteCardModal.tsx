import React from 'react'

import { Modal } from './Modal'
import s from './Modals.module.scss'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { deleteCardTC, toggleCardModal } from 'pages/cards/cardsSlice'

export const DeleteCardModal = () => {
  const dispatch = useAppDispatch()
  const cardId = useAppSelector(state => state.cards.cards[0]._id)
  const question = useAppSelector(state => state.cards.cards[0].question)

  const handleDeleteCard = () => {
    dispatch(deleteCardTC(cardId))
    // dispatch(toggleModal(false))
    dispatch(toggleCardModal(false))
  }

  return (
    <Modal title={'Delete Card'} isSaveDataModal={handleDeleteCard} typeBtn="delete">
      <p>Do you really want to remove {question} card?</p>
    </Modal>
  )
}
