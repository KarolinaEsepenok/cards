import { sortingPacksMethods } from '../constants/sortingPacksMethods/sortingPacksMethods'
import { AppDispatchType } from '../hooks/useAppDispatch'

import { setSort } from 'pages/packs/packsSlice'

export const sortHelper = (
  dispatch: AppDispatchType,
  sortMethod: sortingPacksMethods,
  m1: sortingPacksMethods,
  m2: sortingPacksMethods
) => {
  sortMethod === m2 ? dispatch(setSort(m1)) : dispatch(setSort(m2))
}
