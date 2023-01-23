import React from 'react'

import s from './ResetAllFilters.module.scss'

import defaultFilters from 'assets/img/icons/resetAllFilters.svg'
import { Button } from 'common/component/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { resetAllFilters } from 'features/packs/packsReducer'

export const ResetAllFilters = () => {
  const dispatch = useAppDispatch()
  const handelResetFilters = () => {
    dispatch(resetAllFilters())
  }

  return (
    <Button className={s.button} styleType="icon" onClick={handelResetFilters}>
      <img src={defaultFilters} alt="reset all filters icon" />
    </Button>
  )
}
