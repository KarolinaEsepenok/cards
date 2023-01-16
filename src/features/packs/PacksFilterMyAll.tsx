import React from 'react'

import { Button } from '../../common/component/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import s from './PacksFilterMyAll.module.scss'
import { getPacksTC, setMyPacks } from './packsReducer'

export const PacksFilterMyAll: React.FC = React.memo(props => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const myPacks = useAppSelector(state => state.packs.myPacks)

  const filterMyAllPacks = (value: boolean) => {
    dispatch(setMyPacks(value))
    if (myPacks !== value) {
      dispatch(getPacksTC())
    }
  }
  const handleFilterMyPacks = () => filterMyAllPacks(true)
  const handleFilterAllPacks = () => {
    console.log(myPacks)
    filterMyAllPacks(false)
  }

  return (
    <div>
      <div className={s.inputContainer}>
        <span className={s.label}>Show packs cards</span>
        <div className={s.buttons}>
          <Button styleType={myPacks ? 'primary' : 'secondary'} onClick={handleFilterMyPacks} disabled={isLoading}>
            My
          </Button>
          <Button styleType={myPacks ? 'secondary' : 'primary'} onClick={handleFilterAllPacks} disabled={isLoading}>
            All
          </Button>
        </div>
      </div>
    </div>
  )
})
