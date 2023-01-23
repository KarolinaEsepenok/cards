import React from 'react'

import s from './FilterMyAllPacks.module.scss'

import { Button } from 'common/component/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setMyPacks } from 'features/packs/packsReducer'

export const FilterMyAllPacks = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const queryUserId = useAppSelector(state => state.packs.queryParams.user_id)
  const id = useAppSelector(state => state.auth.id)

  const handleFilterMyPacks = () => {
    dispatch(setMyPacks(id))
  }

  const handleFilterAllPacks = () => {
    dispatch(setMyPacks(''))
  }

  return (
    <div className={s.buttons}>
      <Button
        className={s.btnFilter}
        styleType={queryUserId ? 'primary' : 'secondary'}
        onClick={handleFilterMyPacks}
        disabled={isLoading}
      >
        My
      </Button>
      <Button
        className={s.btnFilter}
        styleType={queryUserId ? 'secondary' : 'primary'}
        onClick={handleFilterAllPacks}
        disabled={isLoading}
      >
        All
      </Button>
    </div>
  )
}
