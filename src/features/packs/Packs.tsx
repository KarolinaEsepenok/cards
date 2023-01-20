import React, { useEffect } from 'react'

import { toggleModal } from '../../app/appReducer'
import { Button } from '../../common/component/button/Button'
import { AddPackModal } from '../../common/component/modals/AddPackModal'
import { Paginator } from '../../common/component/paginator/Paginator'
import { FilterMyAllPacks } from '../../common/component/queryParamComponents/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from '../../common/component/queryParamComponents/range/Range'
import { ResetAllFilters } from '../../common/component/queryParamComponents/resetAllFilters/ResetAllFilters'
import { Search } from '../../common/component/queryParamComponents/search/Search'
import { Subtitle } from '../../common/component/typography/subtitle/Subtitle'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import {
  cardPacks,
  cardPacksTotalCountSelector,
  maxValueRangeSelector,
  minValueRangeSelector,
  packNameSelector,
  pageCountSelector,
  pageSelector,
  sortPacksSelector,
  userIdSelector,
} from '../../common/selectors/Selectors'

import s from './Packs.module.scss'
import { PackType } from './packsApi'
import { PacksList } from './packsList/PacksList'
import { getPacksTC, setPacksCurrentPage, setRowPage } from './packsReducer'

export const Packs = () => {
  const packs: PackType[] = useAppSelector(cardPacks)
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const min = useAppSelector(minValueRangeSelector)
  const max = useAppSelector(maxValueRangeSelector)
  const sortPacks = useAppSelector(sortPacksSelector)
  const totalCount = useAppSelector(cardPacksTotalCountSelector)

  const dispatch = useAppDispatch()
  const changePageHandle = (page: number) => {
    dispatch(setPacksCurrentPage(page))
  }
  const changeRowPageHandle = (pageCount: number) => {
    dispatch(setRowPage(pageCount))
  }

  const handleOpen = () => {
    dispatch(toggleModal(true))
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, min, max, sortPacks])

  return (
    <div className={s.packs}>
      <h2>Packs list</h2>

      <div className={s.addPackButton}>
        <Button
          styleType="primary"
          // onClick={() =>
          //   dispatch(
          //     addNewPackTC({
          //       cardsPack: {
          //         name: 'NewPack',
          //         deckCover: '',
          //         private: false,
          //       },
          //     })
          //   )
          // }
          onClick={handleOpen}
        >
          Add new pack
        </Button>
      </div>

      <AddPackModal />

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

      <div className={s.table}>
        <PacksList packs={packs} />
      </div>

      <div>
        <Paginator
          setRowCallback={changeRowPageHandle}
          setPageCallback={changePageHandle}
          pageCount={pageCount}
          totalCount={totalCount}
          currentPage={page}
        />
      </div>
    </div>
  )
}
