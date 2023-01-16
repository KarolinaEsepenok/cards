import React from 'react'

import s from './Paginator.module.scss'

type PaginatorPropsType = {
  onPageChange: (page: number) => void
  pageSize: number
  currentPage: number
  totalUsersCount: number
}

const countButtons = 5

const Paginator: React.FC<PaginatorPropsType> = ({ onPageChange, pageSize, currentPage, totalUsersCount }) => {
  let pages = Math.ceil(totalUsersCount / pageSize)
  let range = currentPage % 5 === 0 ? currentPage - 4 : currentPage - (currentPage % 5) + 1

  const buttons = (range: number, countButtons: number) => {
    let buttons = []

    for (let i = range; buttons.length < countButtons; i++) {
      buttons.push(i)
      if (i >= pages) return buttons
    }

    return buttons
  }

  return (
    <div className={s.paginatorBox}>
      <button
        className={currentPage === 1 ? `${s.disabled} ${s.button}` : s.button}
        style={{ fontWeight: 'bold' }}
        onClick={() => {
          if (currentPage > 1) onPageChange(1)
        }}
      >
        &#8810;
      </button>
      <button
        className={currentPage === 1 ? `${s.disabled} ${s.button}` : s.button}
        style={{ fontWeight: 'bold' }}
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1)
        }}
      >
        &#60;
      </button>
      {buttons(range, countButtons).map((e, index) => {
        return (
          <button
            key={index}
            className={currentPage === e ? `${s.currentButton} ${s.button}` : s.button}
            onClick={() => onPageChange(e)}
          >
            {e}
          </button>
        )
      })}
      {range + countButtons < pages ? (
        <>
          <button className={s.button}>...</button>
          <button className={s.button} onClick={() => onPageChange(pages)}>
            {pages}
          </button>
        </>
      ) : (
        ''
      )}

      <button
        className={currentPage === pages ? `${s.disabled} ${s.button}` : s.button}
        style={{ fontWeight: 'bold' }}
        onClick={() => {
          if (currentPage < pages) onPageChange(currentPage + 1)
        }}
      >
        &#62;
      </button>
      <button
        className={currentPage === pages ? `${s.disabled} ${s.button}` : s.button}
        style={{ fontWeight: 'bold' }}
        onClick={() => {
          if (currentPage < pages) onPageChange(pages)
        }}
      >
        &#8811;
      </button>
    </div>
  )
}

export default Paginator
