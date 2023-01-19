import React, { FC } from 'react'

import s from '../../../../common/component/table/Table.module.scss'
import { formatDate } from '../../../../common/hooks/formatDate'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { CardType } from '../cardsApi'

import { Actions } from './card/actions/Actions'
import { Card } from './card/Card'

type CardsListType = {
  cards: CardType[]
}
export const CardsList: FC<CardsListType> = ({ cards }) => {
  const myId = useAppSelector(state => state.auth.id)
  const packCreatorId = useAppSelector(state => state.cards.creatorId)
  const myPack = myId === packCreatorId

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th className={s.tableTitle}>Question</th>
          <th className={s.tableTitle}>Answer</th>
          <th className={s.tableTitle}>Last Updated</th>
          <th className={s.tableTitle}>Grade</th>
          {myPack && <th className={s.tableTitle}>Actions</th>}
        </tr>
      </thead>
      <tbody className={s.tableBody}>
        {cards.map(c => {
          const dateUpdate = formatDate(c.updated)

          return (
            <Card
              key={c._id}
              question={c.question}
              answer={c.answer}
              update={dateUpdate}
              grade={c.grade}
              actions={myPack && <Actions />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
