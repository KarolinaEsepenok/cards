import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setError, setIsLoading, setIsLoggedIn } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'

import { authAPI, LoginDataType, ResponseProfileUserType, UpdateProfileName } from './auth-api'

const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
  name: 'My name',
  avatar: '',
}

export const authTC = createAsyncThunk<void, LoginDataType, { dispatch: AppDispatchType }>(
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
          })
        )
        dispatch(setIsLoggedIn(true))
      }
    } catch (error) {
      dispatch(setError('not valid email/password /ᐠ-ꞈ-ᐟ\\'))
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)

export const updateProfileNameTC =
  (data: UpdateProfileName) => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    dispatch(setIsLoading(true))
    try {
      const profileData = getState()

      const apiModel = {
        name: profileData.auth.name,
        avatar: profileData.auth.avatar,
        ...data,
      }
      const res = await authAPI.updateProfileName(apiModel)

      dispatch(updateProfileNameAC({ data: res.data }))
    } catch (error) {
      dispatch(setError(error))
    } finally {
      dispatch(setIsLoading(false))
    }
  }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.email = action.payload.email
      state.name = action.payload.name
    },
    setNewPassword: (state, action) => {
      state.password = action.payload
    },
    updateProfileNameAC(state, action: PayloadAction<{ data: ResponseProfileUserType }>) {
      state.name = action.payload.data.updatedUser.name
    },
  },
})

export const authReducer = slice.reducer
export const { setSignIn, setNewPassword, updateProfileNameAC } = slice.actions
