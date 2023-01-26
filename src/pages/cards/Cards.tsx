import React, { useEffect } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { setIsLoading } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Search } from 'common/modules/search/Search'
import {
  cardCreatorId,
  cardsPackName,
  cardsSelector,
  isLoadingSelector,
  modalContentSelector,
  myIdSelector,
} from 'common/selectors/Selectors'
import { CardsList } from 'pages/cards/cardsList/CardsList'
import { getCardsTC, toggleCardModal } from 'pages/cards/cardsSlice'
import { LongMenu } from 'pages/cards/MenuMyCard'
import { EmptyPack } from 'pages/packs/packsList/pack/emptyPack/EmptyPack'
import { setModalContent } from 'pages/packs/packsSlice'
import { PATH } from 'routes/routes'

export const Cards = () => {
  const isLoading = useAppSelector(isLoadingSelector)
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(cardsPackName)
  const myId = useAppSelector(myIdSelector)
  const packCreatorId = useAppSelector(cardCreatorId)
  const modalContent = useAppSelector(modalContentSelector)
  // const toggleModalFromState = useAppSelector(state => state.app.toggleModal)
  const toggleModalFromState = useAppSelector(state => state.cards.toggleCardModal)

  const myPack = myId === packCreatorId

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getCardsTC(id))
  }, [])

  const handelLearnPack = () => {
    dispatch(setIsLoading(true))
    navigate(`/cards/${id}/learn`)
  }

  const handleAddCard = () => {
    dispatch(setModalContent('addCard'))
    // dispatch(toggleModal(true))
    dispatch(toggleCardModal(true))
  }

  if (isLoading) return <></>

  return cards.length ? (
    <>
      <NavLink to={PATH.PACKS} className={s.link}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>

      <h2 className={s.title}>{packName}</h2>
      <LongMenu />

      <div className={s.buttonsContainer}>
        <Button styleType="primary" onClick={handelLearnPack}>
          learn pack
        </Button>

        {myPack && (
          <Button onClick={handleAddCard} styleType={'primary'}>
            Add New Card
          </Button>
        )}
        {toggleModalFromState && modalContent === 'addCard' && <AddCardModal />}
      </div>

      <div className={s.searchContainer}>
        <Search class={s.search} />
      </div>

      <CardsList cards={cards} />
    </>
  ) : (
    <EmptyPack />
  )
}
