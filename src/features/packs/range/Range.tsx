import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import {
  isLoadingSelector,
  maxCardsCountSelector,
  maxValueRangeSelector,
  minCardsCountSelector,
  minValueRangeSelector,
} from '../../../common/selectors/Selectors'
import { setRangeValues } from '../packsReducer'

export const RangeSlider = () => {
  const dispatch = useAppDispatch()
  const minCardsCountValue = useAppSelector(minCardsCountSelector)
  const maxCardsCountValue = useAppSelector(maxCardsCountSelector)
  const minValue = useAppSelector(minValueRangeSelector)
  const maxValue = useAppSelector(maxValueRangeSelector)
  const rangeDisabled = useAppSelector(isLoadingSelector)
  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const handleLocalValuesChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const handleRemoteValuesChange = () => {
    dispatch(setRangeValues(value))
  }

  useEffect(() => {
    setValue([minCardsCountValue, maxCardsCountValue])
  }, [minCardsCountValue, maxCardsCountValue])

  return (
    <Box sx={{ width: 300, marginLeft: 30, display: 'flex', justifyContent: 'center' }}>
      <span style={{ marginRight: 20 }}>{minValue}</span>{' '}
      <Slider
        getAriaLabel={() => 'Range'}
        value={value}
        onChange={handleLocalValuesChange}
        onChangeCommitted={handleRemoteValuesChange}
        max={maxCardsCountValue}
        min={minCardsCountValue}
        disabled={rangeDisabled}
      />
      <span style={{ marginLeft: 20 }}>{maxValue}</span>
    </Box>
  )
}
