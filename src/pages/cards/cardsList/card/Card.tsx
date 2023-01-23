import React, { FC, ReactNode } from 'react'

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
      <td>{grade}</td>

      {actions && <td>{actions}</td>}
    </tr>
  )
}
