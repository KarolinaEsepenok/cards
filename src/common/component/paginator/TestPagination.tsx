import React from 'react'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import s from '../paginator/Paginator.module.scss'

import Paginator from './Paginator'

export const TestPagination = () => {
  const dispatch = useAppDispatch()

  const pageCount = useAppSelector(state => state)
  const cardsTotalCount = useAppSelector(state => state)
  const page = useAppSelector(state => state)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const onChangePageHandler = (page: number) => {}

  const onSetPageCountHandler = (page: number) => {}

  return (
    <div>
      <Paginator
        pageSize={1}
        currentPage={1}
        totalUsersCount={7}
        // totalUsersCount={cardsTotalCount}
        //  currentPage={page}
        // pageSize={pageCount}
        onPageChange={onChangePageHandler}
      />
      <div className={s.pageCount}>
        <span>Show</span>
        <input
          type="number"
          step={1}
          min={1}
          max={25}
          // value={pageCount}
          onChange={e => onSetPageCountHandler(+e.currentTarget.value)}
          disabled={isLoading}
        />
        <span>cards per page</span>
      </div>
    </div>
  )
}
