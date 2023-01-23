import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'common/component/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { packNameSelector } from 'common/selectors/Selectors'
import { useDebounce } from 'common/utils/useDebounce'
import { setSearchName } from 'features/packs/packsReducer'

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
