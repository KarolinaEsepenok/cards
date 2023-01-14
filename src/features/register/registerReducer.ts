import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading, setIsLoggedIn } from '../../app/app-reducer'
import { authAPI, RegisterType } from '../auth/auth-api'

const initialState = {
  register: false,
}

const slice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    registerAC(state, action: PayloadAction<{ data: boolean }>) {
      state.register = action.payload.data
    },
  },
})

export const { registerAC } = slice.actions
export const registerReducer = slice.reducer

export const registerTC = (data: RegisterType) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  try {
    const res = await authAPI.registration(data)

    if (res) {
      dispatch(registerAC({ data: true }))
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

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  try {
    const res = await authAPI.logout()

    if (res) {
      // dispatch(setAppInitialized(false))
      dispatch(setIsLoggedIn(false))
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
