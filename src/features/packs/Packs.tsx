import React, { useEffect } from 'react'

import { Paginator } from '../../common/component/paginator/Paginator'
import { FilterMyAllPacks } from '../../common/component/queryParamComponents/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from '../../common/component/queryParamComponents/range/Range'
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
import { getPacksTC } from './packsReducer'

export const Packs = () => {
  const packs: PackType[] = useAppSelector(cardPacks)
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const sortPacks = useAppSelector(sortPacksSelector)
  const min = useAppSelector(minValueRangeSelector)
  const max = useAppSelector(maxValueRangeSelector)
  const totalCount = useAppSelector(cardPacksTotalCountSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, sortPacks, min, max])

  return (
    <section className={s.packs}>
      <h2>Packs list</h2>
      <RangeSlider />
      <FilterMyAllPacks />
      <div className={s.table}>
        <PacksList packs={packs} />
      </div>
      <div>
        {' '}
        <Paginator pageCount={pageCount} currentPage={page} totalCount={totalCount} packsOrCards={false} />
      </div>
    </section>
  )
}
