import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

import { AddCardModal } from 'common/components/modals/AddCardModal'
import { DeleteCardModal } from 'common/components/modals/DeleteCackModal'
import { EditCardModal } from 'common/components/modals/EditCardModal'
import { Modal } from 'common/components/modals/Modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsSelector, isLoadingSelector } from 'common/selectors/Selectors'
import { CardsList } from 'pages/cards/cardsList/CardsList'
import { getCardsTC } from 'pages/cards/cardsSlice'
import { EmptyPack } from 'pages/packs/packsList/pack/emptyPack/EmptyPack'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const modalContent = useAppSelector(state => state.packs.modalСontent)

  const isLoading = useAppSelector(isLoadingSelector)
  const cards = useAppSelector(cardsSelector)

  let { id } = useParams()

  useEffect(() => {
    dispatch(getCardsTC(id ? id : ''))
  }, [])

  if (isLoading) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return (
    <div>
      {cards.length ? <CardsList cards={cards} /> : <EmptyPack />}

      <Modal>
        {modalContent === 'editCard' && <EditCardModal />}
        {modalContent === 'addCard' && <AddCardModal />}
        {modalContent === 'deleteCard' && <DeleteCardModal />}
      </Modal>
    </div>
  )
}
