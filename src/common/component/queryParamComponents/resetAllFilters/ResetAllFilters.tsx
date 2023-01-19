import React from 'react'

import defaultFilters from '../../../../assets/img/icons/resetAllFilters.svg'
import { resetAllFilters } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
export const ResetAllFilters = () => {
  const dispatch = useAppDispatch()
  const resetFiltersHandler = () => {
    dispatch(resetAllFilters())
  }

  return (
    <button onClick={resetFiltersHandler}>
      <img src={defaultFilters} />
    </button>
  )
}
