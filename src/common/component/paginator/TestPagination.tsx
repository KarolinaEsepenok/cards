import React, { useEffect } from 'react'

import { FilterMyAllPacks } from '../../../features/packs/FilterMyAllPacks'
import { getPacksTC } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { PaginationTable } from './PaginationTable'

export const TestPagination = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.queryParams.page)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
  const user_id = useAppSelector(state => state.packs.queryParams.user_id)
  const packName = useAppSelector(state => state.packs.queryParams.packName)
  const minQueryParam = useAppSelector(state => state.packs.queryParams.min)
  const maxQueryParam = useAppSelector(state => state.packs.queryParams.max)
  const sortBy = useAppSelector(state => state.packs.queryParams.sortPacks)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, user_id, minQueryParam, maxQueryParam, sortBy])

  return (
    <div>
      <PaginationTable pageCount={pageCount} currentPage={page} totalCount={totalCount} packsOrCards={false} />
      <FilterMyAllPacks />
    </div>
  )
}
