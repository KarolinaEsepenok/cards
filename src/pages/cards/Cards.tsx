import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { setIsLoading } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/cardModals/AddCardModal'
import { DeleteCardModal } from 'common/components/modals/cardModals/DeleteCardModal'
import { EditCardModal } from 'common/components/modals/cardModals/EditCardModal'
import { DeletePackModal } from 'common/components/modals/packModals/DeletePackModal'
import { EditPackNameModal } from 'common/components/modals/packModals/EditPackNameModal'
import { circularProgressStyle } from 'common/constants/circularProgressStyle'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { EmptyList } from 'common/modules/emptyList/EmptyList'
import { Search } from 'common/modules/search/Search'
import {
  cardCreatorId,
  cardQuestionSelector,
  cardsPackName,
  cardsSelector,
  deletePackSelector,
  loadingCardsSelector,
  modalContentSelector,
  myIdSelector,
  pageCardsSelector,
  pageCountCardsSelector,
  sortCardsSelector,
  toggleCardModalSelector,
  togglePackModalSelector,
} from 'common/selectors/Selectors'
import { CardsList } from 'pages/cards/cardsList/CardsList'
import { getCardsTC, toggleCardModal } from 'pages/cards/cardsSlice'
import { MenuMyCard } from 'pages/cards/menuMyCard/MenuMyCard'
import { setDeleteInPacks, setModalContent, togglePackModal } from 'pages/packs/packsSlice'
import { PATH } from 'routes/routes'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(cardsPackName)
  const myId = useAppSelector(myIdSelector)
  const packCreatorId = useAppSelector(cardCreatorId)
  const modalContent = useAppSelector(modalContentSelector)
  const toggleModalCardFromState = useAppSelector(toggleCardModalSelector)
  const toggleModalPackFromState = useAppSelector(togglePackModalSelector)
  const loading = useAppSelector(loadingCardsSelector)
  const pageCount = useAppSelector(pageCountCardsSelector)
  const page = useAppSelector(pageCardsSelector)
  const cardQuestion = useAppSelector(cardQuestionSelector)
  const sortCards = useAppSelector(sortCardsSelector)
  const deletePack = useAppSelector(deletePackSelector)
  const myPack = myId === packCreatorId
  const cardsList = cards.length ? <CardsList cards={cards} /> : <EmptyList />

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    dispatch(getCardsTC(id ? id : ''))
  }, [page, pageCount, cardQuestion, sortCards])

  useEffect(() => {
    if (deletePack) navigate('/packs')
  }, [deletePack])

  const handelLearnPack = () => {
    dispatch(setIsLoading(true))
    navigate(`/cards/${id}/learn`)
  }

  const handleAddCard = () => {
    dispatch(setModalContent('addCard'))
    dispatch(toggleCardModal(true))
  }

  const handelEditPack = () => {
    dispatch(togglePackModal(true))
    dispatch(setModalContent('editPackName'))
  }
  const handelDeletePack = () => {
    dispatch(setDeleteInPacks(false))
    dispatch(setModalContent('deletePack'))
    dispatch(togglePackModal(true))
  }

  return (
    <>
      <Link to={PATH.PACKS} className={`${s.link} ${loading ? s.linkDisabled : ''}`}>
        <p>&lArr; Back to Packs List</p>
      </Link>

      <div className={s.headerContainer}>
        <h2 className={s.title}>
          {packName}
          <MenuMyCard
            learnPackCallback={handelLearnPack}
            deletePackCallback={handelDeletePack}
            editPackCallback={handelEditPack}
          />
        </h2>

        {myPack && (
          <Button onClick={handleAddCard} styleType={'primary'}>
            Add New Card
          </Button>
        )}

        {toggleModalCardFromState && modalContent === 'addCard' && <AddCardModal />}
        {toggleModalCardFromState && modalContent === 'editCard' && <EditCardModal />}
        {toggleModalCardFromState && modalContent === 'deleteCard' && <DeleteCardModal />}

        {toggleModalPackFromState && modalContent === 'editPackName' && <EditPackNameModal />}
        {toggleModalPackFromState && modalContent === 'deletePack' && <DeletePackModal />}
      </div>

      <div className={s.searchContainer}>
        <Search class={s.search} selector={'Cards'} />
      </div>

      {loading ? <CircularProgress sx={circularProgressStyle} /> : cardsList}
    </>
  )
}
