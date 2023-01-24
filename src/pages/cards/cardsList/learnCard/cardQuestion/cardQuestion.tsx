import React, { FC } from 'react'

import { Skeleton } from '@mui/material'

import s from './CardQuestion.module.scss'

import { Button } from 'common/components/button/Button'
type CardQuestionType = {
  question: string
  handelShowAnswer: (value: boolean) => void
}
export const CardQuestion: FC<CardQuestionType> = ({ question, handelShowAnswer }) => {
  return (
    <>
      <h3 className={s.title}>
        Question: {question ? <span className={s.subtitle}>{question}</span> : <Skeleton animation="wave" />}
      </h3>

      <Button styleType="primary" onClick={() => handelShowAnswer(true)}>
        Show answer
      </Button>
    </>
  )
}
