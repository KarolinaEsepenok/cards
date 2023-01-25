import React from 'react'

import { useDispatch } from 'react-redux'

import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { toggleCardModal } from 'pages/cards/cardsSlice'
import { setModalContent } from 'pages/packs/packsSlice'

export const EmptyPack = () => {
  const dispatch = useDispatch()

  const packName = useAppSelector(state => state.cards.packName)
  const modalContent = useAppSelector(state => state.packs.modalNode)
  // const toggleModalFromState = useAppSelector(state => state.app.toggleModal)
  const toggleModalFromState = useAppSelector(state => state.cards.toggleCardModal)

  const handleAddCard = () => {
    dispatch(setModalContent('addCard'))
    // dispatch(toggleModal(true))
    dispatch(toggleCardModal(true))
  }

  return (
    <div>
      <h2>{packName}</h2>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button onClick={handleAddCard} styleType={'primary'}>
        Add New Card
      </Button>
      {toggleModalFromState && modalContent === 'addCard' && <AddCardModal />}
    </div>
  )
}
