import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { setError, setIsLoggedIn } from '../../app/app-reducer'
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
  try {
    const res = await authAPI.registration(data)

    if (res) {
      dispatch(registerAC({ data: true }))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logout()

    if (res) {
      // dispatch(setAppInitialized(false))
      dispatch(setIsLoggedIn(false))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}
