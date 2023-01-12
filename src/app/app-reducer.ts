import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from '../features/auth/auth-api'
import { setSignIn } from '../features/auth/signIn/signIn-reducer'

type initialStateType = {
  isAppInitialized: boolean
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
}
const initialState: initialStateType = {
  isAppInitialized: false,
  error: null,
  isLoading: false,
  isLoggedIn: false,
}

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    await authAPI.me()
    dispatch(setAppInitialized(true))
    dispatch(setIsLoggedIn(true))
  } catch (e) {
    if (axios.isAxiosError<{ error: string }>(e)) {
      const error = e.response ? e.response.data.error : 'Something wrong'

      dispatch(setAppInitialized(true))
    }
  }
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized: (state, action) => {
      state.isAppInitialized = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setAppInitialized, setError, setIsLoading, setIsLoggedIn } = appSlice.actions

export const appReducer = appSlice.reducer
