import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { isLoadingSelector, packNameSelector } from 'common/selectors/Selectors'
import { useDebounce } from 'common/utils/useDebounce'
import { setSearchName } from 'pages/packs/packsSlice'

type SearchType = {
  class?: string
}
export const Search: FC<SearchType> = props => {
  const dispatch = useAppDispatch()
  const disabled = useAppSelector(isLoadingSelector)
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
      disabled={disabled}
    />
  )
}
