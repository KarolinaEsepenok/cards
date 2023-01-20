import React, { FC } from 'react'

import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { myIdSelector } from '../../../common/selectors/Selectors'
import list from '../../../common/style/List.module.scss'
import { formatDate } from '../../../common/utils/formatDate'
import { PackType } from '../packsApi'

import { PackActions } from './pack/actions/PackActions'
import { Pack } from './pack/Pack'

type PacksTableType = {
  packs: PackType[]
}

export const PacksList: FC<PacksTableType> = ({ packs }) => {
  const myId = useAppSelector(myIdSelector)

  return (
    <table className={list.table}>
      <thead>
        <tr>
          <th className={list.tableTitle}>Name</th>
          <th className={list.tableTitle}>Cards</th>
          <th className={list.tableTitle}>Last Updated</th>
          <th className={list.tableTitle}>Created by</th>
          <th className={list.tableTitle}>Actions</th>
        </tr>
      </thead>
      <tbody className={list.tableBody}>
        {packs.map(p => {
          const dateUpdate = formatDate(p.updated)
          const myPack = p.user_id === myId

          return (
            <Pack
              key={p._id}
              id={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              author={p.user_name}
              updated={dateUpdate}
              actions={<PackActions myPack={myPack} packId={p._id} packName={p.name} />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
