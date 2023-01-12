import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from '../features/auth/auth-api'

type initialStateType = {
  isAppInitialized: boolean
  error: null | string
  isLoading: boolean
}
const initialState: initialStateType = {
  isAppInitialized: false,
  error: null,
  isLoading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized: (state, action) => {
      state.isAppInitialized = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setAppInitialized, setError, setIsLoading } = appSlice.actions

export const appReducer = appSlice.reducer

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    await authAPI.me()
    dispatch(setAppInitialized(true))
  } catch (e) {
    if (axios.isAxiosError<{ error: string }>(e)) {
      const error = e.response ? e.response.data.error : 'Something wrong'

      dispatch(setError({ error }))
      dispatch(setAppInitialized(true))
    }
  }
}
