import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import s from 'common/modules/filterMyAllPacks/FilterMyAllPacks.module.scss'
import { isLoadingSelector, myIdSelector, userIdSelector } from 'common/selectors/Selectors'
import { setMyPacks } from 'pages/packs/packsSlice'

export const FilterMyAllPacks = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isLoadingSelector)
  const packCreatorId = useAppSelector(userIdSelector)
  const myId = useAppSelector(myIdSelector)

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
}
