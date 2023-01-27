import React, { FC } from 'react'

import s from './CardsList.module.scss'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardCreatorId, myIdSelector } from 'common/selectors/Selectors'
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
    <table className={s.table}>
      <thead>
        <tr>
          <th className={`${s.title} ${s.question}`}>Question</th>
          <th className={`${s.title} ${s.answer}`}>Answer</th>
          <th className={`${s.title} ${s.update}`}>Last Updated</th>
          <th className={`${s.title} ${s.grade}`}>Grade</th>
          {myPack && <th className={`${s.title} ${s.actions}`}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {cards.map(c => {
          const dateUpdate = formatDate(c.updated)

          return (
            <Card
              key={c._id}
              question={c.question}
              answer={c.answer}
              update={dateUpdate}
              grade={c.grade}
              actions={myPack && <CardActions key={c._id} cardId={c._id} question={c.question} answer={c.answer} />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
