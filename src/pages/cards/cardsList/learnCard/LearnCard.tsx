import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Skeleton from '@mui/material/Skeleton'
import { NavLink, useParams } from 'react-router-dom'

import { Answer } from './answer/Answer'
import s from './LearnCard.module.scss'

import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsSelector } from 'common/selectors/Selectors'
import { CardType } from 'pages/cards/cardsApi'
import { getCardsTC } from 'pages/cards/cardsSlice'

export const LearnCard = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(state => state.cards.packName)
  const [showAnswer, setShowAnswer] = useState(false)
  const [card, setCard] = useState<CardType>()
  const [first, setFirst] = useState(true)

  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getCardsTC(id))
    }
  }, [])

  useEffect(() => {
    if (first && cards.length) {
      setCard(getCard(cards))
      setFirst(false)
    }
  }, [cards])

  const nextCard = () => {
    setShowAnswer(false)
    setCard(getCard(cards))
  }

  const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

        return { sum: newSum, id: newSum < rand ? i : acc.id }
      },
      { sum: 0, id: -1 }
    )

    return cards[res.id + 1]
  }

  if (!card) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return (
    <div className={s.learnCard}>
      <NavLink to={`/cards/${id}`} className={s.link}>
        <p>&lArr; Back to Pack List</p>
      </NavLink>

      <h2 className={s.title}>
        {packName ? `Learn pack '${packName}'` : <Skeleton sx={{ width: '300px', height: '40px' }} animation="wave" />}
      </h2>

      <div className={s.cardContainer}>
        <h3 className={s.subtitle}>
          Question:
          <span className={s.text}> {card.question}</span>
        </h3>

        {showAnswer ? (
          <Answer cardId={card._id} answer={card.answer} handelNextCard={nextCard} />
        ) : (
          <Button styleType="primary" onClick={() => setShowAnswer(true)}>
            Show answer
          </Button>
        )}
      </div>
    </div>
  )
}
