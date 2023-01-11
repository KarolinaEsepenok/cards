import { createSlice } from '@reduxjs/toolkit'

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
      state.error = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setAppInitialized, setError, setIsLoading } = appSlice.actions

export const appReducer = appSlice.reducer
