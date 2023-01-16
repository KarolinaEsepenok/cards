import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

export const RangeSlider = () => {
  const dispatch = useAppDispatch()
  const maxCardCountValue = useAppSelector(state => state.packs.maxCardsCount)
  const minCardCountValue = useAppSelector(state => state.packs.minCardsCount)
  const [value, setValue] = useState<number[]>([0, 0])

  useEffect(() => {
    setValue([minCardCountValue, maxCardCountValue])
  }, [minCardCountValue, maxCardCountValue])
  const handleValueChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const handleFetch = () => {}

  return (
    <Box sx={{ width: 300, marginLeft: 30, display: 'flex', justifyContent: 'center' }}>
      <span style={{ marginRight: 20 }}>{value[0]}</span>{' '}
      <Slider
        getAriaLabel={() => 'Range'}
        value={value}
        onChange={handleValueChange}
        onChangeCommitted={handleFetch}
        max={maxCardCountValue}
        min={minCardCountValue}
      />
      <span>{value[1]}</span>
    </Box>
  )
}
