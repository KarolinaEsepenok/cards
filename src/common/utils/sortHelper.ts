import { setSort } from '../../features/packs/packsReducer'
import { sortingPacksMethods } from '../constants/sortingPacksMethods/sortingPacksMethods'
import { AppDispatchType } from '../hooks/useAppDispatch'

export const sortHelper = (
  dispatch: AppDispatchType,
  sortMethod: sortingPacksMethods,
  m1: sortingPacksMethods,
  m2: sortingPacksMethods
) => {
  sortMethod === m1 ? dispatch(setSort(m2)) : dispatch(setSort(m1))
}
