import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

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
    loggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      {
        // state.isLoggedIn = action.payload.value
      }
    },
  },
})

export const { registerAC, loggedInAC } = slice.actions
export const registerReducer = slice.reducer

export const registerTC = (data: RegisterType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.registration(data)

    if (res) {
      dispatch(registerAC({ data: true }))
    }
  } catch (error) {
    console.log(error)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logout()

    if (res) {
      dispatch(loggedInAC({ value: false }))
    }
  } catch (error) {
    console.log(error)
  }
}
