import React, { useEffect } from 'react'

import { Button } from '../../common/component/Button/Button'
import { RangeSlider } from '../../common/component/range/Range'
import { ResetAllFilters } from '../../common/component/resetAllFilters/ResetAllFilters'
import { Search } from '../../common/component/search/Search'
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
import { addNewPackTC, getPacksTC } from './packsReducer'

export const Packs = () => {
  const packs: PackType[] = useAppSelector(cardPacks)
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const minCardsCount = useAppSelector(minValueRangeSelector)
  const maxCardsCount = useAppSelector(maxValueRangeSelector)
  const sortPacks = useAppSelector(sortPacksSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, minCardsCount, maxCardsCount, sortPacks])

  return (
    <section className={s.packs}>
      <h2>Packs list</h2>
      <Search />
      <RangeSlider />
      <ResetAllFilters />

      <div>
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

      <div className={s.table}>
        <PacksList packs={packs} />
      </div>
    </section>
  )
}
