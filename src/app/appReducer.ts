import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppThunk } from 'common/hooks/AppThunk'
import { authApi } from 'features/auth/authApi'
import { setSignIn } from 'features/auth/authReducer'

const initialState = {
  isAppInitialized: false,
  error: null as null | string,
  isLoading: false,
  isLoggedIn: false,
  toggleModal: false,
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
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.toggleModal = action.payload
    },
  },
})

export const { setAppInitialized, setError, setIsLoading, setIsLoggedIn, toggleModal } = appSlice.actions

export const appReducer = appSlice.reducer
