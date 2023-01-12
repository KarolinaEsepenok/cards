import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppInitialized, setIsLoading } from '../../../app/app-reducer'
import { authAPI, LoginDataType } from '../auth-api'

type InitialStateType = typeof initialState
const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
  // name: '',
}

export const signInThunk = createAsyncThunk<
  // IntialStateType,
  ReturnType<typeof setSignIn> | undefined, //TODO:fix
  LoginDataType,
  { rejectValue: string }
>('signIn/signInThunk', async function (values: LoginDataType, { rejectWithValue, dispatch }) {
  dispatch(setIsLoading(true))
  try {
    dispatch(setIsLoading({ isLoading: true }))
    const response = await authAPI.signIn(values)

    if (response) {
      dispatch(setAppInitialized(true))

      return setSignIn({
        email: response.data.email,
        password: response.data.password,
        rememberMe: response.data.rememberMe,
        // name: response.data.name,
      })
    }
    dispatch(setIsLoading({ isLoading: false }))
  } catch (error) {
    // dispatch(setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' }))

    return rejectWithValue('not valid email/password /ᐠ-ꞈ-ᐟ\\')
    //setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' })
  } finally {
    dispatch(setIsLoading(false))
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
    setNewPassword: (state, action) => {
      state.password = action.payload
    },
  },
})

export const signInReducer = slice.reducer
export const { setSignIn, setNewPassword } = slice.actions
