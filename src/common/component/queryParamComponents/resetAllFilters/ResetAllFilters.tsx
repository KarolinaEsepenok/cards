import React from 'react'

import defaultFilters from '../../../../assets/img/icons/resetAllFilters.svg'
import { resetAllFilters } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { Button } from '../../button/Button'

import s from './ResetAllFilters.module.scss'
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
