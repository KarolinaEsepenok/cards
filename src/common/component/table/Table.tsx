import React, { FC, ReactNode } from 'react'

import { PackType } from '../../../features/packs/packsApi'
import { AddNewPack } from '../../../features/packs/packsList/pack/addNewPack/AddNewPack'
import { useAppSelector } from '../../hooks/useAppSelector'
import { cardPacks } from '../../selectors/Selectors'

import s from './Table.module.scss'

type TableType = {
  titles: string[]
  children: ReactNode
}
export const Table: FC<TableType> = ({ titles, children }) => {
  const packs = useAppSelector(cardPacks)

  return (
    <>
      <table className={s.table}>
        <thead>
          <tr>
            {titles.map(t => (
              <th key={t}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>

      <div>
        <AddNewPack />
        {/*need for check*/}
        <button>add new pack</button>
        {packs.map((i: PackType) => (
          <div key={i._id}>{i.name}</div>
        ))}
      </div>
    </>
  )
}
