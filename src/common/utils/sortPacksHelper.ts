import { AppDispatchType } from '../hooks/useAppDispatch'

import { sortingPacksMethods } from 'common/constants/sortingPacksMethods/sortingMethods'
import { setSort } from 'pages/packs/packsSlice'

export const sortPacksHelper = (
  dispatch: AppDispatchType,
  sortMethod: sortingPacksMethods,
  m1: sortingPacksMethods,
  m2: sortingPacksMethods
) => {
  sortMethod === m2 ? dispatch(setSort(m1)) : dispatch(setSort(m2))
}
