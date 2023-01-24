import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsSelector } from 'common/selectors/Selectors'
import { CardType } from 'pages/cards/cardsApi'
import { getCardsTC } from 'pages/cards/cardsSlice'

export const Card = () => {
  const cards = useAppSelector(cardsSelector)
  const dispatch = useAppDispatch()
  const [arr, setArr] = useState<CardType[]>([])

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
  }

  if (!arr.length) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return arr.length > 1 ? (
    <div>
      <h2>Question: </h2>
      <p>{arr[0].question ? arr[0].question : 'loading'}</p>

      <h2>Answer: </h2>
      <p>{arr[0].answer ? arr[0].answer : 'loading'}</p>

      <Button styleType="primary" onClick={nextCard}>
        Next
      </Button>
    </div>
  ) : (
    <h2>вы прошлись по всей колоде, хотите учить еще раз?</h2>
  )
}
