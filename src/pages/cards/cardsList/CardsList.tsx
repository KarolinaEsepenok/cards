import React, { FC } from 'react'

import s from './CardsList.module.scss'

import arrowDown from 'assets/img/icons/table-sort-arrow-down.svg'
import arrowUp from 'assets/img/icons/table-sort-arrow-up.svg'
import { sortingCardsMethods } from 'common/constants/sortingPacksMethods/sortingMethods'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardCreatorId, myIdSelector, sortCardsSelector } from 'common/selectors/Selectors'
import { formatDate } from 'common/utils/formatDate'
import { sortCardsHelper } from 'common/utils/sortCardsHelper'
import { CardType } from 'pages/cards/cardsApi'
import { CardActions } from 'pages/cards/cardsList/card/actions/CardActions'
import { Card } from 'pages/cards/cardsList/card/Card'

type CardsListType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListType> = ({ cards }) => {
  const myId = useAppSelector(myIdSelector)
  const sortMethod = useAppSelector(sortCardsSelector)
  const packCreatorId = useAppSelector(cardCreatorId)
  const dispatch = useAppDispatch()
  const myPack = myId === packCreatorId
  const arrowDirectionDate =
    sortMethod === sortingCardsMethods.ascUpdate ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />
  const arrowDirectionGrade =
    sortMethod === sortingCardsMethods.ascGrade ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />
  const universalSort = (m1: sortingCardsMethods, m2: sortingCardsMethods) => {
    sortCardsHelper(dispatch, sortMethod, m1, m2)
  }
  const sortByDate = () => {
    universalSort(sortingCardsMethods.desUpdate, sortingCardsMethods.ascUpdate)
  }
  const sortByGrade = () => {
    universalSort(sortingCardsMethods.desGrade, sortingCardsMethods.ascGrade)
  }

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th className={`${s.title} ${s.question}`}>Question</th>
          <th className={`${s.title} ${s.answer}`}>Answer</th>
          <th className={`${s.title} ${s.update}`}>
            <span onClick={sortByDate}>Last Updated {arrowDirectionDate}</span>
          </th>
          <th className={`${s.title} ${s.grade}`}>
            <span onClick={sortByGrade}>Grade {arrowDirectionGrade}</span>
          </th>
          {myPack && <th className={`${s.title} ${s.actions}`}>Actions </th>}
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
