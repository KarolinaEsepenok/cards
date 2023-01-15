import React, { ChangeEvent, useEffect, useState } from 'react'

import { searchTC } from '../../features/packs/packsReducer'
import { Input } from '../component/Input/Input'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useDebounce } from '../hooks/useDebounce'

export const Search = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)
  const dispatch = useAppDispatch()
  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(searchTC({ packName: value }))
  }, [debouncedValue])

  return (
    <div>
      <Input type={'search'} onChange={handleSearchValueChange} value={value} />
    </div>
  )
}
