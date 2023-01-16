import React, { ChangeEvent } from 'react'

import { FilterMyAllPacks } from '../../../features/packs/PacksFilterMyAll'
import { getPacksTC, setPacksData } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { PaginationTable } from './PaginationTable'
import Paginator from './Paginator'
import BasicTable from './оо'

export const TestPagination = () => {
  const dispatch = useAppDispatch()

  const state = useAppSelector(state => state.packs)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const onChangePageCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPacksData(state.pageCount))
    dispatch(getPacksTC())
  }

  const onChangePage = (page: number) => {
    dispatch(setPacksData(page))
    dispatch(getPacksTC())
  }

  return (
    <div>
      <div>
        <Paginator currentPage={5} pageSize={5} totalUsersCount={4} onPageChange={onChangePage} />
        <div>
          <span>Show</span>
          <input type="number" step={5} min={5} max={25} onChange={onChangePageCount} disabled={isLoading} />
          <span>cards per page</span>
        </div>
      </div>
      <PaginationTable />
      <FilterMyAllPacks />
      <BasicTable />
    </div>
  )
}
