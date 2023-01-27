import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from 'app/appSlice'
import { sortingCardsMethods } from 'common/constants/sortingPacksMethods/sortingPacksMethods'
import { AppThunk } from 'common/hooks/AppThunk'
import { AppDispatchType } from 'common/hooks/useAppDispatch'
import { AddNewCardParamType, cardsAPI, CardType } from 'pages/cards/cardsApi'

const initialState = {
  cards: [] as CardType[],
  queryParams: {
    pageCount: 110,
    page: 1,
    cardQuestion: '',
    sortCards: sortingCardsMethods.desUpdate,
    cardsPack_id: '',
  },
  cardsTotalCount: 0,
  packName: '',
  creatorId: '',
  isCardsFetched: false,
  isLoading: false,
  toggleCardModal: false,
}

export const getCardsTC =
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setCardsIsLoading(true))
    const { pageCount, cardQuestion, page, sortCards } = getState().cards.queryParams

    dispatch(setPackId(cardsPack_id))

    try {
      const response = await cardsAPI.getCards({
        cardsPack_id,
        pageCount,
        cardQuestion,
        page,
        sortCards,
      })

      const { cards } = response.data

      dispatch(setCards(cards))
      dispatch(setPackName(response.data.packName))
      dispatch(setCreatorId(response.data.packUserId))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setCardsIsLoading(false))
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
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
    setPackId: (state, action: PayloadAction<string>) => {
      state.queryParams.cardsPack_id = action.payload
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
    setCardQuestion(state, action: PayloadAction<string>) {
      state.queryParams.cardQuestion = action.payload
    },
    setEditCardData: (state, action: PayloadAction<{ cardId: string; question: string; answer: string }>) => {
      state.cards[0]._id = action.payload.cardId
      state.cards[0].question = action.payload.question
      state.cards[0].answer = action.payload.answer
    },
    toggleCardModal: (state, action: PayloadAction<boolean>) => {
      state.toggleCardModal = action.payload
    },
  },
})

export const cardsReducer = slice.reducer
export const {
  setCards,
  setCreatorId,
  setPackName,
  updateCard,
  addNewCard,
  setCardsIsLoading,
  setEditCardData,
  toggleCardModal,
  setPackId,
  setCardQuestion,
} = slice.actions
