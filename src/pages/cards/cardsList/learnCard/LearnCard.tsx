import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'

import s from './LearnCard.module.scss'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsSelector } from 'common/selectors/Selectors'
import { CardType } from 'pages/cards/cardsApi'
import { CardAnswer } from 'pages/cards/cardsList/learnCard/cardAnswer/cardAnswer'
import { CardQuestion } from 'pages/cards/cardsList/learnCard/cardQuestion/cardQuestion'
import { getCardsTC } from 'pages/cards/cardsSlice'
import { PATH } from 'routes/routes'

export const LearnCard = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(state => state.cards.packName)
  const dispatch = useAppDispatch()
  const [arr, setArr] = useState<CardType[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const { id } = useParams()

  console.log(cards)

  useEffect(() => {
    if (cards && !arr.length) setArr([...cards])
  }, [cards])

  useEffect(() => {
    if (id) dispatch(getCardsTC(id))
  }, [])

  const nextCard = () => {
    const copyArr = [...arr]

    copyArr.shift()
    setArr(copyArr)
    setShowAnswer(false)
  }

  if (!arr.length) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return arr.length > 1 ? (
    <div className={s.learnCard}>
      <NavLink to={PATH.PACKS} className={s.link}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>
      <h2 className={s.title}>Learn &quot;{packName}&quot;</h2>
      <div className={s.cardContainer}>
        {showAnswer ? (
          <CardAnswer cardId={arr[0]._id} answer={arr[0].answer} handelNextCard={nextCard} />
        ) : (
          <CardQuestion question={arr[0].question} handelShowAnswer={setShowAnswer} />
        )}
      </div>
    </div>
  ) : (
    <h2>вы прошлись по всей колоде, хотите учить еще раз?</h2>
  )
}
