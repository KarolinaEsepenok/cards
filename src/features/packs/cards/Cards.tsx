import React, { useEffect } from 'react'

import { CardsList } from './cardsList/CardsList'
import { getCardsTC } from './cardsReducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const cardsPackId = useAppSelector(state => state.cards.packId)

  useEffect(() => {
    dispatch(getCardsTC(cardsPackId))
  }, [])

  return (
    <div>
      <CardsList cards={cards} />
    </div>
  )
}
