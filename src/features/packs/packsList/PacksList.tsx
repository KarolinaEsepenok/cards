import React, { FC } from 'react'

import { PackActions } from './pack/actions/PackActions'
import { Pack } from './pack/Pack'
import s from './PackList.module.scss'

import arrowDown from 'assets/img/icons/arrowDown.png'
import arrowUp from 'assets/img/icons/arrowUp.png'
import { sortingPacksMethods } from 'common/constants/sortingPacksMethods/sortingPacksMethods'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { myIdSelector } from 'common/selectors/Selectors'
import list from 'common/style/List.module.scss'
import { formatDate } from 'common/utils/formatDate'
import { sortHelper } from 'common/utils/sortHelper'
import { PackType } from 'features/packs/packsApi'

type PacksTableType = {
  packs: PackType[]
}

export const PacksList: FC<PacksTableType> = ({ packs }) => {
  const myId = useAppSelector(myIdSelector)
  const dispatch = useAppDispatch()

  const sortMethod = useAppSelector(state => state.packs.queryParams.sortPacks)
  const arrowDirectionName =
    sortMethod === sortingPacksMethods.ascName ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionCards =
    sortMethod === sortingPacksMethods.ascCardsCount ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionDate =
    sortMethod === sortingPacksMethods.ascUpdate ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionCreated =
    sortMethod === sortingPacksMethods.ascUserName ? <img src={arrowUp} /> : <img src={arrowDown} />

  const universalSort = (m1: sortingPacksMethods, m2: sortingPacksMethods) => {
    sortHelper(dispatch, sortMethod, m1, m2)
  }

  return (
    <table className={list.table}>
      <thead>
        <tr>
          <th className={list.tableTitle}>
            <span
              onClick={() => universalSort(sortingPacksMethods.desName, sortingPacksMethods.ascName)}
              className={s.cursor}
            >
              Name {arrowDirectionName}
            </span>
          </th>
          <th className={list.tableTitle}>
            <span
              onClick={() => universalSort(sortingPacksMethods.desCardsCount, sortingPacksMethods.ascCardsCount)}
              className={s.cursor}
            >
              Cards {arrowDirectionCards}
            </span>
          </th>
          <th className={list.tableTitle}>
            <span
              onClick={() => universalSort(sortingPacksMethods.desUpdate, sortingPacksMethods.ascUpdate)}
              className={s.cursor}
            >
              Last Updated {arrowDirectionDate}
            </span>
          </th>
          <th className={list.tableTitle}>
            <span
              onClick={() => universalSort(sortingPacksMethods.desUserName, sortingPacksMethods.ascUserName)}
              className={s.cursor}
            >
              Created by {arrowDirectionCreated}
            </span>
          </th>
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
              packId={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              author={p.user_name}
              updated={dateUpdate}
              actions={<PackActions myPack={myPack} packId={p._id} name={p.name} />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
