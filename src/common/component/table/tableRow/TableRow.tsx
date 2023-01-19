import React, { FC, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import { setPackId } from '../../../../features/packs/cards/cardsReducer'
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
  const navigate = useNavigate()

  const cardsGetHandler = () => {
    dispatch(setPackId(id))
    cardsCount ? navigate('/cards') : navigate('/empty-pack')
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
