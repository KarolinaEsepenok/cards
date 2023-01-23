import React from 'react'

import { useDispatch } from 'react-redux'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { setModalContent } from 'pages/packs/packsSlice'

export const EmptyPack = () => {
  const dispatch = useDispatch()

  const handleAddCard = () => {
    dispatch(setModalContent('addCard'))
    dispatch(toggleModal(true))
  }

  return (
    <div>
      <h2>{'Need render names pack'}</h2>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button onClick={handleAddCard} styleType={'primary'}>
        Add New Card
      </Button>
    </div>
  )
}
