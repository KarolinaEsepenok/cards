import { Dispatch } from 'redux'

import { setSort } from '../../features/packs/packsReducer'
import { sortingPacksMethods } from '../constants/sortingPacksMethods/sortingPacksMethods'

export const sortHelper = (
  dispatch: Dispatch,
  sortMethod: sortingPacksMethods,
  m1: sortingPacksMethods,
  m2: sortingPacksMethods
) => {
  sortMethod === m1 ? dispatch(setSort(m2)) : dispatch(setSort(m1))
}
