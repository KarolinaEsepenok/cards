import React, { FC, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import { setPackId } from '../../cards/cardsReducer'

import s from './Pack.module.scss'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

type PackType = {
  name: string
  cardsCount: number
  author: string
  updated: string
  actions: ReactNode
  id: string
}

export const Pack: FC<PackType> = ({ name, cardsCount, author, updated, actions, id }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cardsGetHandler = () => {
    dispatch(setPackId(id))
    cardsCount ? navigate('/cards') : navigate('/empty-pack')
  }

  return (
    <tr>
      <td onClick={cardsGetHandler} className={s.name}>
        {name}
      </td>
      <td>{cardsCount}</td>
      <td>{updated}</td>
      <td>{author}</td>
      <td>{actions}</td>
    </tr>
  )
}
