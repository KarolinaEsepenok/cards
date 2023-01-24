import React, { FC } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './CardsList.module.scss'

import { setIsLoading, toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Search } from 'common/modules/search/Search'
import list from 'common/style/List.module.scss'
import { formatDate } from 'common/utils/formatDate'
import { CardType } from 'pages/cards/cardsApi'
import { CardRowActions } from 'pages/cards/cardsList/cardRow/actions/CardRowActions'
import { CardRow } from 'pages/cards/cardsList/cardRow/CardRow'

type CardsListType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListType> = ({ cards }) => {
  const myId = useAppSelector(state => state.auth.id)
  const packCreatorId = useAppSelector(state => state.cards.creatorId)
  const myPack = myId === packCreatorId
  const packId = useAppSelector(state => state.cards.packId)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelLearnPack = () => {
    dispatch(setIsLoading(true))
    navigate(`/cards/${packId}/learn`)
  }

  return (
    <>
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

      <AddCardModal />

      <div className={s.searchContainer}>
        <Search class={s.search} />
      </div>

      <table className={list.table}>
        <thead>
          <tr>
            <th className={list.tableTitle}>Question</th>
            <th className={list.tableTitle}>Answer</th>
            <th className={list.tableTitle}>Last Updated</th>
            <th className={list.tableTitle}>Grade</th>
            {myPack && <th className={list.tableTitle}>Actions</th>}
          </tr>
        </thead>
        <tbody className={list.tableBody}>
          {cards.map(c => {
            const dateUpdate = formatDate(c.updated)

            return (
              <CardRow
                key={c._id}
                question={c.question}
                answer={c.answer}
                update={dateUpdate}
                grade={Number(c.grade.toFixed(1))}
                actions={myPack && <CardRowActions cardId={c._id} question={c.question} answer={c.answer} />}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}
