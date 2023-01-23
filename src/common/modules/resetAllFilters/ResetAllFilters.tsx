import React from 'react'

import defaultFilters from 'assets/img/icons/resetAllFilters.svg'
import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import s from 'common/modules/resetAllFilters/ResetAllFilters.module.scss'
import { resetAllFilters } from 'pages/packs/packsSlice'

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
