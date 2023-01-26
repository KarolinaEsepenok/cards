import React from 'react'

import defaultFilters from 'assets/img/icons/resetAllFilters.svg'
import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import s from 'common/modules/resetAllFilters/ResetAllFilters.module.scss'
import { isLoadingSelector } from 'common/selectors/Selectors'
import { resetAllFilters } from 'pages/packs/packsSlice'

export const ResetAllFilters = () => {
  const disabled = useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch()
  const handelResetFilters = () => {
    dispatch(resetAllFilters())
  }

  return (
    <Button className={s.button} styleType="icon" onClick={handelResetFilters} disabled={disabled}>
      <div className={s.tooltip} data-tooltip="reset all filters">
        <img src={defaultFilters} alt="reset all filters icon" />
      </div>
    </Button>
  )
}
