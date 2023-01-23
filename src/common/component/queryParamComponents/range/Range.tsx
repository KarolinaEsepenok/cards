import React, { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import s from './Range.module.scss'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import {
  isLoadingSelector,
  maxCardsCountSelector,
  maxValueRangeSelector,
  minCardsCountSelector,
  minValueRangeSelector,
  resetRange,
} from 'common/selectors/Selectors'
import { setRangeValues } from 'features/packs/packsReducer'

export const RangeSlider = () => {
  const minCardsCountValue = useAppSelector(minCardsCountSelector)
  const maxCardsCountValue = useAppSelector(maxCardsCountSelector)
  const resetRangeValues = useAppSelector(resetRange)
  const minValue = useAppSelector(minValueRangeSelector)
  const maxValue = useAppSelector(maxValueRangeSelector)
  const rangeDisabled = useAppSelector(isLoadingSelector)
  const [value, setValue] = useState<number[]>([minValue, maxValue])
  const dispatch = useAppDispatch()

  const handleLocalValuesChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const handleRemoteValuesChange = () => {
    dispatch(setRangeValues(value))
  }

  useEffect(() => {
    setValue([minCardsCountValue, maxCardsCountValue])
  }, [minCardsCountValue, maxCardsCountValue, resetRangeValues])

  return (
    <div className={s.container}>
      <span className={s.min}>{value[0]}</span>
      <Slider
        style={{ width: '180px' }}
        getAriaLabel={() => 'Range'}
        value={value}
        onChange={handleLocalValuesChange}
        onChangeCommitted={handleRemoteValuesChange}
        max={maxCardsCountValue}
        min={minCardsCountValue}
        disabled={rangeDisabled}
      />
      <span className={s.max}>{value[1]}</span>
    </div>
  )
}
