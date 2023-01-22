import React, { FC } from 'react'

import arrowDown from '../../../assets/img/icons/arrowDown.png'
import arrowUp from '../../../assets/img/icons/arrowUp.png'
import { sortingPacksMethods } from '../../../common/constants/sortingPacksMethods/sortingPacksMethods'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { myIdSelector } from '../../../common/selectors/Selectors'
import list from '../../../common/style/List.module.scss'
import { formatDate } from '../../../common/utils/formatDate'
import { PackType } from '../packsApi'
import { setSort } from '../packsReducer'

import { PackActions } from './pack/actions/PackActions'
import { Pack } from './pack/Pack'

type PacksTableType = {
  packs: PackType[]
}

export const PacksList: FC<PacksTableType> = ({ packs }) => {
  const myId = useAppSelector(myIdSelector)
  const dispatch = useAppDispatch()
  const sortMethod = useAppSelector(state => state.packs.queryParams.sortPacks)
  const arrowDirectionName =
    sortMethod === sortingPacksMethods.desName ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionCards =
    sortMethod === sortingPacksMethods.desCardsCount ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionDate =
    sortMethod === sortingPacksMethods.desUpdate ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionCreated =
    sortMethod === sortingPacksMethods.desUserName ? <img src={arrowUp} /> : <img src={arrowDown} />

  const sortByNameHandler = () => {
    sortMethod === sortingPacksMethods.desName
      ? dispatch(setSort(sortingPacksMethods.ascName))
      : dispatch(setSort(sortingPacksMethods.desName))
  }

  const sortByDateHandler = () => {
    sortMethod === sortingPacksMethods.desUpdate
      ? dispatch(setSort(sortingPacksMethods.ascUpdate))
      : dispatch(setSort(sortingPacksMethods.desUpdate))
  }

  const sortByCardsHandler = () => {
    sortMethod === sortingPacksMethods.desCardsCount
      ? dispatch(setSort(sortingPacksMethods.ascCardsCount))
      : dispatch(setSort(sortingPacksMethods.desCardsCount))
  }

  const sortByCreateHandler = () => {
    sortMethod === sortingPacksMethods.desUserName
      ? dispatch(setSort(sortingPacksMethods.ascUserName))
      : dispatch(setSort(sortingPacksMethods.desUserName))
  }

  return (
    <table className={list.table}>
      <thead>
        <tr>
          <th className={list.tableTitle}>
            <span onClick={sortByNameHandler}>Name {arrowDirectionName}</span>
          </th>
          <th className={list.tableTitle}>
            <span onClick={sortByCardsHandler}>Cards {arrowDirectionCards}</span>
          </th>
          <th className={list.tableTitle}>
            <span style={{ cursor: 'pointer' }} onClick={sortByDateHandler}>
              Last Updated {arrowDirectionDate}
            </span>
          </th>
          <th className={list.tableTitle}>
            <span onClick={sortByCreateHandler}>Created by {arrowDirectionCreated}</span>
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
