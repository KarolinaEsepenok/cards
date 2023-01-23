import React, { useEffect } from 'react'

import s from './Packs.module.scss'
import { PacksList } from './packsList/PacksList'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddPackModal } from 'common/components/modals/AddPackModal'
import { DeletePackModal } from 'common/components/modals/DeletePackModal'
import { EditPackNameModal } from 'common/components/modals/EditPackNameModal'
import { Modal } from 'common/components/modals/Modal'
import { Paginator } from 'common/components/paginator/Paginator'
import { Subtitle } from 'common/components/typography/subtitle/Subtitle'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { FilterMyAllPacks } from 'common/modules/filterMyAllPacks/FilterMyAllPacks'
import { RangeSlider } from 'common/modules/range/Range'
import { ResetAllFilters } from 'common/modules/resetAllFilters/ResetAllFilters'
import { Search } from 'common/modules/search/Search'
import {
  cardPacksTotalCountSelector,
  maxValueRangeSelector,
  minValueRangeSelector,
  packNameSelector,
  pageCountSelector,
  pageSelector,
  sortPacksSelector,
  userIdSelector,
} from 'common/selectors/Selectors'
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

  const modalContent = useAppSelector(state => state.packs.modalСontent)

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

      <Modal>
        {modalContent === 'editPackName' && <EditPackNameModal />}
        {modalContent === 'addPack' && <AddPackModal />}
        {modalContent === 'deletePack' && <DeletePackModal />}
      </Modal>

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
  )
}
