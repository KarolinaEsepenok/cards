import React, { FC, memo } from 'react'

import { setMyPacks } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Button } from '../../button/Button'

import s from './FilterMyAllPacks.module.scss'

export const FilterMyAllPacks: FC = memo(props => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const packCreatorId = useAppSelector(state => state.packs.queryParams.user_id)
  const myId = useAppSelector(state => state.auth.id)

  const handleFilterMyPacks = () => {
    dispatch(setMyPacks(myId))
  }

  const handleFilterAllPacks = () => {
    dispatch(setMyPacks(''))
  }

  return (
    <div className={s.buttons}>
      <Button
        className={s.btnFilter}
        styleType={packCreatorId ? 'primary' : 'secondary'}
        onClick={handleFilterMyPacks}
        disabled={isLoading}
      >
        My
      </Button>
      <Button
        className={s.btnFilter}
        styleType={packCreatorId ? 'secondary' : 'primary'}
        onClick={handleFilterAllPacks}
        disabled={isLoading}
      >
        All
      </Button>
    </div>
  )
})
