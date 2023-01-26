import React from 'react'

import { Subtitle } from 'common/components/typography/subtitle/Subtitle'
import { FilterMyAllPacks } from 'common/modules/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from 'common/modules/range/Range'
import { ResetAllFilters } from 'common/modules/resetAllFilters/ResetAllFilters'
import { Search } from 'common/modules/search/Search'
import s from 'pages/packs/Packs.module.scss'

export const PacksFilters = () => {
  return (
    <div className={s.filtersContainer}>
      <div>
        <Subtitle>Search</Subtitle>
        <Search class={s.search} selector={'Packs'} />
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
