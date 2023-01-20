import React, { ChangeEvent, useEffect, useState } from 'react'

import { setSearchName } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useDebounce } from '../../../hooks/useDebounce'
import { packNameSelector } from '../../../selectors/Selectors'
import { Input } from '../../Input/Input'

export const Search = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(packNameSelector)
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)
  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(setSearchName(value))
  }, [debouncedValue])
  useEffect(() => {
    if (packName === '') setValue(packName)
  }, [packName])

  return (
    <div>
      <Input type={'search'} onChange={handleSearchValueChange} value={value} />
    </div>
  )
}
