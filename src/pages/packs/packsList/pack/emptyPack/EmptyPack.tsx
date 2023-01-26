import React from 'react'

import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsPackName, modalContentSelector, toggleCardModalSelector } from 'common/selectors/Selectors'
import s from 'pages/cards/Cards.module.scss'
import { toggleCardModal } from 'pages/cards/cardsSlice'
import { setModalContent } from 'pages/packs/packsSlice'
import { PATH } from 'routes/routes'

export const EmptyPack = () => {
  const dispatch = useDispatch()

  const packName = useAppSelector(cardsPackName)
  const modalContent = useAppSelector(modalContentSelector)
  const toggleModalFromState = useAppSelector(toggleCardModalSelector)

  const handleAddCard = () => {
    dispatch(setModalContent('addCard'))
    dispatch(toggleCardModal(true))
  }

  return (
    <div>
      <NavLink to={PATH.PACKS} className={s.link}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>

      <h2>{packName}</h2>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button onClick={handleAddCard} styleType={'primary'}>
        Add New Card
      </Button>

      {toggleModalFromState && modalContent === 'addCard' && <AddCardModal />}
    </div>
  )
}
