import React, { FC, ReactNode } from 'react'

type TableRowType = {
  name: string
  cardsCount: number
  author: string
  updated: string
  actions: ReactNode
}

export const TableRow: FC<TableRowType> = ({ name, cardsCount, author, updated, actions }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{cardsCount}</td>
      <td>{updated}</td>
      <td>{author}</td>
      <td>{actions}</td>
    </tr>
  )
}
