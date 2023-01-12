import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

import { setError, setIsLoading } from '../../../app/app-reducer'
// eslint-disable-next-line import/namespace
import { authAPI } from '../auth-api'
import { setNewPassword } from '../signIn/signIn-reducer'

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

      console.log(response)
      dispatch(forgotPassword({ data: forgotPass, email }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
export const setNewPasswordTC = (password: string, token: string | undefined) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading({ isLoading: true }))
    try {
      if (token) {
        const response = await authAPI.setNewPassword(password, token)
      }
      dispatch(setNewPassword(password))
      dispatch(changePasswordSuccess({ data: true }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
