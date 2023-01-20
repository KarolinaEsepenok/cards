import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from '../../../app/appReducer'
import { sortingCardsMethods } from '../../../common/constants/sortingPacksMethods/sortingPacksMethods'
import { AppThunk } from '../../../common/hooks/AppThunk'

import { AddNewCardParamType, cardsAPI, CardType } from './cardsApi'

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
  packId: '',
  creatorId: '',
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
      dispatch(setCreatorId(response.data.packUserId))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const addNewCardTC =
  (cardsPack_id: string, card: AddNewCardParamType): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await cardsAPI.addNewCard(cardsPack_id, card)

      // dispatch(addNewCard({ cardsPack_id, newCard: response.data.newCard }))
      dispatch(getCardsTC(response.data.newCard.cardsPack_id))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const deleteCardTC =
  (cardId: string): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await cardsAPI.deleteCard(cardId)

      dispatch(getCardsTC(response.data.deletedCard.cardsPack_id))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const updateCardTC = (): AppThunk => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    // const response = await cardsAPI.updateCard()
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
    setPackId: (state, action: PayloadAction<string>) => {
      state.packId = action.payload
    },
    setCreatorId: (state, action: PayloadAction<string>) => {
      state.creatorId = action.payload
    },
    setPackName: (state, action: PayloadAction<string>) => {
      state.packName = action.payload
    },
    addNewCard: (state, action: PayloadAction<{ cardsPack_id: string; newCard: CardType }>) => {
      state.cards.forEach(c => {
        if (c.cardsPack_id === action.payload.cardsPack_id) {
          state.cards.unshift(action.payload.newCard)
        }
      })
    },
    updateCard: (state, action: PayloadAction<{ cardId: string; question: string }>) => {
      state.cards.forEach(c => {
        if (c._id === action.payload.cardId) {
          c.question = action.payload.question
        }
      })
    },
  },
})

export const cardsReducer = slice.reducer
export const { getCards, setPackId, setCreatorId, setPackName, updateCard, addNewCard } = slice.actions
