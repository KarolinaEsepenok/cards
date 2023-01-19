import React, { useEffect } from 'react'

import { Button } from '../../common/component/Button/Button'
import { Paginator } from '../../common/component/paginator/Paginator'
import { FilterMyAllPacks } from '../../common/component/queryParamComponents/filterMyAllPacks/FilterMyAllPacks'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import {
  cardPacks,
  cardPacksTotalCountSelector,
  maxCardsCountSelector,
  minCardsCountSelector,
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
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
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
  }, [page, packName, pageCount, userId, minCardsCount, maxCardsCount, sortPacks])

  useEffect(() => {
    const pageL = localStorage.getItem('page')

    if (pageL) {
      Number(pageL) !== page && changePageHandle(+pageL)
    }
  }, [])

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
