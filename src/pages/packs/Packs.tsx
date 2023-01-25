import React, { useEffect } from 'react'

import s from './Packs.module.scss'
import { PacksFilters } from './PacksFilters'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddPackModal } from 'common/components/modals/AddPackModal'
import { Paginator } from 'common/components/paginator/Paginator'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import {
  cardPacksTotalCountSelector,
  isLoadingSelector,
  maxValueRangeSelector,
  minValueRangeSelector,
  packNameSelector,
  pageCountSelector,
  pageSelector,
  sortPacksSelector,
  userIdSelector,
} from 'common/selectors/Selectors'
import { PacksList } from 'pages/packs/packsList/PacksList'
import { getPacksTC, setPacksCurrentPage, setRowPage } from 'pages/packs/packsSlice'
import { ResultsNotFound } from 'pages/packs/ResultsNotFound'

export const Packs = () => {
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const min = useAppSelector(minValueRangeSelector)
  const max = useAppSelector(maxValueRangeSelector)
  const sortPacks = useAppSelector(sortPacksSelector)
  const totalCount = useAppSelector(cardPacksTotalCountSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  // const [togglePopup, setTogglePopup] = useState(false)

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
    <div className={s.packs}>
      <h2>Packs list</h2>

      <div className={s.addPackButton}>
        <Button styleType="primary" onClick={() => dispatch(toggleModal(true))}>
          {/*<Button styleType="primary" onClick={() => setTogglePopup(!togglePopup)}>*/}
          Add new pack
        </Button>
      </div>

      <PacksFilters />

      <AddPackModal />

      {totalCount > 0 ? (
        <div>
          <div className={s.packsList}>
            <PacksList />
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
      ) : (
        !isLoading && <ResultsNotFound />
      )}
    </div>
  )
}
