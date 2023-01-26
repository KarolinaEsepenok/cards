import React, { FC, ReactNode } from 'react'

import Rating from '@mui/material/Rating'

import s from './Card.module.scss'

type CardType = {
  question: string
  answer: string
  update: string
  grade: number
  actions?: ReactNode
}

export const Card: FC<CardType> = ({ question, answer, update, grade, actions }) => {
  if (grade === undefined) grade = 0
  const gradePercent = Math.round((grade * 100) / 5)

  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{update}</td>
      <td>
        <span className={s.tooltip} data-tooltip={`I know the answer to ${gradePercent}%`}>
          <Rating name="read-only" value={grade} readOnly precision={0.2} />
        </span>
      </td>

      {actions && <td>{actions}</td>}
    </tr>
  )
}
