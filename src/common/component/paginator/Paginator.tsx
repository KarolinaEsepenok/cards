import { ChangeEvent, FC } from 'react'

import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import s from './Paginator.module.scss'

type PaginationPropsType = {
  pageCount: number
  totalCount: number
  currentPage: number
  setPageCallback: (page: number) => void
  setRowCallback: (pageCount: number) => void
}
export const Paginator: FC<PaginationPropsType> = ({
  pageCount,
  totalCount,
  setPageCallback,
  setRowCallback,
  currentPage,
}) => {
  const pages = Math.ceil(totalCount / pageCount)
  const pageValue = pageCount.toString()

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    localStorage.setItem('page', JSON.stringify(value))
    setPageCallback(value)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    const pageCount = +event.target.value

    localStorage.setItem('row', JSON.stringify(pageCount))
    setRowCallback(pageCount)
  }

  return (
    <div className={s.paginatorContainer}>
      <Pagination
        onChange={handleChangePage}
        count={pages}
        page={currentPage}
        size="small"
        shape="rounded"
        sx={{
          '.MuiPagination-ul': {
            columnGap: '10px',
          },
          '.css-w05zow-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#366eff',
            color: '#ffffff',
            pointerEvents: 'none',
          },
        }}
      />

      <div className={s.showPerPage}>
        <p className={s.nameShowPerPage}>Show</p>

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

        <p className={s.nameShowPerPage}>packs per page</p>
      </div>
    </div>
  )
}
