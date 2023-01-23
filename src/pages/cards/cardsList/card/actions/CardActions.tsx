import React from 'react'

import { toggleModal } from 'app/appSlice'
import edit from 'assets/img/icons/edit.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
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
    dispatch(toggleModal(true))
  }
  const handlerDeletePack = () => {
    // dispatch(deleteCardTC(cardId))
    dispatch(setModalContent('deleteCard'))
    dispatch(toggleModal(true))
  }

  return (
    <>
      <Button styleType="icon" onClick={handleEditCard}>
        <img src={edit} alt="icon edit" />
      </Button>

      <Button styleType="icon" onClick={handlerDeletePack}>
        <img src={trash} alt="icon trash" />
      </Button>
    </>
  )
}
