import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppThunk } from 'common/hooks/AppThunk'
import { authApi } from 'pages/auth/authApi'
import { setSignIn } from 'pages/auth/authSlice'

const initialState = {
  isAppInitialized: false,
  error: null as null | string,
  isLoading: false,
  isLoggedIn: false,
}

export const initializeAppTC = (): AppThunk => async dispatch => {
  try {
    const {
      data: { email, name, _id },
    } = await authApi.me()

    dispatch(setSignIn({ email, name, id: _id }))
    dispatch(setIsLoggedIn(true))
  } catch (e) {
    if (axios.isAxiosError<{ error: string }>(e)) {
      e.response ? e.response.data.error : 'Something wrong'
    }
  } finally {
    dispatch(setAppInitialized(true))
  }
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized: (state, action: PayloadAction<boolean>) => {
      state.isAppInitialized = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setAppInitialized, setError, setIsLoading, setIsLoggedIn } = appSlice.actions

export const appReducer = appSlice.reducer
