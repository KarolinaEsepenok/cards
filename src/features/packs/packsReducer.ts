import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from '../../app/app-reducer'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'

import { packsApi, RequestSearchType } from './packsApi'

const initialState = {
  cardPacks: [],
  cardPacksTotalCount: null,
  maxCardsCount: null,
  minCardsCount: null,
  page: null,
  pageCount: null,
  isPacks: true,
  user_id: '',
}

export const getPacksTC = createAsyncThunk<void, undefined, { dispatch: AppDispatchType }>(
  'packs/getPacks',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true))

    try {
      const res = await packsApi.getPacks()

      if (res.data.cardPacks.length) {
        dispatch(setPacksData(res.data))
      }
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)
export const searchTC = createAsyncThunk<void, RequestSearchType, { dispatch: AppDispatchType }>(
  'packs/searchTC',
  async function (values, { dispatch }) {
    dispatch(setIsLoading(true))

    try {
      const response = await packsApi.search(values.packName)

      if (response.data.cardPacksTotalCount === 0) {
        dispatch(searchAC(false))
      } else {
        dispatch(searchAC(true))
      }
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacksData: (state, action) => {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.maxCardsCount = action.payload.maxCardsCount
      state.minCardsCount = action.payload.minCardsCount
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
    },

    searchAC: (state, action: PayloadAction<boolean>) => {
      state.isPacks = action.payload
    },
    setMyPacks: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload
    },
  },
})

export const packsReducer = slice.reducer
export const { setPacksData, searchAC, setMyPacks } = slice.actions
