import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

import { EmptyPack } from '../packsList/pack/emptyPack/EmptyPack'

import { CardsList } from './cardsList/CardsList'
import { getCardsTC } from './cardsReducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const Cards = () => {
  const dispatch = useAppDispatch()

  const loader = useAppSelector(state => state.app.isLoading)
  const cards = useAppSelector(state => state.cards.cards)

  let { id } = useParams()

  useEffect(() => {
    dispatch(getCardsTC(id ? id : ''))
  }, [])

  if (loader) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return <div>{cards.length ? <CardsList cards={cards} /> : <EmptyPack />}</div>
}
