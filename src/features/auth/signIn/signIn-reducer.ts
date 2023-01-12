import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setIsLoading } from '../../../app/app-reducer'
import { authAPI, LoginDataType } from '../auth-api'

type InitialStateType = typeof initialState
const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
}

export const signInThunk = createAsyncThunk<
  // IntialStateType,
  ReturnType<typeof setSignIn> | undefined, //TODO:fix
  LoginDataType,
  { rejectValue: string }
>('signIn/signInThunk', async function (values: LoginDataType, { rejectWithValue, dispatch }) {
  setIsLoading({ isLoading: true })
  try {
    dispatch(setIsLoading({ isLoading: true }))
    const response = await authAPI.signIn(values)

    if (response) {
      return setSignIn({
        email: response.data.email,
        password: response.data.password,
        rememberMe: response.data.rememberMe,
      })
    }
    dispatch(setIsLoading({ isLoading: false }))
  } catch (error) {
    // dispatch(setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' }))

    return rejectWithValue('not valid email/password /ᐠ-ꞈ-ᐟ\\')
    //setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' })
  }
})

const slice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<InitialStateType>) => {
      state.email = action.payload.email
      state.password = action.payload.password
      state.rememberMe = action.payload.rememberMe
    },
  },
})

export const signInReducer = slice.reducer
export const { setSignIn } = slice.actions
