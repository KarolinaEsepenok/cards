import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading, setIsLoggedIn } from '../../../app/appReducer'
import { AppThunk } from '../../../common/hooks/AppThunk'
import { authApi, RequestRegisterType } from '../authApi'

const initialState = {
  register: false,
}

const slice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    register(state, action: PayloadAction<{ data: boolean }>) {
      state.register = action.payload.data
    },
  },
})

export const registerTC =
  (data: RequestRegisterType): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))

    try {
      const res = await authApi.registration(data)

      if (res) {
        dispatch(register({ data: true }))
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

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setIsLoading(true))

  try {
    const res = await authApi.logout()

    if (res) {
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

export const { register } = slice.actions
export const registerReducer = slice.reducer
