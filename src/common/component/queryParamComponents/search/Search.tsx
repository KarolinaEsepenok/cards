import React, { ChangeEvent, useEffect, useState } from 'react'

import { useDebounce } from '../../../hooks/useDebounce'
import { Input } from '../../Input/Input'

export const Search = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)
  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {}, [debouncedValue])

  return (
    <div>
      <Input type={'search'} onChange={handleSearchValueChange} value={value} />
    </div>
  )
}
