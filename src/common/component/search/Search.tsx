import React, { ChangeEvent, useEffect, useState } from 'react'

import { setSearchPackName } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDebounce } from '../../hooks/useDebounce'
import { Input } from '../Input/Input'

export const Search = () => {
  const packName = useAppSelector(state => state.packs.queryParams.packName)
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)
  const dispatch = useAppDispatch()

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(setSearchPackName(value))
  }, [debouncedValue])
  useEffect(() => {
    if (packName === '') {
      setValue('')
    }
  }, [packName])

  return (
    <div>
      <Input type={'search'} onChange={handleSearchValueChange} value={value} />
    </div>
  )
}
