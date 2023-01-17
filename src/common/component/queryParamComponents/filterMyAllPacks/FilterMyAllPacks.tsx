import React, { useState } from 'react'

import { setMyPacks } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Button } from '../../Button/Button'

import s from './FilterMyAllPacks.module.scss'

export const FilterMyAllPacks: React.FC = React.memo(props => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const userId = useAppSelector(state => state.auth.id)
  const minCards = useAppSelector(state => state.packs.minCardsCount)
  const maxCards = useAppSelector(state => state.packs.maxCardsCount)
  const [my, setMy] = useState<boolean>(!!userId)

  {
    /* useEffect(() => {
                                            if (!userId) {
                                              setMy(false)
                                            }
                                          }, [userId])*/
  }
  const handleFilterMyPacks = () => {
    dispatch(setMyPacks(userId))
  }

  const handleFilterAllPacks = () => {
    dispatch(setMyPacks(''))
    //dispatch(setRangeValues([0, maxCards]))
  }

  return (
    <div>
      <div className={s.inputContainer}>
        <span className={s.label}>Show packs cards</span>
        <div className={s.buttons}>
          <Button styleType={userId ? 'primary' : 'secondary'} onClick={handleFilterMyPacks} disabled={isLoading}>
            My
          </Button>
          <Button styleType={userId ? 'secondary' : 'primary'} onClick={handleFilterAllPacks} disabled={isLoading}>
            All
          </Button>
        </div>
      </div>
    </div>
  )
})
