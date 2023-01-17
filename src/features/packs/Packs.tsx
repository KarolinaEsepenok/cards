import React, { FC, useEffect } from 'react'

import { formatDate } from '../../common/hooks/formatDate'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { cardPacks } from '../../common/selectors/Selectors'

import s from './Packs.module.scss'
import { PackType } from './packsApi'
import { getPacksTC } from './packsReducer'
export const Packs = () => {
  const packs: PackType[] = useAppSelector(cardPacks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  return (
    <>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Created by</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <>
            {packs.map(p => {
              const dateUpdate = formatDate(p.updated)

              return (
                <TableRow
                  key={p._id}
                  name={p.name}
                  cardsCount={p.cardsCount}
                  author={p.user_name}
                  updated={dateUpdate}
                />
              )
            })}
            <TableRow name={'Some Name'} cardsCount={10} author={'15.09'} updated={'16.09'} />
          </>
        </tbody>
      </table>
    </>
  )
}

type TableRowType = {
  name: string
  cardsCount: number
  author: string
  updated: string
}
export const TableRow: FC<TableRowType> = ({ name, cardsCount, author, updated }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{cardsCount}</td>
      <td>{updated}</td>
      <td>{author}</td>
      <td>actions</td>
    </tr>
  )
}
