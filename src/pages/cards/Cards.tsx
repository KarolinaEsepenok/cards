import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { NavLink, useParams } from 'react-router-dom'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsSelector, isLoadingSelector } from 'common/selectors/Selectors'
import { CardsList } from 'pages/cards/cardsList/CardsList'
import s from 'pages/cards/cardsList/learnCard/LearnCard.module.scss'
import { getCardsTC } from 'pages/cards/cardsSlice'
import { EmptyPack } from 'pages/packs/packsList/pack/emptyPack/EmptyPack'
import { PATH } from 'routes/routes'

export const Cards = () => {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(isLoadingSelector)
  const cards = useAppSelector(cardsSelector)

  let { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getCardsTC(id))
  }, [])

  if (isLoading) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return cards.length ? (
    <>
      <NavLink to={PATH.PACKS} className={s.link}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>

      <CardsList cards={cards} />
    </>
  ) : (
    <EmptyPack />
  )
}
