import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

import { setError, setIsLoading } from '../../../app/app-reducer'
// eslint-disable-next-line import/namespace
import { authAPI } from '../auth-api'

const initialState = {
  forgotPassword: false,
  currenEmail: '',
  changePasswordSuccess: false,
}

const slice = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {
    forgotPassword(state, action: PayloadAction<{ data: boolean; email: string }>) {
      state.forgotPassword = action.payload.data
      state.currenEmail = action.payload.email
    },
    changePasswordSuccess(state, action: PayloadAction<{ data: boolean }>) {
      state.changePasswordSuccess = action.payload.data
    },
  },
})

export const passwordReducer = slice.reducer
export const { forgotPassword, changePasswordSuccess } = slice.actions

export const forgotPasswordTC = (forgotPass: boolean, email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading({ isLoading: true }))
      const response = await authAPI.forgotPassword(email)

      dispatch(forgotPassword({ data: forgotPass, email }))
      dispatch(setIsLoading({ isLoading: false }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    }
  }
}
export const setNewPassword = (password: string, token: string | undefined) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading({ isLoading: true }))
      if (token) {
        const response = await authAPI.setNewPassword(password, token)
      }
      dispatch(changePasswordSuccess({ data: true }))
      dispatch(setIsLoading({ isLoading: false }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError({ error }))
      }
      dispatch(setIsLoading({ isLoading: false }))
    }
  }
}
