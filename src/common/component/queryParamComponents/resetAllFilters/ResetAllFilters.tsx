import React from 'react'

import s from './ResetAllFilters.module.scss'

import defaultFilters from 'assets/img/icons/resetAllFilters.svg'
import { Button } from 'common/component/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { resetAllFilters } from 'features/packs/packsReducer'

export const ResetAllFilters = () => {
  const dispatch = useAppDispatch()
  const resetFiltersHandler = () => {
    dispatch(resetAllFilters())
  }

  return (
    <Button className={s.button} styleType="icon" onClick={resetFiltersHandler}>
      <img src={defaultFilters} alt="reset all filters icon" />
    </Button>
  )
}
