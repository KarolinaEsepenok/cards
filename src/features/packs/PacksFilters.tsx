import React from 'react'

import s from './Packs.module.scss'

import { FilterMyAllPacks } from 'common/component/queryParamComponents/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from 'common/component/queryParamComponents/range/Range'
import { ResetAllFilters } from 'common/component/queryParamComponents/resetAllFilters/ResetAllFilters'
import { Search } from 'common/component/queryParamComponents/search/Search'
import { Subtitle } from 'common/component/typography/subtitle/Subtitle'

export const PacksFilters = () => {
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
