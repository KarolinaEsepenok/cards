import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/AppThunk'
import { sortingCardsMethods } from '../../../common/sortingPacksMethods/sortingPacksMethods'

import { cardsAPI, CardType } from './cardsApi'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  packName: '',
  isCardsFetched: false,
  queryParams: {
    pageCount: 5,
    page: 1,
    cardQuestion: '',
    sortCards: sortingCardsMethods.desUpdate,
  },
}

export const getCardsTC =
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true))

    try {
      const { pageCount, cardQuestion, page, sortCards } = getState().cards.queryParams
      const response = await cardsAPI.getCards({
        cardsPack_id,
        pageCount,
        cardQuestion,
        page,
        sortCards,
      })

      const { cards } = response.data

      dispatch(getCards({ cards: cards }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }
const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCards: (state, action: PayloadAction<{ cards: CardType[] }>) => {
      state.cards = action.payload.cards
    },
  },
})

export const cardsReducer = slice.reducer
export const { getCards } = slice.actions
