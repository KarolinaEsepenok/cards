import React, { useEffect, useState } from 'react'

import { Button } from '../../common/component/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { getPacksTC } from '../packs/packsReducer'

import s from './FilterMyAllPacks.module.scss'

export const FilterMyAllPacks: React.FC = React.memo(props => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const user_id = useAppSelector(state => state.packs.queryParams.user_id)
  const [isMy, setIsMy] = useState<boolean>(!!user_id)

  {
    /*const filterMyAllPacks = (value: boolean) => {
                    dispatch(setMyPacks(value))
                    if (myPacks !== value) {
                      dispatch(getPacksTC())
                    }
                  }*/
  }
  useEffect(() => {
    if (!user_id) {
      setIsMy(false)
    }
  }, [user_id])
  const handleFilterMyPacks = () => {
    dispatch(getPacksTC)
    setIsMy(true)
  }

  const handleFilterAllPacks = () => {
    setIsMy(false)
  }

  return (
    <div>
      <div className={s.inputContainer}>
        <span className={s.label}>Show packs cards</span>
        <div className={s.buttons}>
          <Button styleType={user_id ? 'primary' : 'secondary'} onClick={handleFilterMyPacks} disabled={isLoading}>
            My
          </Button>
          <Button styleType={!user_id ? 'secondary' : 'primary'} onClick={handleFilterAllPacks} disabled={isLoading}>
            All
          </Button>
        </div>
      </div>
    </div>
  )
})