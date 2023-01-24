import React, { FC, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Pack.module.scss'

import { setIsLoading } from 'app/appSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setPackId } from 'pages/cards/cardsSlice'

type PackType = {
  name: string
  cardsCount: number
  author: string
  updated: string
  actions: ReactNode
  packId: string
}

export const Pack: FC<PackType> = ({ name, cardsCount, author, updated, actions, packId }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cardsGetHandler = () => {
    dispatch(setPackId(packId))
    // dispatch(setPackName(name))
    dispatch(setIsLoading(true))
    navigate(`/cards/${packId}`)
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