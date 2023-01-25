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
import { ResultsNotFound } from 'pages/packs/ResultsNotFound'
import { getPacksTC, setModalContent, setPacksCurrentPage, setRowPage } from 'pages/packs/packsSlice'

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

  const modalContent = useAppSelector(state => state.packs.modalNode)
  const toggleModalFromState = useAppSelector(state => state.app.toggleModal)

  const dispatch = useAppDispatch()

  const changePageHandle = (page: number) => {
    dispatch(setPacksCurrentPage(page))
  }
  const changeRowPageHandle = (pageCount: number) => {
    dispatch(setRowPage(pageCount))
  }

  const handleOpenPopup = () => {
    dispatch(setModalContent('addPack'))
    dispatch(toggleModal(true))
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

      {/*<Modal>*/}
      {/*  {modalContent === 'editPackName' && <EditPackNameModal packId={''} name={''} />}*/}
      {/*  {modalContent === 'addPack' && <AddPackModal />}*/}
      {/*  {modalContent === 'deletePack' && <DeletePackModal />}*/}
      {/*</Modal>*/}

      <div className={s.filtersContainer}>
        <div>
          <Subtitle>Search</Subtitle>
          <Search class={s.search} />
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
