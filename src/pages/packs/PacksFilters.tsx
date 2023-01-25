import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { Subtitle } from 'common/components/typography/subtitle/Subtitle'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { FilterMyAllPacks } from 'common/modules/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from 'common/modules/range/Range'
import { ResetAllFilters } from 'common/modules/resetAllFilters/ResetAllFilters'
import { Search } from 'common/modules/search/Search'
import { queryParamsSelector } from 'common/selectors/Selectors'
import { GetParamsType } from 'pages/packs/packsApi'
import { setQueryParams } from 'pages/packs/packsSlice'

export const PacksFilters = () => {
  const queryParams = useAppSelector(queryParamsSelector)
  const [searchParams, setSearchParams] = useSearchParams(window.location.search)
  const dispatch = useAppDispatch()

  //const param = searchParams.get('param')
  useEffect(() => {
    // @ts-ignore
    setSearchParams(queryParams)
  }, [queryParams])
  useEffect(() => {
    const newParams = Object.fromEntries(searchParams)

    Object.keys(newParams).forEach(key => {
      if (!newParams[key]) delete newParams[key]
    })
    dispatch(setQueryParams({ ...queryParams, ...newParams } as unknown as GetParamsType))
  }, [])

  return (
    <div className={s.filtersContainer}>
      <div>
        <Subtitle>Search</Subtitle>
        <Search class={s.search} />
      </div>

      <div>
        <Subtitle>Show packs cards</Subtitle>
        <FilterMyAllPacks />
      </div>

      <div>
        <Subtitle>Number of cards</Subtitle>
        <RangeSlider />
      </div>

      <ResetAllFilters />
    </div>
  )
}
