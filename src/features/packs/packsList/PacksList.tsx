import React, { FC } from 'react'

import { CircularProgress } from '@mui/material'

import { Actions } from '../../../common/component/table/actions/Actions'
import { Table } from '../../../common/component/table/Table'
import { TableRow } from '../../../common/component/table/tableRow/TableRow'
import { formatDate } from '../../../common/hooks/formatDate'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { isLoadingSelector, myIdSelector } from '../../../common/selectors/Selectors'
import { PackType } from '../packsApi'

type PacksTableType = {
  packs: PackType[]
}
export const PacksList: FC<PacksTableType> = ({ packs }) => {
  const myId = useAppSelector(myIdSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  return isLoading ? (
    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  ) : (
    <Table titles={['Name', 'Cards', 'Created by', 'Last Updated', 'Actions']}>
      {packs.map(p => {
        const dateUpdate = formatDate(p.updated)

        const myPack = p.user_id === myId

        return (
          <TableRow
            key={p._id}
            id={p._id}
            name={p.name}
            cardsCount={p.cardsCount}
            author={p.user_name}
            updated={dateUpdate}
            actions={<Actions myPack={myPack} packId={p._id} packName={p.name} />}
          />
        )
      })}
    </Table>
  )
}
