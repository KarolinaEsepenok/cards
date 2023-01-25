import React, { FC } from 'react'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardCreatorId, myIdSelector } from 'common/selectors/Selectors'
import list from 'common/style/List.module.scss'
import { formatDate } from 'common/utils/formatDate'
import { CardType } from 'pages/cards/cardsApi'
import { CardActions } from 'pages/cards/cardsList/card/actions/CardActions'
import { Card } from 'pages/cards/cardsList/card/Card'

type CardsListType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListType> = ({ cards }) => {
  const myId = useAppSelector(myIdSelector)
  const packCreatorId = useAppSelector(cardCreatorId)
  const myPack = myId === packCreatorId

  return (
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
              // grade={Number(c.grade.toFixed(2))}
              grade={c.grade}
              actions={myPack && <CardActions cardId={c._id} question={c.question} answer={c.answer} />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
