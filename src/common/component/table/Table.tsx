import React, { FC, ReactNode } from 'react'

import s from './Table.module.scss'

type TableType = {
  titles: string[]
  children: ReactNode
}
export const Table: FC<TableType> = ({ titles, children }) => {
  return (
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
  )
}
