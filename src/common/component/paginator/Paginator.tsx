import * as React from 'react'

import { FormControl, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'

import s from './Paginator.module.scss'

type PaginationPropsType = {
  pageCount: number
  totalCount: number
  currentPage: number
  setPageCallback: (page: number) => void
  setRowCallback: (pageCount: number) => void
}
export const Paginator: React.FC<PaginationPropsType> = ({
  pageCount,
  totalCount,
  setPageCallback,
  setRowCallback,
  currentPage,
}) => {
  const pages = Math.ceil(totalCount / pageCount)
  const pageValue = pageCount.toString()
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    localStorage.setItem('page', JSON.stringify(value))
    setPageCallback(value)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    const pageCount = +event.target.value

    localStorage.setItem('row', JSON.stringify(pageCount))
    setRowCallback(pageCount)
  }

  return (
    <div className={s.paginatorMain}>
      <Pagination onChange={handleChangePage} count={pages} page={currentPage} />
      <div className={s.showPerPage}>
        <div className={s.nameShowPerPage}>Show</div>
        <FormControl sx={{ margin: '0 1rem' }} size="small">
          <Select
            sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}
            value={pageValue}
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <div className={s.nameShowPerPage}>packs per page</div>
      </div>
    </div>
  )
}
