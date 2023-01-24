import React, { FC } from 'react'

import { Skeleton } from '@mui/material'

import { Button } from 'common/components/button/Button'
type CardQuestionType = {
  question: string
  handelShowAnswer: (value: boolean) => void
}
export const CardQuestion: FC<CardQuestionType> = ({ question, handelShowAnswer }) => {
  return (
    <>
      <h2>Question: </h2>
      {question ? <p>{question}</p> : <Skeleton animation="wave" />}
      <Button styleType="primary" onClick={() => handelShowAnswer(true)}>
        Show answer
      </Button>
    </>
  )
}
