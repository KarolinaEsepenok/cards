import React, { FC } from 'react'

import { useDispatch } from 'react-redux'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { useAppSelector } from 'common/hooks/useAppSelector'
import list from 'common/style/List.module.scss'
import { formatDate } from 'common/utils/formatDate'
import { CardType } from 'pages/cards/cardsApi'
import { CardActions } from 'pages/cards/cardsList/card/actions/CardActions'
import { Card } from 'pages/cards/cardsList/card/Card'
import { setModalContent } from 'pages/packs/packsSlice'

type CardsListType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListType> = ({ cards }) => {
  const myId = useAppSelector(state => state.auth.id)
  const packCreatorId = useAppSelector(state => state.cards.creatorId)
  const myPack = myId === packCreatorId

  const dispatch = useDispatch()

  const handleAddCard = () => {
    dispatch(setModalContent('addCard'))
    dispatch(toggleModal(true))
  }

  return (
    <>
      {myPack && (
        <Button onClick={handleAddCard} styleType={'primary'}>
          Add New Card
        </Button>
      )}

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
              <Card
                key={c._id}
                question={c.question}
                answer={c.answer}
                update={dateUpdate}
                grade={c.grade}
                actions={myPack && <CardActions cardId={c._id} question={c.question} answer={c.answer} />}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}
