import React, { useEffect } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { setIsLoading, toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Search } from 'common/modules/search/Search'
import {
  cardCreatorId,
  cardsPackName,
  cardsSelector,
  isLoadingSelector,
  myIdSelector,
} from 'common/selectors/Selectors'
import { CardsList } from 'pages/cards/cardsList/CardsList'
import { getCardsTC } from 'pages/cards/cardsSlice'
import { EmptyPack } from 'pages/packs/packsList/pack/emptyPack/EmptyPack'
import { PATH } from 'routes/routes'

export const Cards = () => {
  const isLoading = useAppSelector(isLoadingSelector)
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(cardsPackName)
  const myId = useAppSelector(myIdSelector)
  const packCreatorId = useAppSelector(cardCreatorId)
  const myPack = myId === packCreatorId
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)
  const page = useAppSelector(state => state.cards.queryParams.page)
  const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion)
  const sortCards = useAppSelector(state => state.cards.queryParams.sortCards)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getCardsTC(id))
  }, [page, pageCount, cardQuestion, sortCards])

  const handelLearnPack = () => {
    dispatch(setIsLoading(true))
    navigate(`/cards/${id}/learn`)
  }

  if (isLoading) return <></>

  return cards.length ? (
    <>
      <NavLink to={PATH.PACKS} className={s.link}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>

      <h2 className={s.title}>{packName}</h2>

      <div className={s.buttonsContainer}>
        <Button styleType="primary" onClick={handelLearnPack}>
          learn pack
        </Button>

        {myPack && (
          <Button onClick={() => dispatch(toggleModal(true))} styleType={'primary'}>
            Add New Card
          </Button>
        )}
      </div>

      <div className={s.searchContainer}>
        <Search class={s.search} selector={'Cards'} />
      </div>

      <CardsList cards={cards} />
    </>
  ) : (
    <EmptyPack />
  )
}
