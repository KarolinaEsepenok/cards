import { AppDispatchType } from '../hooks/useAppDispatch'

import { sortingCardsMethods } from 'common/constants/sortingPacksMethods/sortingMethods'
import { setCardsSort } from 'pages/cards/cardsSlice'

export const sortCardsHelper = (
  dispatch: AppDispatchType,
  sortMethod: sortingCardsMethods,
  m1: sortingCardsMethods,
  m2: sortingCardsMethods
) => {
  sortMethod === m2 ? dispatch(setCardsSort(m1)) : dispatch(setCardsSort(m2))
}
