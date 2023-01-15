import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from '../../app/app-reducer'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'

import { packsApi, RequestSearchType } from './packsApi'

const initialState = {
  isPacks: true,
}

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
    searchAC: (state, action: PayloadAction<boolean>) => {
      state.isPacks = action.payload
    },
  },
})

export const packReducer = slice.reducer
export const { searchAC } = slice.actions
