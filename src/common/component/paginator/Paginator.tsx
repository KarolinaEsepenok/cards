import * as React from 'react'

import { FormControl, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'

import { getPacksTC } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

import s from './Paginator.module.scss'

type PaginationPropsType = {
  pageCount: number
  totalCount: number
  currentPage: number
  packsOrCards: boolean
}
export const Paginator = (props: PaginationPropsType) => {
  const { pageCount, totalCount, currentPage, packsOrCards } = props
  const pages = Math.ceil(totalCount / pageCount)
  const pageValue = pageCount.toString()
  const dispatch = useAppDispatch()
  const handleChangePage = (event: React.ChangeEvent<unknown>, currentPage: number) => {
    packsOrCards ? dispatch(getPacksTC()) : dispatch(getPacksTC())
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    // const pageCount = +event.currentTarget.value
    packsOrCards ? dispatch(getPacksTC()) : dispatch(getPacksTC())
  }

  return (
    <div className={s.paginatorMain}>
      <Pagination onChange={handleChangePage} page={currentPage} count={pages} />
      <div className={s.showPerPage}>
        <div>Show</div>
        <FormControl size="small">
          <Select value={pageValue} onChange={handleChangeRowsPerPage}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <div>packs per page</div>
      </div>
    </div>
  )
}
