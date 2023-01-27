import React from 'react'

import s from './CardActions.module.scss'

import edit from 'assets/img/icons/edit.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setEditCardData, toggleCardModal } from 'pages/cards/cardsSlice'
import { setModalContent } from 'pages/packs/packsSlice'

type CardActionsType = {
  cardId: string
  question: string
  answer: string
}

export const CardActions: React.FC<CardActionsType> = ({ cardId, question, answer }) => {
  const dispatch = useAppDispatch()

  const handleEditCard = () => {
    dispatch(setModalContent('editCard'))
    dispatch(toggleCardModal(true))
    dispatch(setEditCardData({ cardId, question, answer }))
  }

  const handlerDeleteCard = () => {
    dispatch(setModalContent('deleteCard'))
    dispatch(toggleCardModal(true))
    dispatch(setEditCardData({ cardId, question, answer }))
  }

  return (
    <>
      <Button styleType="icon" onClick={handleEditCard}>
        <div className={s.tooltip} data-tooltip="edit question/answer">
          <img src={edit} alt="icon edit" />
        </div>
      </Button>

      <Button styleType="icon" onClick={handlerDeleteCard}>
        <div className={s.tooltip} data-tooltip="delete this card">
          <img src={trash} alt="icon trash" />
        </div>
      </Button>
    </>
  )
}
