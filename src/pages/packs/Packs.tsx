import React, { useEffect } from 'react'

import s from './Packs.module.scss'
import { PacksList } from './packsList/PacksList'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { AddCardModal } from 'common/components/modals/AddCardModal'
import { AddPackModal } from 'common/components/modals/AddPackModal'
import { EditPackNameModal } from 'common/components/modals/EditPackNameModal'
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
import { getPacksTC, setPacksCurrentPage, setRowPage } from 'pages/packs/packsSlice'

export const Packs = () => {
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const min = useAppSelector(minValueRangeSelector)
  const max = useAppSelector(maxValueRangeSelector)
  const sortPacks = useAppSelector(sortPacksSelector)
  const totalCount = useAppSelector(cardPacksTotalCountSelector)
  const toggle = useAppSelector(state => state.app.toggleModal)
  // const [togglePopup, setTogglePopup] = useState(false)

  const dispatch = useAppDispatch()
  const changePageHandle = (page: number) => {
    dispatch(setPacksCurrentPage(page))
  }
  const changeRowPageHandle = (pageCount: number) => {
    dispatch(setRowPage(pageCount))
  }
  const Obj = {
    addPack: <AddPackModal show={false} />,
    // updatePack: <EditPackNameModal />,
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

      <AddPackModal show={toggle} />
      {/*{togglePopup && <AddPackModal />}*/}

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
