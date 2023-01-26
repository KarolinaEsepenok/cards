import React from 'react'

import { Modal } from './Modal'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardIdSelector, questionSelector } from 'common/selectors/Selectors'
import { deleteCardTC, toggleCardModal } from 'pages/cards/cardsSlice'

export const DeleteCardModal = () => {
  const dispatch = useAppDispatch()
  const cardId = useAppSelector(cardIdSelector)
  const question = useAppSelector(questionSelector)

  const handleDeleteCard = () => {
    dispatch(deleteCardTC(cardId))
    dispatch(toggleCardModal(false))
  }

  return (
    <Modal title={'Delete Card'} isSaveDataModal={handleDeleteCard} typeBtn="delete">
      <p>Do you really want to remove {question} card?</p>
    </Modal>
  )
}
