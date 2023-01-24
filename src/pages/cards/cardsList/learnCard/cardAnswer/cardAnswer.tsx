import React, { FC } from 'react'

import { Skeleton } from '@mui/material'

import { Button } from 'common/components/button/Button'
type CardAnswerType = {
  answer: string
  handelNextCard: () => void
}
export const CardAnswer: FC<CardAnswerType> = ({ answer, handelNextCard }) => {
  return (
    <>
      <h2>Answer: </h2>
      {answer ? <p>{answer}</p> : <Skeleton animation="wave" />}
      <Button styleType="primary" onClick={() => handelNextCard()}>
        Next
      </Button>
    </>
  )
}
