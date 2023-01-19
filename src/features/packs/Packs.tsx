import React, { useEffect } from 'react'

import { Button } from '../../common/component/Button/Button'
import { Paginator } from '../../common/component/paginator/Paginator'
import { FilterMyAllPacks } from '../../common/component/queryParamComponents/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from '../../common/component/queryParamComponents/range/Range'
import { ResetAllFilters } from '../../common/component/queryParamComponents/resetAllFilters/ResetAllFilters'
import { Search } from '../../common/component/queryParamComponents/search/Search'
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
import { addNewPackTC, getPacksTC, setPacksCurrentPage, setRowPage } from './packsReducer'

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

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, min, max, sortPacks])

  return (
    <section className={s.packs}>
      <h2>Packs list</h2>
      <div className={s.addPackButton}>
        <Button
          styleType="primary"
          onClick={() =>
            dispatch(
              addNewPackTC({
                cardsPack: {
                  name: 'NewPack',
                  deckCover: '',
                  private: false,
                },
              })
            )
          }
        >
          Add new pack
        </Button>
      </div>
      <Search />
      <RangeSlider />
      <ResetAllFilters />
      <FilterMyAllPacks />
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
    </section>
  )
}
