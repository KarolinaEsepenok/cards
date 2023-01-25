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
  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{update}</td>
      <td>
        <Rating name="read-only" value={grade} readOnly precision={0.2} />
      </td>

      {actions && <td>{actions}</td>}
    </tr>
  )
}
