import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

import { setError, setIsLoading } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/AppThunk'
import { authAPI } from '../auth-api'
import { setNewPassword } from '../authReducer'

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

export const forgotPasswordTC = (forgotPass: boolean, email: string): AppThunk => {
  return async dispatch => {
    try {
      dispatch(setIsLoading(true))
      const response = await authAPI.forgotPassword(email)

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
export const setNewPasswordTC = (password: string, token: string | undefined): AppThunk => {
  return async dispatch => {
    dispatch(setIsLoading(true))
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
