import React, { useEffect, useState } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { NavLink, useParams } from 'react-router-dom'

import { Answer } from './answer/Answer'
import s from './LearnCard.module.scss'

import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsPackName, cardsSelector, isLoadingSelector } from 'common/selectors/Selectors'
import { CardType } from 'pages/cards/cardsApi'
import { getCardsTC } from 'pages/cards/cardsSlice'

const skeletonTitleStyle = {
  width: '300px',
  height: '24x',
}

const skeletonSubtitleStyle = {
  width: '300px',
  height: '40px',
}

export const LearnCard = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(cardsPackName)
  const isLoading = useAppSelector(isLoadingSelector)
  const [showAnswer, setShowAnswer] = useState(false)
  const [card, setCard] = useState<CardType | null>(null)
  //const [first, setFirst] = useState(true)

  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardsTC(id ? id : ''))

    return () => {
      setCard(null)
      //setFirst(true)
    }
  }, [])

  // useEffect(() => {
  //   if (JSON.stringify(cards) !== JSON.stringify(cards)) {
  //
  //   }
  // }, [])

  useEffect(() => {
    // console.log('inside first useEffect')
    //  console.log(cards)
    // console.log(first)
    //
    // console.log('inside first2 useEffect')
    setCard(getCard(cards))
    //setFirst(false)
  }, [cards])

  const nextCard = () => {
    setShowAnswer(false)
    setCard(getCard(cards))
  }

  const getCard = (cards: CardType[]) => {
    console.log(cards)
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
    return <></>
  }

  return (
    <div className={s.learnCard}>
      <NavLink to={`/cards/${id}`} className={s.link}>
        <p>&lArr; Back to Pack List</p>
      </NavLink>

      <h2 className={s.title}>
        {packName ? `Learn pack '${packName}'` : <Skeleton sx={skeletonTitleStyle} animation="wave" />}
      </h2>

      <div className={s.cardContainer}>
        <h3 className={s.subtitle}>
          Question:
          {isLoading ? (
            <Skeleton sx={skeletonSubtitleStyle} animation="wave" />
          ) : (
            <span className={s.text}> {card.question}</span>
          )}
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
