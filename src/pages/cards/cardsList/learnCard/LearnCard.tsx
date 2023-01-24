import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsSelector } from 'common/selectors/Selectors'
import { CardType } from 'pages/cards/cardsApi'
import { CardAnswer } from 'pages/cards/cardsList/learnCard/cardAnswer/cardAnswer'
import { CardQuestion } from 'pages/cards/cardsList/learnCard/cardQuestion/cardQuestion'
import { getCardsTC } from 'pages/cards/cardsSlice'

export const LearnCard = () => {
  const cards = useAppSelector(cardsSelector)
  const dispatch = useAppDispatch()
  const [arr, setArr] = useState<CardType[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    if (cards) setArr([...cards])
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
    <div>
      {!showAnswer && <CardQuestion question={arr[0].question} handelShowAnswer={setShowAnswer} />}
      {showAnswer && <CardAnswer answer={arr[0].answer} handelNextCard={nextCard} />}
    </div>
  ) : (
    <h2>вы прошлись по всей колоде, хотите учить еще раз?</h2>
  )
}
