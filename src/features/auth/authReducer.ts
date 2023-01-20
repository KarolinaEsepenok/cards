import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading, setIsLoggedIn } from '../../app/appReducer'
import { AppThunk } from '../../common/hooks/AppThunk'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'

import { authAPI, RequestLoginType, ResponseProfileUserType, UpdateProfileName } from './auth-api'

const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
  name: 'My name',
  avatar: '',
  id: null as null | string,
}

export const authTC = createAsyncThunk<void, RequestLoginType, { dispatch: AppDispatchType }>(
  'auth/authTC',
  async function (values, { dispatch }) {
    dispatch(setIsLoading(true))

    try {
      const response = await authAPI.signIn(values)

      if (response) {
        dispatch(
          setSignIn({
            email: response.data.email,
            name: response.data.name,
            id: response.data._id,
          })
        )
        dispatch(setIsLoggedIn(true))
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
)

export const updateProfileNameTC =
  (data: UpdateProfileName): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true))
    try {
      const profileData = getState()

      const apiModel = {
        name: profileData.auth.name,
        avatar: profileData.auth.avatar,
        ...data,
      }
      const res = await authAPI.updateProfileName(apiModel)

      dispatch(updateProfileName({ data: res.data }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<{ email: string; name: string; id: string }>) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.id = action.payload.id
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    updateProfileName(state, action: PayloadAction<{ data: ResponseProfileUserType }>) {
      state.name = action.payload.data.updatedUser.name
    },
  },
})

export const authReducer = slice.reducer
export const { setSignIn, setNewPassword, updateProfileName } = slice.actions
