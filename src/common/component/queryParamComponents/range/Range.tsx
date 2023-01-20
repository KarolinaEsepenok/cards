import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { setRangeValues } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
  isLoadingSelector,
  maxCardsCountSelector,
  maxValueRangeSelector,
  minCardsCountSelector,
  minValueRangeSelector,
  resetRange,
} from '../../../selectors/Selectors'

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
    <Box sx={{ width: 300, margin: 0, display: 'flex', justifyContent: 'center' }}>
      <span style={{ marginRight: 20 }}>{value[0]}</span>{' '}
      <Slider
        getAriaLabel={() => 'Range'}
        value={value}
        onChange={handleLocalValuesChange}
        onChangeCommitted={handleRemoteValuesChange}
        max={maxCardsCountValue}
        min={minCardsCountValue}
        disabled={rangeDisabled}
      />
      <span style={{ marginLeft: 20 }}>{value[1]}</span>
    </Box>
  )
}
