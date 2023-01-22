import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { setSearchName } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { packNameSelector } from '../../../selectors/Selectors'
import { useDebounce } from '../../../utils/useDebounce'
import { Input } from '../../Input/Input'

type SearchType = {
  class?: string
}
export const Search: FC<SearchType> = props => {
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
    <Input
      type="search"
      onChange={handleSearchValueChange}
      value={value}
      placeholder="Provide your text"
      className={props.class}
    />
  )
}
