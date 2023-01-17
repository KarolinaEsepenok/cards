import React, { FC, ReactNode } from 'react'

import { getCardsTC } from '../../../../features/packs/cards/catdsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

type TableRowType = {
  name: string
  cardsCount: number
  author: string
  updated: string
  actions: ReactNode
  id: string
}

export const TableRow: FC<TableRowType> = ({ name, cardsCount, author, updated, actions, id }) => {
  const dispatch = useAppDispatch()

  const cardsGetHandler = () => {
    dispatch(getCardsTC(id))
  }

  return (
    <tr>
      <td onClick={cardsGetHandler}>{name}</td>
      <td>{cardsCount}</td>
      <td>{updated}</td>
      <td>{author}</td>
      <td>{actions}</td>
    </tr>
  )
}
