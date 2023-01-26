import React from 'react'

import edit from 'assets/img/icons/edit.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { DeleteCardModal } from 'common/components/modals/DeleteCardModal'
import { EditCardModal } from 'common/components/modals/EditCardModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { modalContentSelector } from 'common/selectors/Selectors'
import { setEditCardData, toggleCardModal } from 'pages/cards/cardsSlice'
import { setModalContent } from 'pages/packs/packsSlice'

type CardActionsType = {
  cardId: string
  question: string
  answer: string
}
export const CardActions: React.FC<CardActionsType> = ({ cardId, question, answer }) => {
  const dispatch = useAppDispatch()
  const modalContent = useAppSelector(modalContentSelector)
  // const toggleModalFromState = useAppSelector(state => state.app.toggleModal)
  const toggleModalFromState = useAppSelector(state => state.cards.toggleCardModal)

  const handleEditCard = () => {
    dispatch(setModalContent('editCard'))
    // dispatch(toggleModal(true))
    dispatch(toggleCardModal(true))
    dispatch(setEditCardData({ cardId, question, answer }))
  }

  const handlerDeleteCard = () => {
    dispatch(setModalContent('deleteCard'))
    // dispatch(toggleModal(true))
    dispatch(toggleCardModal(true))
    dispatch(setEditCardData({ cardId, question, answer }))
  }

  return (
    <>
      <Button styleType="icon" onClick={handleEditCard}>
        <img src={edit} alt="icon edit" />
      </Button>
      {toggleModalFromState && modalContent === 'editCard' && <EditCardModal />}

      <Button styleType="icon" onClick={handlerDeleteCard}>
        <img src={trash} alt="icon trash" />
      </Button>
      {toggleModalFromState && modalContent === 'deleteCard' && <DeleteCardModal />}
    </>
  )
}
