import React, { useEffect } from 'react'

import { useLocation, useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { Subtitle } from 'common/components/typography/subtitle/Subtitle'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { FilterMyAllPacks } from 'common/modules/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from 'common/modules/range/Range'
import { ResetAllFilters } from 'common/modules/resetAllFilters/ResetAllFilters'
import { Search } from 'common/modules/search/Search'
import { queryParamsSelector } from 'common/selectors/Selectors'

export const PacksFilters = () => {
  const queryParams = useAppSelector(queryParamsSelector)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const convertToStringParams = () => {
    const keys = Object.keys(queryParams)

    let result = {}

    keys.forEach((key: any) => {
      //@ts-ignore
      result = { ...result, [key]: queryParams[key] }
    })
    setSearchParams(result)
    // for (let p in queryParams) {
    //     setSearchParams({p: queryParams[`${p}`] + ''})
    // }
  }

  useEffect(() => {
    convertToStringParams()

    //const searchParams = new URLSearchParams()
    // console.log('location', location)
    // console.log('params', searchParams)
    // console.log('query', queryParams)
  }, [queryParams])

  searchParams.forEach((val, key) => {
    console.log(key + ' ' + val)
  })

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
