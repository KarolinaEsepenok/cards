import React from 'react'

import removeFilter from '../../../assets/img/icons/filter-Remove.svg'
import { resetAllFilters } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const ResetAllFilters = () => {
  const dispatch = useAppDispatch()
  const resetAllFiltersHandler = () => {
    dispatch(resetAllFilters())
  }

  return (
    <button>
      <img src={removeFilter} onClick={resetAllFiltersHandler} />
    </button>
  )
}
