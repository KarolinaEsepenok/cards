import React from 'react'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import s from 'common/components/modals/Modals.module.scss'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { deleteCardTC } from 'pages/cards/cardsSlice'

export const DeleteCardModal = () => {
  const dispatch = useAppDispatch()
  const cardId = useAppSelector(state => state.cards.cards[0]._id)
  const question = useAppSelector(state => state.cards.cards[0].question)

  const handleDeleteCard = () => {
    dispatch(deleteCardTC(cardId))
    dispatch(toggleModal(false))
  }

  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <div onClick={handleClose} className={s.modal}>
      <div onClick={e => e.stopPropagation()} className={s.modalContent}>
        <span onClick={handleClose}>X</span>
        <h2>Delete Card</h2>
        <p>Do you really want to remove question: {question}? This card will be deleted.</p>
        <Button onClick={handleClose} styleType="secondary">
          Cancel
        </Button>
        <Button onClick={handleDeleteCard} styleType="warn">
          Delete
        </Button>
      </div>
    </div>
  )
}
