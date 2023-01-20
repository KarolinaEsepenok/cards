import React from 'react'

import { setMyPacks } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Button } from '../../button/Button'

import s from './FilterMyAllPacks.module.scss'

export const FilterMyAllPacks: React.FC = React.memo(props => {
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
    <div>
      <div className={s.inputContainer}>
        <span className={s.label}>Show packs cards</span>
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
      </div>
    </div>
  )
})
