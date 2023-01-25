import React, { FC, ReactNode } from 'react'

import Rating from '@mui/material/Rating'

type CardType = {
  question: string
  answer: string
  update: string
  grade: number
  actions?: ReactNode
}

export const Card: FC<CardType> = ({ question, answer, update, grade, actions }) => {
  if (grade === undefined) {
    grade = 0
  }

  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{update}</td>
      <td>{<Rating name="read-only" value={+grade.toFixed(2)} readOnly precision={0.2} />}</td>

      {actions && <td>{actions}</td>}
    </tr>
  )
}
