import React, { FC } from 'react'

import { CardType } from '../cardsApi'

import { CardActions } from './card/actions/CardActions'
import { Card } from './card/Card'

import { useAppSelector } from 'common/hooks/useAppSelector'
import list from 'common/style/List.module.scss'
import { formatDate } from 'common/utils/formatDate'

type CardsListType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListType> = ({ cards }) => {
  const myId = useAppSelector(state => state.auth.id)
  const packCreatorId = useAppSelector(state => state.cards.creatorId)
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
              grade={c.grade}
              actions={myPack && <CardActions />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
