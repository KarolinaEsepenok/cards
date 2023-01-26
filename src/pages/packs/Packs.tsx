import React, { useEffect } from 'react'

import s from './Packs.module.scss'

import { Button } from 'common/components/button/Button'
import { AddPackModal } from 'common/components/modals/AddPackModal'
import { DeletePackModal } from 'common/components/modals/DeletePackModal'
import { EditPackNameModal } from 'common/components/modals/EditPackNameModal'
import { Paginator } from 'common/components/paginator/Paginator'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import {
  cardPacksTotalCountSelector,
  isLoadingSelector,
  maxValueRangeSelector,
  minValueRangeSelector,
  modalContentSelector,
  packNameSelector,
  pageCountSelector,
  pageSelector,
  sortPacksSelector,
  togglePackModalSelector,
  userIdSelector,
} from 'common/selectors/Selectors'
import { EmptyPacksList } from 'pages/packs/emptyPacksList/EmptyPacksList'
import { PacksFilters } from 'pages/packs/packsFilters/PacksFilters'
import { PacksList } from 'pages/packs/packsList/PacksList'
import { getPacksTC, setModalContent, setPacksCurrentPage, setRowPage, togglePackModal } from 'pages/packs/packsSlice'

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
  const modalContent = useAppSelector(modalContentSelector)
  const toggleModalFromState = useAppSelector(togglePackModalSelector)

  const dispatch = useAppDispatch()

  const changePageHandle = (page: number) => {
    dispatch(setPacksCurrentPage(page))
  }
  const changeRowPageHandle = (pageCount: number) => {
    dispatch(setRowPage(pageCount))
  }

  const handleOpenPopup = () => {
    dispatch(setModalContent('addPack'))
    dispatch(togglePackModal(true))
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, min, max, sortPacks])

  return (
    <div className={s.packs}>
      <h2>Packs list</h2>

      <div className={s.addPackButton}>
        <Button styleType="primary" onClick={handleOpenPopup}>
          Add new pack
        </Button>
      </div>

      {toggleModalFromState && modalContent === 'addPack' && <AddPackModal />}
      {toggleModalFromState && modalContent === 'editPackName' && <EditPackNameModal />}
      {toggleModalFromState && modalContent === 'deletePack' && <DeletePackModal />}

      <PacksFilters />

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
        !isLoading && <EmptyPacksList />
      )}
    </div>
  )
}
