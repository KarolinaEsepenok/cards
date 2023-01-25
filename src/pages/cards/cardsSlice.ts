import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from 'app/appSlice'
import { sortingCardsMethods } from 'common/constants/sortingPacksMethods/sortingPacksMethods'
import { AppThunk } from 'common/hooks/AppThunk'
import { AppDispatchType } from 'common/hooks/useAppDispatch'
import { AddNewCardParamType, cardsAPI, CardType } from 'pages/cards/cardsApi'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  packName: '',
  isCardsFetched: false,
  queryParams: {
    pageCount: 110,
    page: 1,
    cardQuestion: '',
    sortCards: sortingCardsMethods.desUpdate,
  },
  packId: '',
  creatorId: '',
  isLoading: false,
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
      dispatch(setPackName(response.data.packName))
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

export const setCardGradeTC = createAsyncThunk<void, { cardId: string; grade: number }, { dispatch: AppDispatchType }>(
  'cards/setCardGradeTC',
  async ({ cardId, grade }, { dispatch }) => {
    dispatch(setCardsIsLoading(true))

    try {
      await cardsAPI.updateCardGrade(cardId, grade)
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setCardsIsLoading(false))
    }
  }
)

export const addNewCardTC =
  (packId: string, card: AddNewCardParamType): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await cardsAPI.addNewCard(packId, card)

      // dispatch(addNewCard({ packId, newCard: response.data.newCard }))
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
    }
  }

export const updateCardTC =
  (packId: string, cardId: string, editCard: AddNewCardParamType): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await cardsAPI.updateCard(cardId, editCard)

      dispatch(updateCard({ cardId, editCard: response.data.updatedCard }))
      dispatch(getCardsTC(packId))
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
    addNewCard: (state, action: PayloadAction<{ packId: string; newCard: CardType }>) => {
      state.cards.forEach(c => {
        if (c.cardsPack_id === action.payload.packId) {
          state.cards.unshift(action.payload.newCard)
        }
      })
    },
    updateCard: (state, action: PayloadAction<{ cardId: string; editCard: AddNewCardParamType }>) => {
      state.cards.forEach(c => {
        if (c._id === action.payload.cardId) {
          c.question = action.payload.editCard.question
          c.answer = action.payload.editCard.answer
        }
      })
    },
    setCardsIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const cardsReducer = slice.reducer
export const { getCards, setPackId, setCreatorId, setPackName, updateCard, addNewCard, setCardsIsLoading } =
  slice.actions
