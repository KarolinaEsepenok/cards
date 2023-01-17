import React, { useEffect } from 'react'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import {
  cardPacks,
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
import { RangeSlider } from './range/Range'

export const Packs = () => {
  const packs: PackType[] = useAppSelector(cardPacks)
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const sortPacks = useAppSelector(sortPacksSelector)
  const min = useAppSelector(minValueRangeSelector)
  const max = useAppSelector(maxValueRangeSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, sortPacks, min, max])

  return (
    <section className={s.packs}>
      <h2>Packs list</h2>
      <RangeSlider />
      <div className={s.table}>
        <PacksList packs={packs} />
      </div>
    </section>
  )
}
